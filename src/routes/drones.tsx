
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@suid/material";
import {For, createSignal} from "solid-js";
import {graphql} from "~/gql";
import {createSubscription} from '@merged/solid-apollo'


const SUBSCRIPTION = graphql(`
subscription GetDrones {
  drone_telemetry(order_by: {timestamp: desc}, limit: 1) {
    drone {
      drone_id
      is_active
    }
    latitude
    longitude
    timestamp
    velocity
    heading
  }
}
`);

export default function Drones() {

  let data = createSubscription(SUBSCRIPTION);

  // Extract the first element from the data array
  let firstData = data()?.drone_telemetry[0] || {};

  // Get the column names from the keys of the first element
  let columnNames = Object.keys(firstData);

  // Create a SolidJS reactive signal for data
  let [rows, setRows] = createSignal(data()?.drone_telemetry || []);

  return (
    <Box padding={2}>
      <Typography variant="h3">All Drones</Typography>
      <TableContainer sx={{ borderRadius: 2, border: 1, borderColor: 'rgba(224.4, 224.4, 224.4, 1)' }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columnNames.map((columnName) => (
                <TableCell>{columnName}</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            <For each={rows()}>{(row, i) => (
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {columnNames.map((columnName) => (
                  <TableCell>{row[columnName]}</TableCell>
                )}
              </TableRow>
            )}
            </For>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}