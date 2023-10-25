import {
  Battery0Bar,
  Battery1Bar,
  Battery2Bar,
  Battery3Bar,
  Battery4Bar,
  Battery5Bar,
  Battery6Bar,
  BatteryFull,
  BatteryUnknown,
  ExploreOutlined as CompassIcon,
  PlaceOutlined as PlaceIcon,
  SpeedOutlined as SpeedIcon
} from '@suid/icons-material';
import {Dynamic} from "solid-js/web";
import {Box, Button, Card, Grid, Stack, Typography} from "@suid/material";
import {useParams} from "@solidjs/router";
import {graphql} from "~/gql";
import {createSubscription} from "@merged/solid-apollo";
import {Show} from "solid-js";

const batteryStatus = [Battery0Bar, Battery1Bar, Battery2Bar, Battery3Bar, Battery4Bar, Battery5Bar, Battery6Bar, BatteryFull];

const statusQuery = graphql(`
  subscription DroneInfo($droneId: bigint!) {
      now: drone_telemetry_by_pk(id: $droneId) {
          velocity
          latitude
          longitude
          heading
          timestamp
          battery
          altitude
      }
  }
`)

const LoadingElem = () => <span>loading...</span>;


export default function DroneStatusCard() {
  const params = useParams();
  const droneInfo = createSubscription(statusQuery, {variables: {droneId: params.id}});
  // TODO: direct to error page if drone ID doesn't exist

  return (
    <Card variant="outlined" sx={{display: "inline-block", padding: 2}}>
      <Grid container spacing={2}>
        <Grid item>
          <Box sx={{textAlign: "center"}}>
            <img src="/drone.jpg" width="150px" />
          </Box>
          <p>
            <PlaceIcon sx={{ marginRight: '0.5em' }} />
            {/* IDE shows errors, but trust, my type guards are foolproof */}
            {/* TODO: is there an async way of doing this?*/}
            <Show
              when={droneInfo()?.now}
              fallback={LoadingElem()}
            >
              ({droneInfo().now.latitude}, {droneInfo().now.longitude})
            </Show>
          </p>
          <p>
            <CompassIcon sx={{ marginRight: '0.5em' }} />
            <Show
              when={droneInfo()?.now}
              fallback={LoadingElem()}
            >
              {droneInfo().now.heading}
            </Show>
          </p>
          <p>
            <SpeedIcon sx={{ marginRight: '0.5em' }} />
            <Show
              when={droneInfo()?.now}
              fallback={LoadingElem()}
            >
              {droneInfo().now.velocity} mph
            </Show>
          </p>
          <p>
            <Dynamic component={droneInfo()?.now ? batteryStatus[Math.round(droneInfo().now.battery / 100 * (batteryStatus.length - 1))] : BatteryUnknown} sx={{ marginRight: '0.5em' }} />
            <Show
              when={droneInfo()?.now}
              fallback={LoadingElem()}
            >
              {droneInfo().now.battery}%
            </Show>
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

