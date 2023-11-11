import "./Tooltip.css";
import {type JSX} from "solid-js";

export default function Tooltip(props: { children: JSX.Element, x: number, y: number }) {
  return (
    <div class="tooltip" style={{top: props.y + "px", left: props.x + "px"}}>
      <span class="tooltiptext">{props.children}</span>
    </div>
  );
}
