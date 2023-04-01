import { Title } from "solid-start";
import Counter from "~/components/Counter";

// import { Cesium } from "cesium";
import { onMount } from "solid-js";

import { Map } from "maplibre-gl";

export default function Home() {
  onMount(() => {
    var map = new Map({
      container: 'map',
      style: 'https://demotiles.maplibre.org/style.json', // stylesheet location
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  })

  return (
    <main>
      <Title>Hello World</Title>
      <h1>Hello world! </h1>
      <Counter />
      <div id="map" style={{height:"800px", width: '800px'}}></div>
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
