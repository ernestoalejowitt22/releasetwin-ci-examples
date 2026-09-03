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
  ghcr.io/ernestoalejowitt22/releasetwin/cli:0.2.0 run ./cases
```
