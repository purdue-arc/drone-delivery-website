import {Box, Button, Stack} from "@suid/material";
import {useNavigate} from "@solidjs/router";
import DroneWarnings from "~/DroneWarnings";
import BatteryIcon from "~/components/BatteryIcon";
import {Suspense} from "solid-js";

export default function DroneTooltipContents(props: {id: number, onStartDrawingPath: () => void}) {
  const navigate = useNavigate();

  return (
    <Box p={2} width={300}>
      <Suspense>
        <DroneWarnings id={props.id} />
        <p>Picking up from Pete's Za</p>
        <p><BatteryIcon percent={0.9} /> 90%</p>
      </Suspense>
      <Stack spacing={2} direction="row" justifyContent="space-evenly">
        <Button variant="outlined" onClick={props.onStartDrawingPath}>New Flight</Button>
        <Button variant="contained" onClick={() => navigate("/drone/" + props.id)}>View Details</Button>
      </Stack>
    </Box>
  );
}
