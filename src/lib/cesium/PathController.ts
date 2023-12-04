import type {Cartesian3} from "cesium";
import * as Cesium from "cesium";

export default class PathController {
  /** Position interpolator: computes position between time and position keyframes */
  private property = new Cesium.SampledPositionProperty();

  /** Time since start of path (starts at t=0 because that's easier to query). Increases as adding new keyframes */
  private elapsedTime = new Cesium.JulianDate();
  /** Last keyframe position added, used to compute next keyframe time in conjunction with `droneSpeed` assuming straight line */
  private lastPosition: Cartesian3 | undefined;

  /**
   * Constructs a new PathController that manages previewing flight paths
   * @param viewer a reference to the Cesium viewer
   * @param droneSpeed in meters per second. Used to compute keyframe timing assuming straight line
   */
  constructor(private viewer: Cesium.Viewer, public readonly droneSpeed: number) {
  }

  /** Start a new flight path. Resets internal state & adds path entity to scene */
  beginPath() {
    this.lastPosition = undefined;
    this.elapsedTime = new Cesium.JulianDate();
    this.property = new Cesium.SampledPositionProperty();
    this.viewer.entities.add({
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

      position: this.property,

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
  }

  /**
   * Add a new keyframe to the flight path. Computes time by assuming constant velocity linear flight path based on `droneSpeed`
   * @param position new position to visit
   */
  extendPath(position: Cartesian3) {
    const deltaTime = Cesium.Cartesian3.distance(this.lastPosition ?? position, position) / this.droneSpeed;
    this.lastPosition = position;
    this.elapsedTime = Cesium.JulianDate.addSeconds(
      this.elapsedTime,
      deltaTime,
      new Cesium.JulianDate(),
    );
    this.property.addSample(this.elapsedTime, position);

    //Also create a point for each sample we generate.
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

  /** Presently does nothing TODO: remove and rename beginPath to something more applicable */
  closePath() {
  }
}
