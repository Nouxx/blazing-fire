# Semantic

All PRs (being merged to `main`) are merged solely using the _"Squash and Merge"_ option.

When merging, the (only) commit message is filled by default with the PR title and its format is secured with a ruleset.

**Why?**

Mainly to linear git history and a clean main branch by avoiding "points in time in your main branch where tests did not pass".

_(wisdom from [release-please](https://github.com/googleapis/release-please))_

## Convention

One must follow the [conventional commit convention](https://www.conventionalcommits.org/en/v1.0.0).

Allowed types:

- `build`
- `chore`
- `ci`
- `docs`
- `feat`
- `fix`
- `perf`
- `refactor`
- `revert`
- `style`
- `test`

### No uppercase

Personal preference

`chore(whatever): I don't like this (Ok?)`
`chore(whatever): this is my more my taste`
