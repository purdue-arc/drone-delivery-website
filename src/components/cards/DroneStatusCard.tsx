import {createSignal} from 'solid-js';
import {
  Battery0Bar,
  Battery1Bar,
  Battery2Bar,
  Battery3Bar,
  Battery4Bar,
  Battery5Bar,
  Battery6Bar,
  BatteryFull,
  ExploreOutlined as CompassIcon,
  PlaceOutlined as PlaceIcon,
  SpeedOutlined as SpeedIcon
} from '@suid/icons-material';
import {Dynamic} from "solid-js/web";
import {Box, Button, Card, Grid, Stack, Typography} from "@suid/material";
import {useParams} from "@solidjs/router";

const batteryStatus = [Battery0Bar, Battery1Bar, Battery2Bar, Battery3Bar, Battery4Bar, Battery5Bar, Battery6Bar, BatteryFull];

export default function DroneStatusCard(props: {droneId: number}) {
  const params = useParams();
  const [location, setLocation] = createSignal('40.425651, -86.918249');
  const [direction, setDirection] = createSignal('30 degree North');
  /** miles per hour */
  const [speed, setSpeed] = createSignal(20);
  /** Integer ranging from 0-100 */
  const [battery, setBattery] = createSignal(0.9);

  return (
    <Card variant="outlined" sx={{display: "inline-block", padding: 2}}>
      <Grid container spacing={2}>
        <Grid item>
          <Box sx={{textAlign: "center"}}>
            <img src="/drone.jpg" width="150px" />
          </Box>
          <p>
            <PlaceIcon sx={{ marginRight: '0.5em' }} />
            {location()}
          </p>
          <p>
            <CompassIcon sx={{ marginRight: '0.5em' }} />
            {direction()}
          </p>
          <p>
            <SpeedIcon sx={{ marginRight: '0.5em' }} />
            {speed()} mph
          </p>
          <p>
            <Dynamic component={batteryStatus[Math.round(battery() * (batteryStatus.length - 1))]} sx={{ marginRight: '0.5em' }} />
            {battery() * 100}%
          </p>
        </Grid>
        <Grid item container direction="column" width={500}>
          <Grid item sx={{flexGrow: 99}}>
            <Typography sx={{ fontSize: '2em', fontWeight: 'bold', textAlign: "center" }}>Drone {params.id}</Typography>
            <Typography>✅ Operational / ⚠️ Low battery / 🚨 Crashed</Typography>
            <Typography>Delivering to ___/picking up from _____/parking at/idle</Typography>
          </Grid>
          <Grid item>
            <Stack spacing={2} direction="row" justifyContent="right">
              <Button variant="outlined">View Camera</Button>
              <Button variant="outlined">New Flight</Button>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

