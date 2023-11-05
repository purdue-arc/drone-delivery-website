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
   * @returns tuple:
   *     1st index: the currently selected drone or undefined if none selected
   *     2nd index: true if a drone was selected/unselected, false otherwise
   */
  tryPickDrone(clickPos: Cartesian2, pathActive: boolean): [Entity | undefined, boolean] {
    const pickedEntity = pickEntity(this.viewer, clickPos);
    if (pickedEntity && !pathActive) {  // Select drone only if no active path
      this.selectedDrone = pickedEntity;
      this.updatePopupPos();
      return [this.selectedDrone, true];
    }
    if (!pickedEntity && this.selectedDrone) {  // Unselect drone, don't start drawing path
      this.selectedDrone = undefined;
      this.updatePopupPos();
      return [this.selectedDrone, true];
    }
    return [this.selectedDrone, false];
  }

  /** Change position of a Cesium entity
   * @see addDrone
   */
  setDronePos(entity: Entity, longitude: number, latitude: number, height: number, heading: number) {
    // Cesium uses WGS84 reference ellipsoid (https://epsg.org/ellipsoid_7030/WGS-84.html), same as GPS (https://community.cesium.com/t/get-heighy-value/23064/2)
    // See https://www.unavco.org/education/resources/tutorials-and-handouts/tutorials/geoid-gps-receivers.html for more info on how GPS works
    // Avg height of Purdue is 190m. Cesium renders terrain at the correct height. Check specific height: https://www.daftlogic.com/projects-find-elevation-on-map.htm
    const position = Cesium.Cartesian3.fromDegrees(longitude, latitude, height);
    const hpr = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(heading - 90), 0, 0);
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(
      position,
      hpr
    );
    // These errors can probably be ignored, seems to work
    entity.position = position;
    entity.orientation = orientation;
    return entity;
  }

  /** Add a drone to the Cesium scene at provided location
   * @param id identifier of this drone in the database
   * @param height distance from WGS84 reference ellipsoid to place drone (what you get from GPS)
   * @param heading compass direction (deg) to point in. 0 is north, increase clockwise
   * @see https://sandcastle.cesium.com/?src=3D%20Models.html
   */
  addDrone(id: number, longitude: number, latitude: number, height: number, heading: number) {
    const url = "drone.glb";
    return this.setDronePos(
      this.viewer.entities.add({
        name: String(id),
        model: {
          uri: url,
          // This config is responsible for keeping the drone at constant size while zooming out
          // I think this is good b/c it makes finding/clicking drones easier
          minimumPixelSize: 64,
          maximumScale: 20000,
        },
      }),
      longitude, latitude, height, heading
    );
  }
}
