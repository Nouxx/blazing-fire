# :fire: Web Application

:desktop_computer: Web Application developed with [SvelteKit](https://kit.svelte.dev).

:bust_in_silhouette: User Authentication and Database powered by [Supabase](https://supabase.com)

## Developing

### Supabase local environment

Docker is necessary! :whale:

```bash
pnpm supa:start
```

### Setup .env file

Create a `.env` file in this directory with the values specified in [`.env.example`](.env.example).

The `anon` and `service role` keys from your local Supabase environment are required. They can be found by running:

```bash
pnpm supabase status
```

### Build & serve

```bash
pnpm dev
```

Open [localhost:5173](http://localhost:5173)

## Testing

Made with Playwright and heavily relying on [visual snapshot comparaison](https://playwright.dev/docs/test-snapshots).

```bash
pnpm test:e2e
pnpm test:e2e -u # for --update-snapshots
```

## Deploying

The application is deployed within [Vercel](https://vercel.com).

Refer to the [workflow documentation](../../README.md) for more information.
