import * as Cesium from "cesium";
import {type Cartesian2, type Viewer} from "cesium";

// Adapted from https://cesium.com/learn/cesiumjs-learn/cesiumjs-creating-entities/#picking

/**
 * Returns the top-most entity at the provided window coordinates
 * or undefined if no entity is at that location.
 *
 * @param {Cartesian2} windowPosition The window coordinates.
 * @returns {Entity} The picked entity or undefined.
 */
export function pickEntity(viewer: Viewer, windowPosition: Cartesian2) {
  const picked = viewer.scene.pick(windowPosition);
  if (Cesium.defined(picked)) {
    const id = Cesium.defaultValue(picked.id, picked.primitive.id);
    if (id instanceof Cesium.Entity) {
      return id;
    }
  }
  return undefined;
}
