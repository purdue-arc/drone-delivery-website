import {Box, Button, Typography} from "@suid/material";
import {Index} from "solid-js";
import type PathController from "~/lib/cesium/PathController";

/**
 * TODO: delete
 * @param name
 * @param calories
 * @param fat
 * @param carbs
 * @param protein
 */
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return {name, calories, fat, carbs, protein};
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];


/** TODO */
export default function FlightEditor(props: { points: string[], pathController: PathController }) {
  return (
    <Box padding={2}>
      <Typography variant="h3">Flight</Typography>

      {/* flight name */}
      <label>
        Order Id:
        <input type="number" name="orderId"/>
      </label>
      <br/>

      {/* flight start latitude */}
      <label>
        Flight Start Latitude:
        <input type="text" name="flightStartLatitude"/>
      </label>
      <br/>

      {/* flight end latitude */}
      <label>
        Flight End Latitude:
        <input type="text" name="flightEndLatitude"/>
      </label>
      <br/>

      {/* flight start longitude */}
      <label>
        Flight Start Longitude:
        <input type="text" name="flightStartLongitude"/>
      </label>
      <br/>

      {/* flight end longitude */}
      <label>
        Flight End Longitude:
        <input type="text" name="flightEndLongitude"/>
      </label>
      <br/>

      <Typography variant="h4">Waypoints</Typography>

      <Index each={props.points}>{(point, i) => <li>{point()}</li>}</Index>

      <Button variant="contained" color="primary" href="/flights/create" sx={{marginLeft: "auto"}}>
        Submit Flight
      </Button>
      <Button variant="outlined" color="primary" onClick={() => props.pathController.simulateLocal()} sx={{marginLeft: "auto"}}>
        Simulate Local
      </Button>
      <Button variant="outlined" color="primary" onClick={() => props.pathController.simulateDatabase()} sx={{marginLeft: "auto"}}>
        Simulate Database
      </Button>

    </Box>
  );
}
