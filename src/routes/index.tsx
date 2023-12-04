import * as Cesium from "cesium";
import {CameraEventType, Cartesian2, Cartesian3, type Entity, type ScreenSpaceEventHandler} from "cesium";
import {createEffect, createSignal, Index, onMount, Show} from "solid-js";
import "./index.css";
import "cesium/Build/Cesium/Widgets/widgets.css";
import Tooltip from "~/components/Tooltip";
import DroneTooltipContents from "~/components/DroneTooltipContents";
import DronesController from "~/lib/cesium/DronesController";
import {graphql} from "~/gql";
import {createSubscription} from "@merged/solid-apollo";
import PathController from "~/lib/cesium/PathController";
import {addHeight} from "~/lib/cesium/addHeight";

const CESSIUM_ACCESS_TOKEN = import.meta.env["VITE_CESSIUM_ACCESS_TOKEN"];

const dronesPosQuery = graphql(`
    subscription DronesPos {
        drone_telemetry(distinct_on: drone_id, order_by: {timestamp: desc, drone_id: asc}) {
            id: drone_id
            heading
            latitude
            longitude
            altitude
        }
    }
`);

/** Home/index page containing the map and ability to create new flights */
export default function Home() {
  const [points, setPoints] = createSignal([] as string[]);
  const [popupPos, setPopupPos] = createSignal<Cartesian2>();
  // NaN represents no drone is selected. Using instead of -1 because it makes logical mistakes more evident
  const [selectedDroneId, setSelectedDroneId] = createSignal(NaN);
  const [isDrawingPath, setIsDrawingPath] = createSignal(false);

  const drones: Record<number, Entity> = {};
  let pathController: PathController;

  function startDrawingPath() {
    setIsDrawingPath(true);
    setPopupPos(undefined);
    pathController.beginPath();
    pathController.extendPath(drones[selectedDroneId()].position!.getValue(Cesium.JulianDate.now()) as Cartesian3);
  }

  onMount(() => {
    Cesium.Ion.defaultAccessToken = CESSIUM_ACCESS_TOKEN;
    const dronesPos = createSubscription(dronesPosQuery);
    const viewer = new Cesium.Viewer("cesiumContainer", {
      selectionIndicator: false,
      infoBox: false,
      terrainProvider: Cesium.createWorldTerrain(),
      sceneModePicker: false,
      timeline: true,
      shouldAnimate: true,
      homeButton: false,
      animation: true,

    });

    const dronesController = new DronesController(viewer, setPopupPos);
    pathController = new PathController(viewer, 10);

    // Update or add all drone positions
    createEffect(() => {
      console.log(dronesPos());
      for (const drone of dronesPos()?.drone_telemetry ?? []) {
        if (drone.id in drones) {
          dronesController.setDronePos(drones[drone.id], drone.longitude, drone.latitude, drone.altitude, drone.heading);
        } else {
          drones[drone.id] = dronesController.addDrone(drone.id, drone.longitude, drone.latitude, drone.altitude, drone.heading);
        }
      }
    });

    // https://cesium.com/learn/cesiumjs/ref-doc/ScreenSpaceCameraController.html
    const cameraController = viewer.scene.screenSpaceCameraController;
    // TODO: I tried changing controls, but it didn't seem to do anything
    cameraController.translateEventTypes = CameraEventType.MIDDLE_DRAG;
    viewer.camera.percentageChanged = 0.001;


    if (!viewer.scene.pickPositionSupported) {
      window.alert("This browser does not support pickPosition.");
    }

    viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
      Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
    );

    // set simulation time
    // const start = Cesium.JulianDate.fromDate(new Date(2023, 9, 23, 10));
    const start = Cesium.JulianDate.fromDate(new Date(2023, 9, 24, 10));
    const stop = Cesium.JulianDate.addSeconds(
      start,
      3600,
      new Cesium.JulianDate(),
    );

    viewer.animation.viewModel.timeFormatter = function(julianDate, viewModel) {
      // TODO: format the timeline in local time
      const date = Cesium.JulianDate.toDate(julianDate);
      return `LMAO ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    };

    function computeLineFlight(startLon: number, startLat: number, endLon: number, endLat: number) {
      const property = new Cesium.SampledPositionProperty();
      const time = Cesium.JulianDate.addSeconds(
        start,
        360,
        new Cesium.JulianDate(),
      );
      const startPosition = Cesium.Cartesian3.fromDegrees(startLon, startLat, 1000);
      const endPosition = Cesium.Cartesian3.fromDegrees(endLon, endLat, 1000);
      property.addSample(start, startPosition);
      property.addSample(time, endPosition);
      return property;
    }


    /**
     * Creates a tiny red dot which follows your cursor when creating a new flight path
     * @param worldPosition initial position to place dot
     */
    function createPoint(worldPosition: Cartesian3) {
      const point = viewer.entities.add({
        position: worldPosition,
        point: {
          color: Cesium.Color.RED,
          pixelSize: 5,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        },
      });
      setPoints((points) => [...points, worldPosition.toString()]);
      return point;
    }

    function drawShape(positionData) {
      return viewer.entities.add({
        polyline: {
          positions: positionData,
          clampToGround: true,
          width: 3,
        },
      });
    }

    let activeShapePoints = [] as Cartesian3[];
    let activeShape: Cesium.Entity | undefined;
    let floatingPoint: Cesium.Entity | undefined;

    const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
    handler.setInputAction(function(event: ScreenSpaceEventHandler.PositionedEvent) {
      const [selectedDrone, stateChanged] = dronesController.tryPickDrone(event.position, activeShapePoints.length > 0);
      if (!isDrawingPath())
        setSelectedDroneId(Number.parseInt(selectedDrone?.name ?? "NaN"));
      if ((stateChanged && !isDrawingPath()) || !isDrawingPath()) {
        return;
      }
      // We use `viewer.scene.pickPosition` here instead of `viewer.camera.pickEllipsoid` so that
      // we get the correct point when mousing over terrain.
      const earthPosition = viewer.scene.pickPosition(event.position);
      // `earthPosition` will be undefined if our mouse is not over the globe.
      if (Cesium.defined(earthPosition)) {
        if (activeShapePoints.length === 0) {
          // Create the first floating point
          floatingPoint = createPoint(earthPosition);

          activeShapePoints.push(earthPosition);
          const dynamicPositions = new Cesium.CallbackProperty(function() {
            return activeShapePoints;
          }, false);
          activeShape = drawShape(dynamicPositions);
        }
        // Create another point that's permanent
        createPoint(earthPosition);
        pathController.extendPath(addHeight(earthPosition, 100));
        activeShapePoints.push(earthPosition);
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    // Mouse move handler to change the position of the floating point
    handler.setInputAction(function(event) {
      if (Cesium.defined(floatingPoint)) {
        if (!altPressed) {
          const newPosition = viewer.scene.pickPosition(event.endPosition);
          if (Cesium.defined(newPosition)) {
            pathController.previewPath(addHeight(newPosition, 100));
            floatingPoint.position.setValue(newPosition);
            activeShapePoints.pop();
            activeShapePoints.push(newPosition);
          }
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    // Redraw the shape so it's not dynamic and remove the dynamic shape.
    function terminateShape() {
      pathController.closePath();
      activeShapePoints.pop();
      drawShape(activeShapePoints);
      viewer.entities.remove(floatingPoint);
      // viewer.entities.remove(activeShape);
      floatingPoint = undefined;
      // activeShape = undefined;
      activeShapePoints = [];
    }

    // End the shape
    handler.setInputAction(function() {
      setIsDrawingPath(false);
      setSelectedDroneId(NaN);
      let pos = Cesium.Cartographic.fromCartesian(activeShapePoints[0]);
      let pos1 = [pos.longitude / Math.PI * 180, pos.latitude / Math.PI * 180];
      let pos2 = Cesium.Cartographic.fromCartesian(activeShapePoints[1]);
      let pos3 = [pos2.longitude / Math.PI * 180, pos2.latitude / Math.PI * 180];
      const position = computeLineFlight(pos1[0], pos1[1], pos3[0], pos3[1]);
      console.log(start);
      console.log(stop);
      const entity1 = viewer.entities.add({
        //Set the entity availability to the same interval as the simulation time.
        availability: new Cesium.TimeIntervalCollection([
          new Cesium.TimeInterval({
            start: start,
            stop: stop,
          }),
        ]),

        //Use our computed positions
        position: position,

        //Automatically compute orientation based on position movement.
        orientation: new Cesium.VelocityOrientationProperty(position),

        //Load the Cesium plane model to represent the entity
        model: {
          uri: "../../public/assets/TwoSidedPlane.gltf",
          minimumPixelSize: 64,
        },

        //Show the path as a pink line sampled in 1 second increments.
        path: {
          resolution: 1,
          material: new Cesium.PolylineGlowMaterialProperty({
            glowPower: 0.1,
            color: Cesium.Color.YELLOW,
          }),
          width: 10,
        },
      });
      // hide the path after journey
      const duration = Cesium.JulianDate.secondsDifference(stop, start);
      console.log(duration);
      setTimeout(() => {
        viewer.entities.remove(entity1);
      }, duration * 1000);
      terminateShape();
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);


    // Zoom in to Purdue
    const PURDUE_LOCATION = Cartesian3.fromDegrees(-86.9201571, 40.427593, 200.0);
    viewer.camera.lookAt(
      PURDUE_LOCATION,
      new Cartesian3(0, -500, 1600),
    );
    viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);

    var tileset = viewer.scene.primitives.add(
      new Cesium.Cesium3DTileset({
        url: Cesium.IonResource.fromAssetId(1608724),
      }),
    );
  });

  let altPressed = false;

  function handleKeyDown(event: KeyboardEvent) {
    // if alt key is pressed
    if (event.altKey) {
      altPressed = true;
    }
  }

  function handleKeyUp(event: KeyboardEvent) {
    // if alt key is pressed
    if (event.altKey) {
      altPressed = false;
    }
  }

  return (
    <main onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
      <div id="drawingOptions" />
      <div id="cesiumContainer" />
      <Show when={popupPos()?.x && popupPos()?.y && !isNaN(selectedDroneId())}>
        <Tooltip x={popupPos()!.x} y={popupPos()!.y}>
          <DroneTooltipContents id={selectedDroneId()} onStartDrawingPath={startDrawingPath} />
        </Tooltip>
      </Show>
      <Index each={points()}>{(point, i) => <li>{point()}</li>}</Index>
    </main>
  );
}
