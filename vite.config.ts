import cesium from 'vite-plugin-cesium';
import {defineConfig} from "@solidjs/start/config";
import suidPlugin from "@suid/vite-plugin";

export default defineConfig({
  plugins: [suidPlugin(), cesium()],
  start: {
    ssr: false,
  },
  server: {
    host: true,
    port: 8080
  }
});
