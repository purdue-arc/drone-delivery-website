import type {Cartesian3} from "cesium";
import * as Cesium from "cesium";
import KeyedTimePositionProperty from "~/lib/cesium/KeyedTimePositionProperty";

export default class PathController {
  /** Position interpolator: computes position between time and position keyframes */
  private property: KeyedTimePositionProperty;
  /** Id of the currently active preview node */
  private previewId = -1;

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
    console.log(this.property.pathProp._property);

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
    console.log("previewing", this.previewId);
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
}
