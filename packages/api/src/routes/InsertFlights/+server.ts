import type {RequestEvent, RequestHandler} from './$types';
import type {CartoDegrees, InsertFlightsArgs} from 'validator/types';
import {validateRoute} from 'validator/validate';
import {type InsertFlights$result, InsertFlightsStore} from '$houdini';

export const POST: RequestHandler = async (event: RequestEvent) => {
    const { body, status } = await InsertFlights(event);
    return new Response(JSON.stringify(body), { status });
};

// Types to make sure we are returning the correct response format to Hasura
type ErrorStatusCode = 400 | 401 | 500;

// Docs: https://hasura.io/docs/latest/actions/action-handlers/#returning-an-error-response
interface HasruaErrorResponse {
    body: { message: string }
    status: ErrorStatusCode
}

// Docs: https://hasura.io/docs/latest/actions/action-handlers/#returning-a-success-response
interface HasuraSuccessResponse {
    body: Exclude<InsertFlights$result["insert_flights"], null>["returning"][0]
    status: 201
}

async function InsertFlights(event: RequestEvent): Promise<HasruaErrorResponse | HasuraSuccessResponse> {
    const request = event.request;
    // to only permit requests from our Hasura Action since this API will be public and this function can write anything to the database
    if (request.headers.get('token') == import.meta.env.VITE_API_TOKEN) {
        const params: InsertFlightsArgs = (await request.json()).input;

        const route: CartoDegrees[] = params.route.map((point) => {
            const [latitude, longitude, altitude] = JSON.parse(point);
            return {latitude, longitude, altitude};
        });

        // each element in params.route a string like "[40.431545, -86.931237, 200]"
        // make sure each element has lat and long within the bounds
        const validationMessage = validateRoute(route);

        // if valid route, make graphql request to insert
        if (!validationMessage) {
            const insertFlight = new InsertFlightsStore();

            const response = await insertFlight.mutate(params, { event: event });

            if (response.errors) {
                return {
                    // Can't return all errors cause only one message allowed :/
                    body: response.errors[0],
                    status: 500
                };
            }
            else {
                return {
                    body: response.data!.insert_flights!.returning[0],
                    status: 201
                };
            }
        }
        else {
            // JSON output with message key required for errors returned to Hasura Action
            return {
                body: { message: validationMessage }, status: 400
            };
        }
    }
    else {
        return {
            body: { message: "invalid token header" }, status: 401
        };
    }
}
