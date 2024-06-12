# Git workflow

Following the principles of _"trunk-based development"_ practices, all codebase modifications are merged incrementally into the `main` branch (the trunk).

To maintain a production-ready state, every change is integrated through pull requests, which undergo automated and manual verifications before the merge.

Once substantial changes has been gathered, a new release is created and a new tag (following semVer) is pushed, then automatically promoted to production.

In the event of any issues, the production environment can be rollbacked.
