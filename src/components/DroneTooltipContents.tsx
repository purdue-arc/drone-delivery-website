import {Box, Button, Stack, Typography} from "@suid/material";
import {useNavigate} from "@solidjs/router";
import DroneWarnings from "~/DroneWarnings";
import BatteryIcon from "~/components/BatteryIcon";
import {Suspense} from "solid-js";
import ReadableDestination from "~/components/ReadableDestination";

export default function DroneTooltipContents(props: {id: number, onStartDrawingPath: () => void}) {
  const navigate = useNavigate();

  return (
    <Box p={2} width={300}>
        <Stack sx={{flexDirection: "column", gap: 2}}>
          <Suspense>
            <DroneWarnings id={props.id} />
            <ReadableDestination id={props.id} />
            <Typography><BatteryIcon percent={0.9} /> 90%</Typography>
          </Suspense>
          <Stack spacing={2} direction="row" justifyContent="space-evenly">
            <Button variant="outlined" onClick={props.onStartDrawingPath}>New Flight</Button>
            <Button variant="contained" onClick={() => navigate("/drone/" + props.id)}>View Details</Button>
          </Stack>
        </Stack>
    </Box>
  );
}
