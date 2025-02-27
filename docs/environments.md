# Environments

![environments overview](./assets/img/generated/environments.svg)

## Local

Local environemnt is fully isolated from the rest of the world. See more details [here](local-environment.md).

## Preview

See [architecture page](./architecture.md) for more details about Vercel and Supabase

Following _trunk-based development_, any changes not yet merged into the main branch are not ready for production.

Preview Vercel deployments provide a deployed instance to test before merging any feature branch, allowing for manual verification using the production Supabase instance.

**Preview Environment URL**: [blazing-fire-preview-pr-xx.vercel.app](#)

_Note: if a new feature branch includes a Supabase migration, it will not be run in the same project used in production for OBVIOUS reasons._

_The Supabase "database branching" would help but is only available in Pro plan, which I do not intend to subscrib to (at least, yet)._

_For this reason, ephemeral environments should be made optional in CI. ([issue](https://github.com/Nouxx/blazing-fire/issues/27))._

## Production

When a new commit is pushed to `main`, CI/CD picks it up, creates a new production deployment, and runs any necessary migrations to the Supabase Production project.

CD style, baby!
