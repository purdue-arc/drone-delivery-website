import * as Cesium from 'cesium';
import {CameraEventType, Cartesian2, Cartesian3, type ScreenSpaceEventHandler} from 'cesium';
import {createSignal, Index, onMount, Show} from "solid-js";
import "./index.css";
import "cesium/Build/Cesium/Widgets/widgets.css";
import Tooltip from "~/components/Tooltip";
import DroneTooltipContents from "~/components/DroneTooltipContents";
import DronesController from "~/lib/cesium/DronesController";

const CESSIUM_ACCESS_TOKEN = import.meta.env["VITE_CESSIUM_ACCESS_TOKEN"]

export default function Home() {
  const [points, setPoints] = createSignal([] as string[]);
  const [popupPos, setPopupPos] = createSignal<Cartesian2>();

  onMount(() => {
    Cesium.Ion.defaultAccessToken = CESSIUM_ACCESS_TOKEN;

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

    // https://cesium.com/learn/cesiumjs/ref-doc/ScreenSpaceCameraController.html
    const cameraController = viewer.scene.screenSpaceCameraController;
    // TODO: I tried changing controls, but it didn't seem to do anything
    cameraController.translateEventTypes = CameraEventType.MIDDLE_DRAG;
    viewer.camera.percentageChanged = 0.001;


    if (!viewer.scene.pickPositionSupported) {
      window.alert("This browser does not support pickPosition.");
    }

    viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
      Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    );
    // set simulation time
    const start = Cesium.JulianDate.fromDate(new Date(2023, 9, 14, 6));
    const stop = Cesium.JulianDate.addSeconds(
      start,
      3600,
      new Cesium.JulianDate()
    );
    viewer.clock.startTime = start.clone();
    viewer.clock.stopTime = stop.clone();
    viewer.clock.currentTime = start.clone();
    viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //Loop at the end
    viewer.clock.multiplier = 10;
    viewer.timeline.zoomTo(start, stop);
    function computeCirclularFlight(lon: number, lat: number, radius: number) {
      
      const property = new Cesium.SampledPositionProperty();
      for (let i = 0; i <= 360; i += 45) {
        const radians = Cesium.Math.toRadians(i);
        const time = Cesium.JulianDate.addSeconds(
          start,
          i ,
          new Cesium.JulianDate()
        );
        const position = Cesium.Cartesian3.fromDegrees(
          lon + radius * 1.5 * Math.cos(radians),
          lat + radius * Math.sin(radians),
          Cesium.Math.nextRandomNumber() * 500 + 1750
        );
        property.addSample(time, position);

        //Also create a point for each sample we generate.
        viewer.entities.add({
          position: position,
          point: {
            pixelSize: 18,
            color: Cesium.Color.RED,
            outlineColor: Cesium.Color.RED,
            outlineWidth: 3,
          },
        });
      }
      return property;
    }
    function computeLineFlight(startLon: number, startLat: number, endLon: number, endLat: number) {
      const property = new Cesium.SampledPositionProperty();
      const time = Cesium.JulianDate.addSeconds(
        start,
        0 ,
        new Cesium.JulianDate()
      );
      const startPosition = Cesium.Cartesian3.fromDegrees(startLon, startLat, 1750);
      const endPosition = Cesium.Cartesian3.fromDegrees(endLon, endLat, 1750);
      property.addSample(time, startPosition);
      property.addSample(stop, endPosition);
      return property;
    }
    // const position = computeCirclularFlight(-86.917814, 40.422814, 0.03);
    // const entity1 = viewer.entities.add({
    //   //Set the entity availability to the same interval as the simulation time.
    //   availability: new Cesium.TimeIntervalCollection([
    //     new Cesium.TimeInterval({
    //       start: start,
    //       stop: stop,
    //     }),
    //   ]),

    //   //Use our computed positions
    //   position: position,

    //   //Automatically compute orientation based on position movement.
    //   orientation: new Cesium.VelocityOrientationProperty(position),

    //   //Load the Cesium plane model to represent the entity
    //   model: {
    //     uri: "../../public/assets/TwoSidedPlane.gltf",
    //     minimumPixelSize: 64,
    //   },

    //   //Show the path as a pink line sampled in 1 second increments.
    //   path: {
    //     resolution: 1,
    //     material: new Cesium.PolylineGlowMaterialProperty({
    //       glowPower: 0.1,
    //       color: Cesium.Color.YELLOW,
    //     }),
    //     width: 10,
    //   },
    // });

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
    let drawingMode = "line";
    function drawShape(positionData) {
      let shape;
      if (drawingMode === "line") {
        shape = viewer.entities.add({
          polyline: {
            positions: positionData,
            clampToGround: true,
            width: 3,
          },
        });
      } else if (drawingMode === "polygon") {
        shape = viewer.entities.add({
          polygon: {
            hierarchy: positionData,
            material: new Cesium.ColorMaterialProperty(
              Cesium.Color.WHITE.withAlpha(0.7)
            ),
          },
        });
      }
      return shape;
    }

    let activeShapePoints = [] as Cartesian3[];
    let activeShape: Cesium.Entity | undefined;
    let floatingPoint: Cesium.Entity | undefined;

    const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
    handler.setInputAction(function (event: ScreenSpaceEventHandler.PositionedEvent) {
      if (dronesController.tryPickDrone(event.position, activeShapePoints.length > 0)) {
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
          const dynamicPositions = new Cesium.CallbackProperty(function () {
            if (drawingMode === "polygon") {
              return new Cesium.PolygonHierarchy(activeShapePoints);
            }
            return activeShapePoints;
          }, false);
          activeShape = drawShape(dynamicPositions);
        }
        createPoint(earthPosition);
        
        activeShapePoints.push(earthPosition);
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    // Mouse move handler to change the position of the floating point
    handler.setInputAction(function (event) {
      if (Cesium.defined(floatingPoint)) {
        if (!altPressed) {
          const newPosition = viewer.scene.pickPosition(event.endPosition);
          if (Cesium.defined(newPosition)) {
            floatingPoint.position.setValue(newPosition);
            activeShapePoints.pop();
            activeShapePoints.push(newPosition);
          }
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    // Redraw the shape so it's not dynamic and remove the dynamic shape.
    function terminateShape() {
      activeShapePoints.pop();
      drawShape(activeShapePoints);
      viewer.entities.remove(floatingPoint);
      viewer.entities.remove(activeShape);
      floatingPoint = undefined;
      activeShape = undefined;
      activeShapePoints = [];
    }

    // End the shape
    handler.setInputAction(function () {      
      
      let pos = Cesium.Cartographic.fromCartesian(activeShapePoints[0]);
      let pos1 = [pos.longitude / Math.PI * 180, pos.latitude / Math.PI * 180];
      let pos2 = Cesium.Cartographic.fromCartesian(activeShapePoints[1]);
      let pos3 = [pos2.longitude / Math.PI * 180, pos2.latitude / Math.PI * 180];
      const position = computeLineFlight(pos1[0], pos1[0], pos3[0],pos3[1]);
      const entity1 = viewer.entities.add({
        //Set the entity availability to the same interval as the simulation time.
        availability: new Cesium.TimeIntervalCollection([
          new Cesium.TimeInterval({
            start: start,
            stop: stop,
          }),
        ]),
        // convert x and y to lon and lat
       

        //Use our computed positions
        position: Cesium.Cartesian3.fromDegrees(pos1[0], pos1[1], 1750),
  
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
      // viewer.flyTo(entity1);
      // terminateShape();
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

    const options = [
      {
        text: "Draw Lines",
        onselect: function () {
          if (!Cesium.Entity.supportsPolylinesOnTerrain(viewer.scene)) {
            window.alert("This browser does not support polylines on terrain.");
          }

          terminateShape();
          drawingMode = "line";
        },
      },
      {
        text: "Draw Polygons",
        onselect: function () {
          terminateShape();
          drawingMode = "polygon";
        },
      },
    ];


    // Zoom in to Purdue
    const PURDUE_LOCATION = Cartesian3.fromDegrees(-86.9201571, 40.427593, 200.0);
    viewer.camera.lookAt(
      PURDUE_LOCATION,
      new Cartesian3(0, -500, 1600)
    );
    viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);

    var tileset = viewer.scene.primitives.add(
      new Cesium.Cesium3DTileset({
        url: Cesium.IonResource.fromAssetId(1608724),
      })
    );

    // dronesController.addDrone(PURDUE_LOCATION, 10);
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
      <div id="drawingOptions"></div>
      <div id="cesiumContainer"></div>
      <Show when={popupPos()?.x && popupPos()?.y}>
        <Tooltip x={popupPos()!.x} y={popupPos()!.y}>
          <DroneTooltipContents />
        </Tooltip>
      </Show>
      <Index each={points()}>{(point, i) => <li>{point()}</li>}</Index>
    </main>
  );
}
