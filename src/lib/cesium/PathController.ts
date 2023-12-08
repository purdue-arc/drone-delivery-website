import type {Cartesian3} from "cesium";
import * as Cesium from "cesium";
import KeyedTimePositionProperty from "~/lib/cesium/KeyedTimePositionProperty";
import {droneModel} from "~/lib/cesium/DronesController";

export default class PathController {
  /** Position interpolator: computes position between time and position keyframes */
  private property: KeyedTimePositionProperty;
  /** Id of the currently active preview node */
  private previewId = -1;
  /** Cesium entity corresponding to the yellow path in the sky */
  private skyPathEntity: Cesium.Entity | undefined;
  /** javascript interval id when simulating on database */
  private simulationInterval: number | undefined;

  /**
   * Constructs a new PathController that manages previewing flight paths
   * @param viewer a reference to the Cesium viewer
   * @param droneSpeed in meters per second. Used to compute keyframe timing assuming straight line
   */
  constructor(private viewer: Cesium.Viewer, public readonly droneSpeed: number) {
    this.property = new KeyedTimePositionProperty(droneSpeed);
  }

  /** Start a new flight path. Resets internal state & adds path entity to scene */
  beginPath() {
    this.property = new KeyedTimePositionProperty(this.droneSpeed);
    this.previewId = -1;
    this.skyPathEntity = this.viewer.entities.add({
      //Set the entity availability to the same interval as the simulation time.
      availability: new Cesium.TimeIntervalCollection([
        new Cesium.TimeInterval({
          start: new Cesium.JulianDate(),
          // Necessary to view path. INFINITY & MAX_INTEGER don't work
          stop: Cesium.JulianDate.addDays(
            Cesium.JulianDate.now(),
            365,
            new Cesium.JulianDate(),
          ),
        }),
      ]),

      position: this.property.pathProp,

      //Show the path sampled in 1 second increments.
      path: {
        resolution: 1,
        material: new Cesium.PolylineGlowMaterialProperty({
          glowPower: 0.1,
          color: Cesium.Color.YELLOW,
        }),
        width: 10,
      },
    });
    // TODO: test if it's possible/necessary to round corners. This attempt veered too far off course
    // this.property.pathProp.setInterpolationOptions({
    //   interpolationDegree: 2,
    //   interpolationAlgorithm: Cesium.HermitePolynomialApproximation,
    // });

    // Add the white path on the ground
    this.viewer.entities.add({
      polyline: {
        positions: this.property.positionProp,
        clampToGround: true,
        width: 3,
      },
    });
  }

  /**
   * Add a new keyframe to the flight path. Computes time by assuming constant velocity linear flight path based on `droneSpeed`
   * @param position new position to visit
   */
  extendPath(position: Cartesian3) {
    this.previewPath(position);
    this.previewId = -1;

    //Also create a point for each sample we generate.
    // TODO: allow clicking through handles & line when placing points, otherwise can cause weird stacking
    this.viewer.entities.add({
      position: position,
      point: {
        pixelSize: 8,
        color: Cesium.Color.TRANSPARENT,
        outlineColor: Cesium.Color.YELLOW,
        outlineWidth: 3,
      },
    });
  }

  /**
   * Remove current preview node, then add a new keyframe to path, one second from `elapsedTime` so it can be easily found.
   * Also doesn't render adjustment handle (circle)
   * @param position new position to preview
   */
  previewPath(position: Cartesian3) {
    if (this.previewId >= 0) {
      console.assert(this.property.editSample(this.previewId, position));
    } else {  // previewId == -1
      this.previewId = this.property.addSample(position);
    }
  }

  /** Removes preview path node */
  closePath() {
    this.property.removeSample(this.previewId);
    this.property.setIsConstant(false);
  }

  /** Simulate the created drone path by animating a drone along its path (does not write to database) */
  simulateLocal() {
    if (!this.skyPathEntity)
      throw "No path to simulate";
    this.property.startTime = Cesium.JulianDate.now();
    this.skyPathEntity.model = new Cesium.ModelGraphics(droneModel);
    this.skyPathEntity.orientation = new Cesium.VelocityOrientationProperty(this.property.pathProp);
  }

  /** Simulate the created drone path by sending fake telemetry events to the database */
  simulateDatabase() {
    if (!this.skyPathEntity)
      throw "No path to simulate";
    this.property.startTime = Cesium.JulianDate.now();
    const simulationFrequency = 500;
    this.simulationInterval = window.setInterval(this.simulateDatabaseTick, simulationFrequency);
  }

  /** Call every time interval when simulating on database*/
  private simulateDatabaseTick() {
    // TODO
  }

  /** Stop simulation & clean up objects */
  endSimulation() {
    if (!this.skyPathEntity)
      throw "No path to simulate";
    this.skyPathEntity.model = undefined;
    this.skyPathEntity.orientation = undefined;
    window.clearInterval(this.simulationInterval);
  }
}
