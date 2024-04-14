# Drone Delivery API

Currently validates if flights added to the database are valid through being called by a Hasura Action. It then adds the flights.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Copy `.env.example` to `.env` and add the API auth token.

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Deploying

1. Download Docker Enginer
2. Clone this repo
3. cd into this folder in the repo
4. Copy the `.env.sample` to `.env` and fill it out
5. Run `docker compose up -d`