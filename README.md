# Drone Delivery Website

This is a [`solid-start`](https://start.solidjs.com) website intended to handle drone operations including:

* Manually contolling the drone
* Operating a network of drones
* Drone delivery operations
* Monitoring drone operations

It uses CesiumJS as a geospatial rendering library.

## Developing

### Cloning

This project is meant to be run in a Docker container so developing it and deploying it is easier. If you are running Windows, make sure to clone this repository in your WSL distro as it will run faster than if you clone it on Windows.

### Access Tokens

CesiumJS requires that you have an access token to be able to access geospatial elements through their service Cesium Ion such as satelite imagery. We don't want to leak that token so that other people can use our , so we store it in an environment variable in a `.env.local` file that the [Vite reads](https://vitejs.dev/guide/env-and-mode.html) from and that is not tracked by git (see `.gitignore`). Copy `.env.local.sample` to `.env.local` by running 

```
cp .env.local.sample .env.local
``` 

and then fill in the access token variable (no quotes surrounding the token).

### Start the server

Make sure you have Docker Desktop installed.

To start the Docker container and development server inside of it, run

```
docker compose up
```

Monitor the logs to make sure everything is running smoothly.

To stop the container, press `Ctrl/Cmd C`

## Building

Solid apps are built with _adapters_, which optimise your project for deployment to different environments.

By default, `npm run build` will generate a Node app that you can run with `npm start`. To use a different adapter, add it to the `devDependencies` in `package.json` and specify in your `vite.config.js`.