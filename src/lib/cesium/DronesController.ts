import type {Cartesian2, Cartesian3, Entity, Viewer} from "cesium";
import * as Cesium from "cesium";
import {type Setter} from "solid-js";
import {pickEntity} from "~/lib/cesium/pickEntity";

export default class DronesController {
  private selectedDrone: Entity | undefined;

  /**
   * Constructs a new Controller of all drones. Manages clicking on drones, tracking drone popups, and adding drones
   */
  constructor(private viewer: Viewer, private setPopupPos: Setter<Cartesian2 | undefined>) {
    viewer.camera.changed.addEventListener(() => {
      if (!this.selectedDrone) return;
      // https://cesium.com/learn/cesiumjs/ref-doc/SceneTransforms.html
      setPopupPos(
        Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, this.selectedDrone.position!.getValue(viewer.scene.lastRenderTime) as Cartesian3)
      );
    });
  }

  /**
   * Determines if click event is on top of drone and updates state accordingly
   * @returns true if a drone was selected/unselected, false otherwise
   */
  tryPickDrone(clickPos: Cartesian2, pathActive: boolean): boolean {
    const pickedEntity = pickEntity(this.viewer, clickPos);
    if (pickedEntity && !pathActive) {  // Select drone only if no active path
      console.log("Picked", pickedEntity);
      this.selectedDrone = pickedEntity;
      this.setPopupPos(
        Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene, this.selectedDrone.position!.getValue(this.viewer.scene.lastRenderTime) as Cartesian3)
      );
      return true;
    }
    if (!pickedEntity && this.selectedDrone) {  // Unselect drone, don't start drawing path
      this.selectedDrone = undefined;
      this.setPopupPos(undefined);
      return true;
    }
    return false;
  }

  // Code to deal with adding Drones!
  // Adapted from https://sandcastle.cesium.com/?src=3D%20Models.html
  addDrone(location: Cartesian3, height: number) {
    this.viewer.entities.removeAll();

    const position = location.clone();
    position.z += height;
    const heading = Cesium.Math.toRadians(135);
    const pitch = 0;
    const roll = 0;
    const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(
      position,
      hpr
    );

    const url = "drone.glb";
    const entity = this.viewer.entities.add({
      //name: url,  // I don't think this is actually important, but keeping just in case
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
}
