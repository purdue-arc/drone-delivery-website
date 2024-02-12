import type { InsertFlightsArgs, ValidateOutput } from "./types";

/**
 * 
 */
export function validateFlight(flightParams: InsertFlightsArgs): ValidateOutput {
    const success = flightParams.route.every((element: string) => {
        // eslint-disable-next-line unused-imports/no-unused-vars
        const [lat, long, alt] = element.slice(1, -1).split(",").map(Number);

        // Restrict to Purdue Gold Intermural Fields
        return lat >= 40.427919 && lat <= 40.431545 && long >= -86.931237 && long <= -86.92643;
    });

    let message: ValidateOutput = null;

    if (!success) {
        message = "route out of bounds";
    }

    return message;
}