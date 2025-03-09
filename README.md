# :fire: Blazing fire

## Pre-requisites

- Docker
- Node

## Dev environment

The environment is fully containerized within `compose.yaml`.

A `.env` file is necessary at the root. An example `.env.example` file is provided and works out of the box.

## Cheat sheet

### Install project dependencies

For docker `dev` container:

```bash
docker compose run --rm dev npm install
```

For the host:

```bash
npm install
```

Note: The `node_modules` folders on the host and within Docker containers are isolated from each other (explained [here](docs/local-environment.md)).

### Manage dependencies

```bash
npm install package --workspace=workspace2 --workspace=workspace1
```

Note: Whenever the package lock is updated, the base image must be rebuilt for these changes to take effect.

```bash
docker compose build
```

### Run the dev env

Run all the services (supabase, db...)

```bash
docker compose --profile dev up -d
```

Tip: Set the `COMPOSE_PROFILES=dev` environment variable locally.

```bash
docker compose run --rm -P dev
```

Web app will be accessible at `localhost:3001`

If there are changes in dependencies, rebuild the `dev` container:

```bash
docker compose build dev
docker compose up dev -d
```

### Test

Tests are created with Playwright and heavily rely on [visual snapshot comparaison](https://playwright.dev/docs/test-snapshots).

Tests run against a production build app (the `web` service, with no volumes) at `localhost:3000`.

If there's any change in the app source code, rebuild the service:

```bash
docker compose build web
docker compose up web -d
```

To run the test

```bash
docker compose run --rm test
docker compose run --rm test npx playwright test -u # update snapshots
```

If tests fail, a report will be available at `localhost:9323`, as configured by Playwright.

### DB

Run these commands from the host. They use shell scripts to leverage environment variables from the `.env` file used in the Docker composition.

```bash
npm run db:dump  # dump the current state of the DB to a static file
npm run db:reset # restore the current dump from that file
npm run db:types # generated TS typing for better DX
```

To erase the data, remove the DB volume.

```bash
docker compose down db -v
```

### Update Supabase project

Prerequisite: Ensure the Supabase project is linked.

```bash
npx supabase link --project-ref <project-ref>
```

Check migration status on the remote project

```bash
npx supabase migrations list
```

Push local migrations to remote

```bash
npx supabase db push
```
