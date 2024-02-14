/**
 * Cartographic point with latitude and longitude in degrees and altitude in meters
 */
export interface CartoDegrees {
  latitude: number;
  longitude: number;
  altitude: number;
}

export type InsertFlightsArgs = {
    order_id: number
    drone_id: number
    /**
     * Array of strings in the format: "[latitude, longitude, altitude]"
     */
    route: Array<string>
}

/**
 * string of message if invalid, null if valid
 */
export type ValidateOutput = string | null;