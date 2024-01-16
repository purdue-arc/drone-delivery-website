import {Box, Button, IconButton, MenuItem, MenuList, Paper, Popper, Stack, Typography} from "@suid/material";
import ClickAwayListener from "~/components/generic/ClickAwayListener";
import ArrowDropUpIcon from '@suid/icons-material/ArrowDropUp';
import NoteAddIcon from '@suid/icons-material/NoteAdd';
import SearchIcon from '@suid/icons-material/Search';
import {createSignal, For, Index} from "solid-js";
import type PathController from "~/lib/cesium/PathController";
import {type Cartographic} from "cesium";

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
export default function FlightEditor(props: { points: Cartographic[], pathController: PathController }) {
  const [isOpen, setIsOpen] = createSignal(false);
  const [selectedIndex, setSelectedIndex] = createSignal(0);
  let anchorRef: HTMLButtonElement | undefined;

  const options = [
    {name: 'Local', onClick: () => props.pathController.simulateLocal()},
    {name: 'Database', onClick: () => props.pathController.simulateDatabase()},
    {name: 'Stop', onClick: () => props.pathController.endSimulation()},
  ];

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
        (none selected)
        <IconButton onClick={() => console.log("new")} title="Create new order">
          <NoteAddIcon />
        </IconButton>
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
        <Button variant="contained" color="primary" href="/flights/create" sx={{marginLeft: "auto"}}>
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
