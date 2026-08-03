<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/wordmark-dark.svg">
    <img src="docs/wordmark-light.svg" alt="ThyQuery — thy query, 그대의 질의" width="470">
  </picture>
</p>

<p align="center"><strong>thy query</strong> · 그대의 질의 — the query stays yours.</p>

---

> **"Make the onboarding flow better."**

Your coding agent will build something. The question is whether it builds *your* something.

Ambiguous requests do not fail loudly. They produce a confident, well-structured plan for a project you did not ask for — and you find out four files in, when the one thing you actually cared about was never on the table. The agent was never confused. It just picked an interpretation, silently, and never told you there was a choice.

**ThyQuery makes it ask first.**

## What changes

Without it, the interpretation happens in silence:

```
> Make the onboarding flow better

⏺ I'll redesign the signup form, add a progress indicator,
  and split the profile step into two screens...
```

With it, the interpretation becomes a question — one question, about the one thing that actually forks the plan:

```
> /thyquery:thyquery Make the onboarding flow better

⏺ "Better" resolves two ways here, and they do not produce the same plan.
  Fewer drop-offs means cutting steps. Faster completion means keeping the
  steps and reducing the work in each. Which are you optimizing?

  1. Fewer drop-offs      2. Faster completion      3. Something else — I'll type it
```

<sub><i>Illustrative. Not a recorded session — see <a href="CHANGELOG.md">CHANGELOG.md</a> for what has actually been observed.</i></sub>

Then it hands one accepted intent to your agent's own Plan mode, and stops.

## Why this is not just "ask me clarifying questions"

A prompt that says *ask clarifying questions* asks three up front and then proceeds regardless of the answers. ThyQuery is a guarded state machine, and the guards are the product:

- **It asks one question, only when the answer changes the plan.** A gap is material only if answering it differently would produce a different plan. No questionnaires, no ritual list of three.
- **It cannot quietly give up.** Every invocation ends by naming its outcome. Going silent after a question is a defect, not a neutral pause.
- **It cannot infer your preferences from the web.** Preferences, priorities, and risk calls are yours to state. Research is reserved for external facts, from primary sources, and only when the answer moves the plan.
- **It cannot execute.** One plan is handed off, then it stops. It does not approve, implement, or produce a second plan.
- **It tells you what it failed to resolve.** Every unresolved item is listed with impact, mitigation, reversibility, and owner — and you accept them explicitly. Casual assent does not count.

## Install

**Try it for one session.** Nothing is installed, nothing is enabled, and it lasts exactly one session:

```sh
git clone https://github.com/umyunsang/ThyQuery.git
claude --plugin-dir ThyQuery/plugins/claude-thyquery
```

**Keep it.** Start Claude Code, then run these inside the session:

```
/plugin marketplace add umyunsang/ThyQuery
/plugin install thyquery@thyquery
```

`/plugin` also opens the manager, where you can disable or remove it later. The persistent path is recorded but has **not** been exercised — [installation.md](docs/installation.md) explains what that gate is and why it is still closed.

## Use

Enter your agent's stock Plan mode first, then invoke:

```
/thyquery:thyquery Make the onboarding flow better
```

What follows is a loop. It reads its own contract, observes read-only, asks one question for one gap, commits your answer, then re-evaluates the whole guard ladder from a fresh snapshot — and keeps circling until a guard fires. Reading, observing, and re-evaluating are free; only committed progress spends the budget of twelve macrosteps.

[getting-started.md](docs/getting-started.md) walks a full first run.

## Hosts

ThyQuery is one specification with a package generated per host. The two packages share the protocol, the guarded graph, and the closure rule.

| Host | Invocation | Status |
|---|---|---|
| **Claude Code** | `/thyquery:thyquery <query>` | **Published** — v0.1.0, installable today |
| **Codex** | `$thyquery <query>` | In the tree as source. Publication planned; not yet loaded or run |

The Codex package is deliberately absent from the marketplace manifest rather than merely missing from it. Listing a package that has never been loaded would offer an install path for unverified behaviour, so it waits. [support-matrix.md](docs/support-matrix.md) carries the per-surface evidence.

## What it will not do

- **It never fires on its own.** The skill sets `disable-model-invocation: true`, so ordinary prompts are untouched. Install it, forget it, and nothing about your sessions changes.
- **It never switches modes for you.** Invoked outside Plan mode it returns `PLAN_MODE_REQUIRED` and does nothing else — no question, no research, no side effect. Enter Plan mode and invoke again; nothing is lost.
- **It never edits your code.** This was tested with the means to break it: conformance sessions ran with `Write` available under a contract forbidding edits, and the source tree digest was byte-identical afterwards.
- **It never executes the plan.** One native plan is observed, then `COMPLETE_AFTER_PLAN`. Reviewing and approving that plan stays yours.

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

**`EPISTEMIC_CLOSED` is unreachable in v1.** Full resolution requires a calibration this release does not ship — no calibration exists for any task, risk, or language stratum — so `ACCEPTED_RESIDUAL` is the only reachable success outcome. That is a fact about the release rather than a judgment made per run, and a run ending there has succeeded rather than fallen short.

## Status

**v0.1.0 — pre-release.**

Most projects tell you what works. Here is what does not, because you should know before you install:

- **Conformance: 7 of 9 cases pass** on `claude-opus-5`, in one interactive environment. Two cases were excluded as not honestly runnable on the available harness. A pass on one model is not a claim about the host in general.
- **Efficacy: unevaluated.** Conformance means the plugin does what it says. It does **not** mean the resulting plans are better than what you would have got without it. The A/B/C/D evaluation is preregistered and has not been run.
- **Codex: not published yet.** Source ships in the tree; it has never been loaded or run.
- **One rough edge:** dismissing a question with `Esc` produces no visible outcome. The invocation stays open and a nudge resumes it, but without one you get no sign it is alive.

Deterministic proof of what *is* claimed: `npm run check` exits 0 at 81/81, covering package self-containment, generated-source parity, and cross-host vocabulary parity. [CHANGELOG.md](CHANGELOG.md) states the verified and unverified in full.

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
