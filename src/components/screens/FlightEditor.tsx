import {Box, Button, IconButton, MenuItem, MenuList, Paper, Popper, Stack, Typography} from "@suid/material";
import ClickAwayListener from "~/components/generic/ClickAwayListener";
import ArrowDropUpIcon from '@suid/icons-material/ArrowDropUp';
import SearchIcon from '@suid/icons-material/Search';
import {createSignal, For, Index, Show} from "solid-js";
import type PathController from "~/lib/cesium/PathController";
import {type Cartographic, Math as CesiumMath} from "cesium";
import {graphql} from "~/gql";
import {createMutation} from "@merged/solid-apollo";
import NewOrderDialog, {OrderSummary} from "~/components/NewOrderDialog";
import NoteAddIcon from "@suid/icons-material/NoteAdd";

const submitFlightMutation = graphql(`
    mutation SubmitFlight($drone_id: bigint, $order_id: bigint, $start_lat: float8, $start_long: float8, $end_lat: float8, $end_long: float8, $route: [String!]) {
        insert_flights_one(object: {drone_id: $drone_id, order_id: $order_id, start_lat: $start_lat, start_long: $start_long, end_lat: $end_lat, end_long: $end_long, route: $route}) {
            flight_id
        }
    }
`)


/**
 * Sidebar that shows when editing a drone path on index.tsx page
 * @param props.points gps positions of sky waypoints
 * @param props.pathController reference to the active PathController
 * @param props.close Function to call to close component
 */
export default function FlightEditor(props: { points: Cartographic[], pathController: PathController, close: () => void }) {
  const [isOpen, setIsOpen] = createSignal(false);
  const [attachedOrder, setAttachedOrder] = createSignal<OrderSummary>();
  const addFlight = createMutation(submitFlightMutation)[0]
  let anchorRef: HTMLButtonElement | undefined;
  // Fn from `NewOrderDialog` that opens a modal
  let createNewOrder!: () => void;

  const options = [
    {name: 'Local', onClick: () => props.pathController.simulateLocal()},
    {name: 'Database', onClick: () => props.pathController.simulateDatabase()},
    {name: 'Stop', onClick: () => props.pathController.endSimulation()},
  ];

  function submitFlight() {
    if (props.points.length < 2) {
      alert("Need at least 2 points to submit a flight");
      return;
    }
    addFlight({variables: {
      drone_id: props.pathController.drone.id,
      start_long: props.points[0].longitude / CesiumMath.RADIANS_PER_DEGREE,
      start_lat: props.points[0].latitude / CesiumMath.RADIANS_PER_DEGREE,
      end_long: props.points.at(-1)!.longitude / CesiumMath.RADIANS_PER_DEGREE,
      end_lat: props.points.at(-1)!.latitude / CesiumMath.RADIANS_PER_DEGREE,
      route: props.points.map(pt => pt.toString()),
      order_id: attachedOrder()?.orderId,
    }}).then(props.close).catch(alert);
  }

  return (
    <Box padding={2}>
      <Typography variant="h3">Edit Flight</Typography>
      <Typography>
        Controls:<br />
        Left drag: move waypoint parallel to ground<br />
        Alt + Left drag: move waypoint vertically
      </Typography>

      <fieldset>
        <legend>Order Id</legend>
        <Show when={attachedOrder()} fallback={<>(none selected)</>}>
          {JSON.stringify(attachedOrder())}
        </Show>
        <IconButton onClick={() => createNewOrder()} title="Create new order">
          <NoteAddIcon />
        </IconButton>
        <NewOrderDialog setOrder={setAttachedOrder} ref={createNewOrder} dst={props.points.at(-1)!} />
        <IconButton onClick={() => console.log("select")} title="Select existing order">
          <SearchIcon />
        </IconButton>
      </fieldset>

      <Typography variant="h4">Waypoints</Typography>

      <Index each={props.points}>{(point, i) => <li>{point().toString()}</li>}</Index>

      <Stack spacing={2} direction="row" justifyContent="right">
        <Button variant="outlined" ref={anchorRef} onClick={() => setIsOpen(prev => !prev)}>
          Simulate <ArrowDropUpIcon />
        </Button>
        <Button variant="contained" color="primary" onClick={submitFlight}>
          Submit Flight
        </Button>
      </Stack>

      {/* Dropdown for simulate button */}
      <Popper
        open={isOpen()}
        anchorEl={anchorRef}
      >
        <Paper>
          <ClickAwayListener onClickAway={() => setIsOpen(false)}>
            <MenuList>
              <For each={options}>{({name, onClick}) =>
                <MenuItem
                  onClick={onClick}
                >
                  {name}
                </MenuItem>
              }</For>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>

    </Box>
  );
}