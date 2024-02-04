import type {Cartesian3, Entity, EntityCollection} from "cesium";
import * as Cesium from "cesium";

export class HistoricPathRenderer {
  /** Color used to render this drone's path */
  private readonly color;

  /** Limit on number of historic position points to show when drone unselected */
  private readonly historyLimit = 6;

  /** Record of where this drone has been since startup */
    // TODO: implement this as a deque for max efficiency
  private readonly history = [] as Entity[];

  constructor(private readonly entities: EntityCollection) {
    this.color = Cesium.Color.fromRandom({ alpha: 1.0 })
    // TODO: make one-time db request to fetch some old data points
  }

  addWaypoint(position: Cartesian3) {
    this.history.push(
      this.entities.add({
        position,
        point: {
          pixelSize: 8,
          color: this.color,
          outlineColor: Cesium.Color.TRANSPARENT,
        },
      })
    );
    for (let ptIdx = 2; ptIdx <= Math.min(this.historyLimit, this.history.length); ptIdx++) {
      const entity = this.history.at(-1 * ptIdx)!;
      const opacityLimit = this.historyLimit * 2;
      entity.point!.color = Cesium.Color.fromAlpha(entity.point!.color!.getValue(new Cesium.JulianDate()), (opacityLimit - ptIdx - 1) / opacityLimit);
    }
    if (this.history.length > this.historyLimit)
      console.log(this.entities.remove(this.history.shift()!));
  }
}
