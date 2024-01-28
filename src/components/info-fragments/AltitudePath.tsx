import {Box, Button, IconButton, MenuItem, MenuList, Paper, Popper, Stack, Typography} from "@suid/material"; 
import {createEffect, createSignal, For, Index, onMount, Show, untrack, subscribe} from "solid-js";
import {graphql} from "~/gql";
import { createSubscription } from "@merged/solid-apollo";

// write a graphql query to get the altitude of the current drone id from the drone_telemetry databse
const altitudeQuery = graphql(`
subscription DroneInfo($droneId: bigint!) {
    info: drone_telemetry(where: {drone_id: {_eq: $droneId}}, order_by: {timestamp: desc}) {
      altitude
      latitude
      longitude
    }
  }
  
`);


/**
 * function that shows a 2d representation of the altitude of the drone over time
 * @param props.id id of the drone
 */
export default function AltitudePathGraph(props: {id: number}) {
    console.log(props.id);
    const droneAltitudeInfo = createSubscription(altitudeQuery, {variables: {droneId: props.id}});
    createEffect(() => console.log(droneAltitudeInfo()));

    return (
        // simple heaading that says graph
        <Box padding={2}>
            <Typography variant="h3">Graph</Typography>
        </Box>
    );
}