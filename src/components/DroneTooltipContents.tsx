import {Box, Button, Stack} from "@suid/material";

export default function DroneTooltipContents() {
  return (
    <Box p={2} width={300}>
      <p>Picking up from Pete's Za</p>
      <p>Battery: 90%</p>
      <Stack spacing={2} direction="row" justifyContent="space-evenly">
        <Button variant="outlined">New Flight</Button>
        <Button variant="contained">View Details</Button>
      </Stack>
    </Box>
  );
}
