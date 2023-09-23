import solid from "solid-start/vite";
import cesium from 'vite-plugin-cesium';
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [solid(), cesium()],
  server: {
    host: true,
    port: 8080
  }
});
