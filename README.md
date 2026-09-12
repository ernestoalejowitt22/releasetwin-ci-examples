# ReleaseTwin CI portability examples

Proves that [ReleaseTwin](https://github.com/ernestoalejowitt22/ReleaseTwin) release-proof
testing gates a real pull request on more than one CI platform — not just typed YAML
snippets, real green (and red) runs.

Each demo app is minimal, self-contained (no database, no external API), and ships one
real behaviour bug so its case can demonstrate a genuine known-bad → known-good flip.

| Demo | Stack | GitHub Actions | Bitbucket Pipelines | Azure Pipelines |
|---|---|---|---|---|
| [`apps/express-demo/`](apps/express-demo/) | Node / Express + flag-proof | pending first run | pending Bitbucket account | pending Azure DevOps account |
| [`apps/react-demo/`](apps/react-demo/) | React SPA | pending first run | pending Bitbucket account | pending Azure DevOps account |
| [`apps/angular-demo/`](apps/angular-demo/) | Angular SPA | pending first run | pending Bitbucket account | pending Azure DevOps account |

Badges above are filled in once each pipeline has a real run (see the parent proposal,
`ci-portability-live-examples` in `ReleaseTwin`'s `openspec/changes/`).

## These runs feed the live demo

Every GitHub Actions run here uploads its results to the **public example organization** on
ReleaseTwin, rendered read-only for anyone at <https://releasetwin.com/demo> — run history,
redacted evidence, release readiness (`express-demo/1.0`, `spa-demo/1.0`), and the blast
radius of the `currency-normalization` flag. Nothing there is staged: it is these workflows,
on every push.

How: each run step sets `RELEASETWIN_API_URL` and `RELEASETWIN_API_TOKEN`. The token comes from
a repository secret — `RELEASETWIN_API_TOKEN` for all three demos, or `RELEASETWIN_API_TOKEN_EXPRESS`
/ `_REACT` / `_ANGULAR` to land each demo in its own project. When the secret is absent (a fork
PR, a local run, the Bitbucket and Azure mirrors) the token is empty and the CLI skips the
upload; the run passes or fails exactly as before.

## Why a separate repo

The [engine repo](https://github.com/ernestoalejowitt22/ReleaseTwin) is intentionally
.NET-only and AGPL-3.0-licensed. These demo apps need a Node toolchain and are meant for
free reuse/adaptation, so they live here under Apache-2.0 instead.

## Running a demo locally

Each `apps/*-demo/` has its own `README.md` with exact steps. In short: boot the app,
then run the matching case from `ReleaseTwin`'s `examples/cases-*` against it via the
published CLI image:

```bash
docker run --rm --network host \
  ghcr.io/ernestoalejowitt22/releasetwin/cli:0.3.0 run ./cases
```
