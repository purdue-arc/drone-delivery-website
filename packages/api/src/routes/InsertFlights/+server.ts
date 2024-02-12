import type { RequestEvent, RequestHandler } from './$types';
import type { InsertFlightsArgs, ValidateOutput } from 'validator/types';
import { validateFlight } from 'validator/validate';
import { InsertFlightsStore } from '$houdini';

export const POST: RequestHandler = async (event: RequestEvent) => {
    const request = event.request;
    // to only permit requests from our Hasura Action since this API will be public and this function can write anything to the database
    if (request.headers.get('token') == import.meta.env.VITE_API_TOKEN) {
        const params: InsertFlightsArgs = (await request.json()).input;

        // each element in params.route a string like "[40.431545, -86.931237, 200]"
        // make sure each element has lat and long within the bounds
        const validationMessage = validateFlight(params);
        console.log(validationMessage)

        // if valid route, make graphql request to insert
        if (!validationMessage) {
            const insertFlight = new InsertFlightsStore();

            const response = await insertFlight.mutate(params, { event: event });

            if (response.errors) {
                return new Response(JSON.stringify(response.errors), { status: 500 });
            }
            else {
                return new Response(JSON.stringify(response.data?.insert_flights?.returning[0]), { status: 201 });
            }
        }
        else {
            // JSON output with message key required for errors returned to Hasura Action
            return new Response(JSON.stringify({message: validationMessage}), { status: 400 });
        }
    }
    else {
        return new Response("invalid token header", { status: 401 });
    }
};
