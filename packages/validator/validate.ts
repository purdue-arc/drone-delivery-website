import type { ValidateOutput, CartoDegrees } from "./types";

/**
 * Validates a point along a route
 * @param point point to validate
 */
export function validatePoint(point: CartoDegrees): ValidateOutput {
    const valid = point.latitude >= 40.427919 && point.latitude <= 40.431545 && point.longitude >= -86.931237 && point.longitude <= -86.92643;
    return valid ? null : "point out of bounds";
}

/**
 * Validates the inputed flight params
 * @param route inputed flight params
 */
// in the future, just because all route points are within space doesn't mean that no airspace is violated
export function validateRoute(route: CartoDegrees[]): ValidateOutput {
    const success = route.every(validatePoint);

    let message: ValidateOutput = null;

    if (!success) {
        message = "route out of bounds";
    }

    return message;
}