import {Box, Button, Stack} from "@suid/material";
import {useNavigate} from "@solidjs/router";

export default function DroneTooltipContents(props: {id: number, onStartDrawingPath: () => void}) {
  const navigate = useNavigate();

  return (
    <Box p={2} width={300}>
      <p>Picking up from Pete's Za</p>
      <p>Battery: 90%</p>
      <Stack spacing={2} direction="row" justifyContent="space-evenly">
        <Button variant="outlined" onClick={props.onStartDrawingPath}>New Flight</Button>
        <Button variant="contained" onClick={() => navigate("/drone/" + props.id)}>View Details</Button>
      </Stack>
    </Box>
  );
}
