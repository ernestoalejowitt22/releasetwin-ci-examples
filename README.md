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

How, with **no secret at all**: each job has `permissions: id-token: write` and sets
`RELEASETWIN_PROJECT_ID` from a repository *variable* (`RELEASETWIN_PROJECT_ID` for all three
demos, or `RELEASETWIN_PROJECT_ID_EXPRESS` / `_REACT` / `_ANGULAR` for one project each). The CLI
trades the job's own GitHub OIDC token for a short-lived upload credential; the project must be
bound to `github.com/ernestoalejowitt22/releasetwin-ci-examples` on its Settings page. This is
the same setup any customer's repository uses — see
[releasetwin.com/docs/ci#github-oidc](https://releasetwin.com/docs/ci#github-oidc).

Fallback for a CI without OIDC: a stored `RELEASETWIN_API_TOKEN` secret (the per-demo variants
work too) wins when present. With neither a project id nor a token (a fork PR, a local run, the
Bitbucket and Azure mirrors) the CLI skips the upload; the run passes or fails exactly as before.

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
  ghcr.io/ernestoalejowitt22/releasetwin/cli:0.4.0 run ./cases
```

## See the PR gate live

Fork this repo, break something real in `apps/express-demo/server.js` — for example, make
`GET /orders/:id` always apply the tax multiplier instead of only when the `orders-v2` flag
is enabled — and open a PR back here (or just against your own fork). The
[`releasetwin/releasetwin-action`](https://github.com/marketplace/actions/releasetwin-pr-annotations)
Marketplace Action runs a small case against your change and posts a PR comment plus a
check run named `ReleaseTwin`, updated in place as you push fixes — no ReleaseTwin account,
API token, or hosted call involved (see [`.github/workflows/pr-gate-demo.yml`](.github/workflows/pr-gate-demo.yml)).

Don't want to break anything yourself? See the repo's
[closed pull requests](https://github.com/ernestoalejowitt22/releasetwin-ci-examples/pulls?q=is%3Apr+is%3Aclosed)
for a real example: a genuine regression in the total calculation, caught failing by this
same gate, then pushed to green.
