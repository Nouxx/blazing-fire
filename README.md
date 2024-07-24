# :fire: Blazing fire

## Pre-requisites

- Docker
- Node

## Dev environment

The env is fully containerized wihtin `compose.yaml`.

`.env` file is necessary. Example one works out of the box.

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

Note: the `node_modules` folders from the Host and Docker containers are isolated from each other.

### Manage dependencies

```bash
npm install|uninstall <package> --workspace=workspace1 --workspace=workspace2 -D
```

### Run the dev env

```bash
docker compose up -d # --profile dev
```

```bash
docker compose up dev
```

Web app will be accessible at localhost:3001

Tip: `COMPOSE_PROFILES` environment variable.

If there is a change in dependencies, you need to rebuild the dev container.

```bash
docker compose build dev
docker compose up dev -d
```

### Test

Made with Playwright and heavily relying on [visual snapshot comparaison](https://playwright.dev/docs/test-snapshots).

```bash
docker compose run --rm test
docker compose run --rm test npx playwright test -u # update snapshots
```

Tests are run against the "production" service instead of the dev env.
If changes are made to the application, it needs to be rebuilt.

```bash
docker compose build web
docker compose up -d web
```

To check the report, use the playwright command in the `web` folder.

```bash
npx playwright show-report # in apps/web
```

### DB

Run these commands from the Host.

```bash
npm run db:dump # dump the current state of the DB to a static file
npm run db:reset # restore the current dump from that file
npm run db:types # generated TS typing for better DX
```

DB volume can also be removed to erase the data.

```bash
docker compose down db -v
```

#### Update Supabase project

Pre requisite: have the supabase project linked.

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
