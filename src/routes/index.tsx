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
  // TODO: attach docstrings to destructured properties https://github.com/microsoft/TypeScript/issues/32392
  const [selectedDroneId, setSelectedDroneId] = createSignal<number>();
  const [isDrawingPath, setIsDrawingPath] = createSignal(false);

  let viewer: Cesium.Viewer;
  const drones: Record<number, Entity> = {};
  let pathController: PathController;
  let floatingPoint: Cesium.Entity | undefined;

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

  function startDrawingPath() {
    setIsDrawingPath(true);
    setPopupPos(undefined);
    pathController.beginPath();
    const dronePos = drones[selectedDroneId() as number].position!.getValue(Cesium.JulianDate.now()) as Cartesian3;
    // Create the first floating point
    floatingPoint = createPoint(dronePos);
    pathController.extendPath(dronePos);
  }

  onMount(() => {
    Cesium.Ion.defaultAccessToken = CESSIUM_ACCESS_TOKEN;
    const dronesPos = createSubscription(dronesPosQuery);
    viewer = new Cesium.Viewer("cesiumContainer", {
      selectionIndicator: false,
      infoBox: false,
      terrainProvider: Cesium.createWorldTerrain(),
      sceneModePicker: false,
      timeline: true,
      shouldAnimate: true,
      homeButton: false,
      animation: true,
    });

    const dronesController = new DronesController(viewer, setPopupPos, isDrawingPath);
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

    viewer.animation.viewModel.timeFormatter = function(julianDate, viewModel) {
      // TODO: format the timeline in local time
      const date = Cesium.JulianDate.toDate(julianDate);
      return `LMAO ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    };

    const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
    handler.setInputAction(function(event: ScreenSpaceEventHandler.PositionedEvent) {
      const [selectedDrone, stateChanged] = dronesController.tryPickDrone(event.position);
      if (!isDrawingPath())
        setSelectedDroneId(selectedDrone?.properties?.getValue(new Cesium.JulianDate())?.id);
      if ((stateChanged && !isDrawingPath()) || !isDrawingPath()) {
        return;
      }
      // We use `viewer.scene.pickPosition` here instead of `viewer.camera.pickEllipsoid` so that
      // we get the correct point when mousing over terrain.
      const earthPosition = viewer.scene.pickPosition(event.position);
      // `earthPosition` will be undefined if our mouse is not over the globe.
      if (Cesium.defined(earthPosition)) {
        // Create another point that's permanent
        createPoint(earthPosition);
        pathController.extendPath(addHeight(earthPosition, 100));
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
          }
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    /** Redraw the shape so it's not dynamic, remove the floating point, and remove the last sample in path (used for previewing) */
    function terminateShape() {
      pathController.closePath();
      viewer.entities.remove(floatingPoint);
      floatingPoint = undefined;
    }

    // End the shape
    handler.setInputAction(function() {
      if (!isDrawingPath()) return;
      setIsDrawingPath(false);
      setSelectedDroneId(undefined);
      terminateShape();
      pathController.simulateLocal();
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
      <Show when={popupPos()?.x && popupPos()?.y && selectedDroneId() != undefined}>
        <Tooltip x={popupPos()!.x} y={popupPos()!.y}>
          <DroneTooltipContents id={selectedDroneId()} onStartDrawingPath={startDrawingPath} />
        </Tooltip>
      </Show>
      <Index each={points()}>{(point, i) => <li>{point()}</li>}</Index>
    </main>
  );
}
