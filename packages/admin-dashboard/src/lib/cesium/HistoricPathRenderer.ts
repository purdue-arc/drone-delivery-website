import type {Cartesian3, Entity, EntityCollection} from "cesium";
import * as Cesium from "cesium";
import {graphql} from "~/gql";
import {createLazyQuery} from "@merged/solid-apollo";

const droneHistoryQuery = graphql(`
  query DroneHistory($id: bigint, $limit: Int) {
    drone_telemetry(where: {drone_id: {_eq: $id}}, order_by: {timestamp: desc}, limit: $limit) {
      altitude
      heading
      latitude
      longitude
      timestamp
    }
  }
`);

export class HistoricPathRenderer {
  /** Color used to render this drone's path */
  private readonly color;

  /** Limit on number of historic position points to show when drone unselected */
  private readonly historyLimit = 6;

  /** Record of where this drone has been since startup */
    // TODO: implement this as a deque for max efficiency
  private readonly history = [] as Entity[];

  private readonly runHistoryQuery;

  /**
   * Display a few dots for the historical path of the drone
   * @param entities likely `viewer.entities` to add dots to
   * @param droneId id of drone owner
   */
  constructor(private readonly entities: EntityCollection, private readonly droneId: number) {
    this.color = Cesium.Color.fromRandom({ alpha: 1.0 });
    this.runHistoryQuery = createLazyQuery(droneHistoryQuery, {
      variables: {
        id: this.droneId
      }
    })[0];
    this.fetchHistory(this.historyLimit).then(history => history.forEach(pt => this.addWaypoint(pt)));
  }

  /** Fetch the specified number of historical points and convert to Cartesian3 */
  private async fetchHistory(limit: number) {
    return (await this.runHistoryQuery({variables: {limit}})).drone_telemetry.map(point => Cesium.Cartesian3.fromDegrees(point.longitude, point.latitude, point.altitude));
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
    if (this.history.length > this.historyLimit)
      console.log(this.entities.remove(this.history.shift()!));
  }

  showFullHistory() {
    // Show last 30 points
  }

  hideFullHistory() {

  }
}
