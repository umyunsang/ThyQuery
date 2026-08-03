# ThyQuery

ThyQuery is a thin, explicit pre-planning layer for ambiguous requests. It iteratively surfaces material assumptions, user-owned preferences, external evidence gaps, and residual uncertainty before handing one accepted intent contract to the host's stock Plan behavior.

Canonical invocation:

- Codex: `$thyquery <query>`
- Claude Code: `/thyquery:thyquery <query>`

The current workspace contains two instruction-first plugin candidates plus a dependency-free development oracle and deterministic conformance fixtures. Neither plugin is installed or enabled. Both live host cells remain `CONFORMANCE_UNTESTED`.

## Non-negotiable behavior

- The user enters stock Plan mode before invoking ThyQuery; the plugin never changes modes.
- Ordinary prompts are untouched.
- One material gap is handled at a time. Candidate count and interaction form are adaptive; fixed Top 3 is not required.
- Research is bounded and used only for external, decision-relevant facts. User preferences must be asked, not inferred from web evidence.
- Closure is a conjunction of graph integrity, philosophical/user-authority conditions, calibrated decision sufficiency, current-contract acceptance, and plan-input readiness.
- **In v1 that conjunction cannot be satisfied.** No calibration ships for any task, risk, or language stratum, so the calibration conjunct is false and `EPISTEMIC_CLOSED` is unreachable. `ACCEPTED_RESIDUAL` — an enumerated residual ledger you explicitly accept — is the only reachable success outcome. This is a fact about the release, not a judgment made per run, and a run that ends there has succeeded rather than fallen short.
- Resource exhaustion and stalls are non-success outcomes.
- After one native plan is observed, the workflow stops and never executes it.

## Local verification

No dependency installation is required:

```sh
npm test
npm run validate
npm run fixtures
```

These commands exercise model-free logic and static package surfaces only. The separately approved inert runner can also be checked with `npm run runner:doctor` and `npm run runner:dry`; neither command can find or start a host. See [runner boundary](docs/live-validation-runner.md), [validation](docs/validation.md), [support status](docs/support-matrix.md), and [installation status](docs/installation-pending.md).

New here? [getting-started.md](docs/getting-started.md) walks through a first invocation and what each outcome means. [installation.md](docs/installation.md) records how to load it — session-only loading is what has actually been exercised; persistent installation stays gated.
