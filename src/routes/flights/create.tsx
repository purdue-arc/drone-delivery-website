import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button} from "@suid/material";
import {For} from "solid-js";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


export default function Flights() {
  return (
    <Box padding={2}>
        
    <Typography variant="h3">Create a New Flight</Typography>

    {/* create a form */}
    <form>
      {/* flight name */}
      <label>
        Order Id:
        <input type="number" name="orderId" />
      </label>
      <br />
      {/* flight start latitude */}
      <label>
        Flight Start Latitude:
        <input type="text" name="flightStartLatitude" />
      </label>
      <br />
      {/* flight end latitude */}
      <label>
        Flight End Latitude:
        <input type="text" name="flightEndLatitude" />
      </label>
      <br />
      {/* flight start longitude */}
      <label>
        Flight Start Longitude:
        <input type="text" name="flightStartLongitude" />
        </label>
        <br />
        {/* flight end longitude */}
        <label>
        Flight End Longitude:
        <input type="text" name="flightEndLongitude" />
        </label>
        <br />
        <Typography variant="h4">Waypoints</Typography>
            {/* i am using soidjs and material ui. i want to make a form component to college n number of waypoints, each waypoint has a lat and a longh */}

            {/* for loop */}
            


            

        </form>
        <Button variant="contained" color="primary" href="/flights/create" sx={{marginLeft: "auto"}}>
            Create Flight
        </Button>

    </Box>
  )
}
