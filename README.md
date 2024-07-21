# :fire: Blazing fire

## Cheat sheet

### Install project dependencies

```bash
docker compose run --rm dev npm install
```

## Add new dependency

```bash
pnpm add <package> --filter <workspace>
pnpm remove <package> --filter <workspace>
pnpm update <package> --latest | <package>@v2 --filter <workspace>
```

### Run npm script

```bash
pnpm <script-name>
pnpm turbo run <script-name>
```
