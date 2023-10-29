import type {Cartesian2, Cartesian3, Entity, Viewer} from "cesium";
import * as Cesium from "cesium";
import {type Setter} from "solid-js";
import {pickEntity} from "~/lib/cesium/pickEntity";

export default class DronesController {
  private selectedDrone: Entity | undefined;

  /**
   * Takes the value of this.selectedDrone, converts its 3d position to 2d screen space,
   * and uses that to update the popup position. If selectedDrone == undefined, sets popupPos to undefined also
   * @private
   */
  private readonly updatePopupPos: () => void;

  /**
   * Constructs a new Controller of all drones. Manages clicking on drones, tracking drone popups, and adding drones
   * @param viewer a reference to the Cesium viewer
   * @param _setPopupPos function to call when the camera moves with the drone's new screen position (used for sticky ui)
   */
  constructor(private viewer: Viewer, _setPopupPos: Setter<Cartesian2 | undefined>) {
    this.updatePopupPos = () =>
      _setPopupPos(
        this.selectedDrone ?
        Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, this.selectedDrone.position!.getValue(viewer.scene.lastRenderTime) as Cartesian3)
        : undefined
      );

    viewer.camera.changed.addEventListener(() => {
      if (!this.selectedDrone) return;
      // https://cesium.com/learn/cesiumjs/ref-doc/SceneTransforms.html
      this.updatePopupPos();
    });
  }

  /**
   * Determines if click event is on top of drone and updates state accordingly
   * @param clickPos the position the click event occurred at
   * @param pathActive whether or not a flight path is currently being drawn. If it is, disallow selecting drones
   * @returns true if a drone was selected/unselected, false otherwise
   */
  tryPickDrone(clickPos: Cartesian2, pathActive: boolean): boolean {
    const pickedEntity = pickEntity(this.viewer, clickPos);
    if (pickedEntity && !pathActive) {  // Select drone only if no active path
      this.selectedDrone = pickedEntity;
      this.updatePopupPos();
      return true;
    }
    if (!pickedEntity && this.selectedDrone) {  // Unselect drone, don't start drawing path
      this.selectedDrone = undefined;
      this.updatePopupPos();
      return true;
    }
    return false;
  }

  /** Code to deal with adding Drones!
   * @param location position in 3d world to add drone (except height)
   * @param height distance off ground to place drone
   * @see https://sandcastle.cesium.com/?src=3D%20Models.html
   */
  addDrone(location: Cartesian3, height: number) {
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
