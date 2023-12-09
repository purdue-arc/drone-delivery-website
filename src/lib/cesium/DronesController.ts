import type {Cartesian2, Cartesian3, Entity, ModelGraphics, Viewer} from "cesium";
import * as Cesium from "cesium";
import type {Accessor, Setter} from "solid-js";
import {pickEntity} from "~/lib/cesium/pickEntity";

export const droneModel: ModelGraphics.ConstructorOptions = {
  uri: "drone.glb",
  // This config is responsible for keeping the drone at constant size while zooming out
  // I think this is good b/c it makes finding/clicking drones easier
  minimumPixelSize: 64,
  maximumScale: 20000,
};

export default class DronesController {
  private selectedDrone: Entity | undefined;

  /**
   * Takes the value of this.selectedDrone, converts its 3d position to 2d screen space,
   * and uses that to update the popup position. If selectedDrone == undefined, sets popupPos to undefined also
   */
  private readonly updatePopupPos: () => void;

  /**
   * Constructs a new Controller of all drones. Manages clicking on drones, tracking drone popups, and adding drones
   * @param viewer a reference to the Cesium viewer
   * @param _setPopupPos function to call when the camera moves with the drone's new screen position (used for sticky ui)
   * @param isDrawingPath Function that returns whether a path is currently being drawn (probably a Solid signal). If true, disallow selecting drones
   */
  constructor(private viewer: Viewer, _setPopupPos: Setter<Cartesian2 | undefined>, private isDrawingPath: Accessor<boolean>) {
    this.updatePopupPos = () =>
      _setPopupPos(
        this.selectedDrone ?
        Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, this.selectedDrone.position!.getValue(viewer.scene.lastRenderTime) as Cartesian3)
        : undefined,
      );

    viewer.camera.changed.addEventListener(() => {
      if (!this.selectedDrone || this.isDrawingPath()) return;
      // https://cesium.com/learn/cesiumjs/ref-doc/SceneTransforms.html
      this.updatePopupPos();
    });
  }

  /**
   * Determines if click event is on top of drone and updates state accordingly
   * @param clickPos the position the click event occurred at
   * @returns tuple:
   *     1st index: the currently selected drone or undefined if none selected
   *
   *     2nd index: true if a drone was selected/unselected, false otherwise
   */
  tryPickDrone(clickPos: Cartesian2): [Entity | undefined, boolean] {
    const pickedEntity = pickEntity(this.viewer, clickPos);
    if (pickedEntity && !this.isDrawingPath()) {  // Select drone only if no active path
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

  /**
   * Change position of a Cesium entity
   * @param entity Cesium entity to modify
   * @param longitude GPS longitude
   * @param latitude GPS latitude
   * @param height distance from WGS84 reference ellipsoid to place drone (what you get from GPS)
   * @param heading compass direction (deg) to point in. 0 is north, increase clockwise
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
      hpr,
    );
    // These errors can probably be ignored, seems to work
    entity.position = position;
    entity.orientation = orientation;
    return entity;
  }

  /**
   * Add a drone to the Cesium scene at provided location
   * @param id identifier of this drone in the database
   * @param longitude GPS longitude
   * @param latitude GPS latitude
   * @param height distance from WGS84 reference ellipsoid to place drone (what you get from GPS)
   * @param heading compass direction (deg) to point in. 0 is north, increase clockwise
   * @see https://sandcastle.cesium.com/?src=3D%20Models.html
   */
  addDrone(id: number, longitude: number, latitude: number, height: number, heading: number) {
    return this.setDronePos(
      // TODO: ignore scene lighting, hard to see at night
      this.viewer.entities.add({
        model: droneModel,
        properties: {id},
      } satisfies Entity.ConstructorOptions),
      longitude, latitude, height, heading,
    );
  }
}
