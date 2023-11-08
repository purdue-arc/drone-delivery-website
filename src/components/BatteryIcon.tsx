import {
  Battery0Bar,
  Battery1Bar,
  Battery2Bar,
  Battery3Bar,
  Battery4Bar,
  Battery5Bar,
  Battery6Bar,
  BatteryFull
} from "@suid/icons-material";
import {Dynamic} from "solid-js/web";


const batteryStatus = [Battery0Bar, Battery1Bar, Battery2Bar, Battery3Bar, Battery4Bar, Battery5Bar, Battery6Bar, BatteryFull];


export default function BatteryIcon(props: {percent: number}) {
  return (
    <Dynamic component={batteryStatus[Math.round(props.percent * (batteryStatus.length - 1))]} sx={{ marginRight: '0.5em' }} />
  );
}
