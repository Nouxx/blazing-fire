# Deployment

Or, should I say, Continuous Deployment

The `main` branch represent the production. Every merge to `main` triggers the release and deploy process.

After merge is requested, **deploy** job is triggered, which does the following:

1. generate the tag based on the most recent tag pushed on `main`
2. build the application with the version as build argument
3. deploy the built artifact
4. tag the commit pushed and push the tag

**Rationale**

- understandable git history (tag = version deployed in prod)
- easy to work with, base branches doesn't have to be up-to-date (even if I think it's better)
- scalable with large teams
- fail safe (deploy failed, no tag, no new version)

**semVer is it?**

It is.

**Does everything gets deployed?**

No, if a PR merge only commit (remember, [squash and merge only](git-semantic.md)) is not bringing anything to the user the **deploy** job mentioned above is exited early.

When pushed to `main`, commit types:

- `ci`, `docs` and `test` does not trigger any new version
- `fix`, `build`, `chore`, `refactor`, `revert` triggers a **patch** bump in the version
- `feat`, `style` and `perf` triggers a **minor** bump in the version
- any type that triggers a version bump appended with `!` triggers a **major** bump in the version

## Rollback

In the event of any issues, the production environment can be rollbacked to a previous version in Vercel console.
