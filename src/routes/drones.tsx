import {Box, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@suid/material";
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


export default function Drones() {
  return (
    <Box padding={2}>
      <Typography variant="h3">All Drones</Typography>
      {/* border color theme: https://github.com/mui/material-ui/blob/3e08a6ffd60ec76f66ccf731a17c66944037e89e/packages/mui-material/src/TableCell/TableCell.js#L52 */}
      {/* Adapted from: https://mui.com/material-ui/react-table/#basic-table */}
      <Card variant="outlined">
        <TableContainer> {/* Doesn't seem like "component" prop is working */}
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <For each={rows}>{(row, i) =>
                <TableRow
                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              }</For>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  )
}
