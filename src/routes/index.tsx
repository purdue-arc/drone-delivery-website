import * as Cesium from 'cesium';
import {createSignal, Index, onMount} from "solid-js";
import "./index.css";
import "cesium/Build/Cesium/Widgets/widgets.css";
import {pickEntity} from "~/lib/cesium/pickEntity";

const CESSIUM_ACCESS_TOKEN = import.meta.env["VITE_CESSIUM_ACCESS_TOKEN"]

export default function Home() {

  const [points, setPoints] = createSignal([] as string[])

  onMount(() => {
    Cesium.Ion.defaultAccessToken = CESSIUM_ACCESS_TOKEN

    const viewer = new Cesium.Viewer("cesiumContainer", {
      selectionIndicator: false,
      infoBox: false,
      terrainProvider: Cesium.createWorldTerrain(),
      timeline: false,
      sceneModePicker: false,
      homeButton: false,
      animation: false,
      shouldAnimate: true,
    });

    if (!viewer.scene.pickPositionSupported) {
      window.alert("This browser does not support pickPosition.");
    }

    viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
      Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    );

    function createPoint(worldPosition: Cesium.Cartesian3) {
      const point = viewer.entities.add({
        position: worldPosition,
        point: {
          color: Cesium.Color.RED,
          pixelSize: 5,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        },
      });
      setPoints((points) => [...points, worldPosition.toString()])
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

    let activeShapePoints = [] as Cesium.Cartesian3[]
    let activeShape: Cesium.Entity | undefined;
    let floatingPoint: Cesium.Entity | undefined;

    const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
    handler.setInputAction(function (event) {
      const pickedEntity = pickEntity(viewer, event.position)
      if (pickedEntity && activeShapePoints.length == 0) {
        // TODO: open ui popup
        console.log("Picked", pickedEntity);
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
      terminateShape();
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

    const options = [
      {
        text: "Draw Lines",
        onselect: function () {
          if (!Cesium.Entity.supportsPolylinesOnTerrain(viewer.scene)) {
            window.alert(
              "This browser does not support polylines on terrain."
            );
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
    const PURDUE_LOCATION = Cesium.Cartesian3.fromDegrees(-86.9201571, 40.427593, 200.0);
    viewer.camera.lookAt(
      PURDUE_LOCATION,
      new Cesium.Cartesian3(0, -500, 1600)
    );
    viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);

    var tileset = viewer.scene.primitives.add(
      new Cesium.Cesium3DTileset({
        url: Cesium.IonResource.fromAssetId(1608724),
      })
    );


    // Code to deal with adding Drones!
    // Adapted from https://sandcastle.cesium.com/?src=3D%20Models.html
    function createModel(url: string, height: number) {
      viewer.entities.removeAll();

      const position = PURDUE_LOCATION.clone();
      position.z += height;
      const heading = Cesium.Math.toRadians(135);
      const pitch = 0;
      const roll = 0;
      const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
      const orientation = Cesium.Transforms.headingPitchRollQuaternion(
        position,
        hpr
      );

      const entity = viewer.entities.add({
        name: url,
        position: position,
        orientation: orientation,
        model: {
          uri: url,
          // This config is responsible for keeping the drone at constant size while zooming out
          // I think this is good b/c it makes finding/clicking drones easier
          minimumPixelSize: 64,
          maximumScale: 20000,
        },
      });
    }

    createModel(
      "drone.glb",
      10,
    );
  })

  let altPressed = false

  function handleKeyDown(event: KeyboardEvent) {
    // if alt key is pressed
    if (event.altKey) {
      altPressed = true
    }
  }

  function handleKeyUp(event: KeyboardEvent) {
    // if alt key is pressed
    if (event.altKey) {
      altPressed = false
    }
  }

  return (
    <main onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
      <div id="drawingOptions"></div>
      <div id="cesiumContainer"></div>
      <Index each={points()}>{(point, i) =>
        <li>{point()}</li>}
      </Index>
    </main>
  );
}
