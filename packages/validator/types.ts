export type InsertFlightsArgs = {
    order_id: number
    drone_id: number
    route: Array<string>
}

export type ValidateOutput = string | null;