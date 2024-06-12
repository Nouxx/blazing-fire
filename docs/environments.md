# Environments

![environments overview](./assets/img/generated/environments.svg)

## Preview & Development

See [architecture page](./architecture.md) for more details about Vercel and Supabase

Following _trunk-based development_, any changes not yet merged into the main branch are not ready for production.

Preview Vercel deployments provide a deployed instance to test before merging any feature branch, allowing for manual verification. One environment is deployed for each open PR.

**Preview Environment URL**: [blazing-fire-preview-pr-xx.vercel.app](#)

The Development Vercel deployment is continuously updated with the latest push to the `main` branch, ensuring there is always a single, current deployment.

**Developement URL**: [blazing-fire-dev.vercel.app](#)

Vercel does not allow (at least in the Free tier) differentiation between "Development" and "Preview" in terms of namespaces, which is why all non-production environments are in the "Preview" namespace.

Both "Preview" and "Development" deployments are linked to the same Supabase project, which means that if a new migration is introduced in a feature branch, it must be run manually in the project.

However, a new push to `main` triggers the CI/CD process and runs the finalized migration in the Supabase Development project.

## Production

When a new tag (following semVer) is pushed to `main`, CI/CD picks it up, creates a new production deployment, and runs any necessary migrations to the Supabase Production project.
