import * as Cesium from "cesium";
import {Cartesian3, type Entity} from "cesium";
import PathController from "~/lib/cesium/PathController";


export interface DroneProperties {
  id: number,
  path?: PathController,
}


export class Drone {
  /**
   * Wrapper around Cesium.Entity for Drones
   */
  constructor(private entity: Entity) {
  }

  get position() {
    return this.entity.position!.getValue(Cesium.JulianDate.now()) as Cartesian3
  }

  /**
   * Change position of a Cesium entity
   * @param longitude GPS longitude
   * @param latitude GPS latitude
   * @param height distance from WGS84 reference ellipsoid to place drone (what you get from GPS)
   * @param heading compass direction (deg) to point in. 0 is north, increase clockwise
   * @see addDrone
   */
  setPos(longitude: number, latitude: number, height: number, heading: number) {
    // Cesium uses WGS84 reference ellipsoid (https://epsg.org/ellipsoid_7030/WGS-84.html), same as GPS (https://community.cesium.com/t/get-heighy-value/23064/2)
    // See https://www.unavco.org/education/resources/tutorials-and-handouts/tutorials/geoid-gps-receivers.html for more info on how GPS works
    // Avg height of Purdue is 190m. Cesium renders terrain at the correct height. Check specific height: https://www.daftlogic.com/projects-find-elevation-on-map.htm
    const position = Cesium.Cartesian3.fromDegrees(longitude, latitude, height);
    const hpr = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(heading - 90), 0, 0);
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(
      position,
      hpr,
    );
    // @ts-ignore These errors can probably be ignored, seems to work
    this.entity.position = position;
    // @ts-ignore
    this.entity.orientation = orientation;
    return this;
  }

  /**
   * Gets custom properties for a Drone at the current time as the correct type
   */
  getProps() {
    console.log(this.entity?.properties?.id);
    return this.entity.properties!.getValue(new Cesium.JulianDate()) as DroneProperties;
  }

  setProp<T extends keyof DroneProperties>(key: T, value: DroneProperties[T]) {
    // TODO: can I use addProperty for both adding & updating?
    this.entity.properties!.addProperty(key, value);
  }
}
