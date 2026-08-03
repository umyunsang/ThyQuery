<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/wordmark-dark.svg">
    <img src="docs/wordmark-light.svg" alt="ThyQuery — thy query, 그대의 질의" width="470">
  </picture>
</p>

<p align="center"><strong>thy query</strong> · 그대의 질의 — the query stays yours.</p>

ThyQuery is a pre-planning layer for Claude Code. When a request is ambiguous, it asks you one question at a time about the things that would actually change the plan, writes down what it could not resolve, and hands one accepted intent to Claude Code's own Plan mode. Then it stops.

It does not guess what you meant. Preferences, priorities, and risk decisions belong to you, so ThyQuery asks for them rather than inferring them from your codebase or from the web.

## What it does

- **One question per material gap.** A gap is material only when answering it differently would produce a different plan. This is not a questionnaire, and it is not a fixed list of three options.
- **Research only for external facts.** Bounded, from official or primary sources, and only when the answer can change the plan. Your preferences are asked, never looked up.
- **Every unresolved thing is named.** Each residual carries its impact, mitigation, reversibility, and owner, and you accept them explicitly — casual assent does not count.
- **Exactly one plan, then it stops.** It hands off to the stock planner once and ends. It does not approve, implement, or execute anything.

## Install

Session-only loading is the path this project has actually exercised. Nothing is installed, nothing is enabled, and the load lasts exactly one session:

```sh
git clone https://github.com/umyunsang/ThyQuery.git
claude --plugin-dir ThyQuery/plugins/claude-thyquery
```

Persistent installation is recorded but has **not** been performed or tested — see [installation.md](docs/installation.md) for the gating:

```sh
claude plugin marketplace add umyunsang/ThyQuery
claude plugin install thyquery@thyquery
```

## Use

Enter Claude Code's stock Plan mode first, then invoke:

```
/thyquery:thyquery Make the onboarding flow better
```

What follows is a loop. It reads its own contract, observes read-only, asks one question for one gap, commits your answer, then re-evaluates the whole ladder from a fresh snapshot — and circles until a guard fires. Reading, observing, and re-evaluating cost nothing; only committed progress spends the budget of twelve macrosteps.

[getting-started.md](docs/getting-started.md) walks through a full first run and what each ending means.

## What it will not do

- **It never fires on its own.** The skill sets `disable-model-invocation: true`, so ordinary prompts are untouched. Install it, forget it, and nothing about your sessions changes.
- **It never switches modes for you.** Invoked outside Plan mode it returns `PLAN_MODE_REQUIRED` and does nothing else — no question, no research, no side effect. Enter Plan mode and invoke again; nothing is lost.
- **It never edits your code.** This was tested with the means to break it: conformance sessions ran with `Write` available under a contract forbidding edits, and the source tree digest was byte-identical afterwards.
- **It never executes the plan.** One native plan is observed, then `COMPLETE_AFTER_PLAN`. Reviewing and approving that plan is yours.

## Outcomes

Every invocation ends by naming its outcome. It never just goes quiet.

| Outcome | What it means |
|---|---|
| `ACCEPTED_RESIDUAL` | **Success.** A contract whose open questions are enumerated and which you explicitly accepted. |
| `PLAN_MODE_REQUIRED` | Plan mode was not active. Enter it and re-invoke. |
| `BLOCKED` | A gap only you can close has no admissible action left. Usually one line from you unblocks it. |
| `STALLED` | Repetition or oscillation without new evidence. |
| `RESOURCE_EXHAUSTED` | The transition budget ran out. A typed non-success, not a partial win. |
| `CANCELLED` | You stopped it. Nothing continues in the background. |

**`EPISTEMIC_CLOSED` is unreachable in v1.** Full resolution requires a calibration this release does not ship — no calibration exists for any task, risk, or language stratum — so `ACCEPTED_RESIDUAL` is the only reachable success outcome. That is unreachable by construction rather than by judgment, and a run ending there has succeeded rather than fallen short. See [getting-started.md](docs/getting-started.md) for the remaining outcomes.

## Status

**v0.1.0 — pre-release.** Claude Code only.

- **Conformance: 7 of 9 cases pass** on `claude-opus-5` in one interactive environment. A pass on one model is not a claim about the host in general.
- **Efficacy: unevaluated.** Conformance means the plugin does what it says. It does not mean the resulting plans are better than what you would have got without it. The A/B/C/D evaluation is preregistered and has not been run.
- **Codex: source, not a product.** `plugins/codex-thyquery` ships in the tree and is deliberately absent from the marketplace manifest. It has never been loaded or run.

[CHANGELOG.md](CHANGELOG.md) states what is and is not verified, in full.

## Documentation

| Document | What it covers |
|---|---|
| [getting-started.md](docs/getting-started.md) | A first invocation, the loop, and every ending |
| [installation.md](docs/installation.md) | What is exercised, what is gated, and why |
| [architecture.md](docs/architecture.md) | The contract, the guarded graph, and the closure rule |
| [support-matrix.md](docs/support-matrix.md) | Per-surface evidence and current host status |
| [privacy-and-retention.md](docs/privacy-and-retention.md) | What is kept during an invocation, and what is not |
| [validation.md](docs/validation.md) · [implementation-evidence.md](docs/implementation-evidence.md) | How the claims above were checked |

## Development

No dependency installation is required, and none is permitted — the package ships no runtime and carries no `dependencies`. Node 22 or newer:

```sh
npm test        # 81 model-free tests
npm run check   # tests, manifest and package validation, parity, fixtures
```

These exercise model-free logic and static package surfaces only. The inert live-validation runner can be checked with `npm run runner:doctor` and `npm run runner:dry`; neither can find or start a host. See [live-validation-runner.md](docs/live-validation-runner.md) for that boundary.

## License

[MIT](LICENSE)
