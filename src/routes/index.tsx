import { Title } from "solid-start";
import Counter from "~/components/Counter";

import { Viewer } from "cesium";
import { onMount } from "solid-js";
import "./index.css";
import "cesium/Source/widgets/widgets.css";

export default function Home() {
  onMount(() => {
    const viewer = new Viewer("cesiumContainer");
  })

  return (
    <main>
      <Title>Hello World</Title>
      <h1>Hello world! </h1>
      <Counter />
      <div id="cesiumContainer"></div>
      <p>
        Visit{" "}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>{" "}
        to learn how to build SolidStart apps.
      </p>
    </main>
  );
}
