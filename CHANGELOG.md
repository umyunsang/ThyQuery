# Changelog

## v0.2.0 — 2026-08-04

### Breaking: the invocation is now `/thyquery:start`

It was `/thyquery:thyquery`. The namespace and the skill carried the same name, so the command repeated itself for no reason. Anyone running v0.1.0 has to use the new one; the old spelling stops resolving.

The skill directory moved from `skills/thyquery` to `skills/start`, because Claude Code builds the command from that directory name — the rename *is* the directory. The Codex package keeps `skills/thyquery` and `$thyquery`, since renaming it would silently change an invocation nobody has ever run.

Six tools and tests hardcoded the old directory. Package validation checks required files by exact path, so a missed one fails as "missing file" rather than "wrong directory"; the name now has a single source in `tools/package-layout.mjs`.

### Two artifacts were deliberately left alone

`docs/live-validation-runner.md` and `tests/fixtures/claude/live-manifest.json` still say `/thyquery:thyquery`. Both are bound by hash to approval receipts, and the tests that check those bindings are what caught the edits. A record of what was approved is not updated to match what is true later — that is the difference between a receipt and a claim. `.planning/` is untouched for the same reason.

### The README stopped borrowing from the project's own files

Its example was `Make the onboarding flow better`, which is the live-validation probe query — an internal test input presented as if it were something a user would type. The example is now a placeholder, and `tests/contracts/readme-register.test.mjs` fails the build if machine vocabulary, verbatim skill instructions, or that probe query appear in the README again. Removing each instance as it was noticed is what let the next one ship.

### Also

- Marketplace installation is the recommended path, and was executed against the published repository before being recommended: the host's own inventory reported one skill, no hooks, no MCP or LSP servers, at ~119 tokens always-on.
- The wordmark's Korean gloss is set in KoPubWorld Batang, converted to outlines so it renders without the font installed.

### Package digest

```
plugins/claude-thyquery  sha256:63dea8e0095120b92d16d3079a7b77d267b607b720dd16bf564dc6fd6bfc482b
```

## v0.1.0 — 2026-08-03

First release. The Claude Code package is published; the Codex package ships as source and is not installable yet.

### What this is

An instruction-only plugin that runs a bounded intent-resolution layer before the host's stock planner. You invoke it explicitly from an active Plan session; it asks one question per material gap, records what remains unresolved, and stops after one native plan without executing it.

It ships no runtime. The package is a skill and five reference documents — no hooks, no MCP servers, no LSP servers, no background process. The host itself reports that inventory.

### What is verified

Seven of nine Claude conformance cases pass on `claude-opus-5` in an interactive session:

| Case | Result |
|---|---|
| `A-G0-01` canonical invocation in verified Plan | Plan evidence confirmed; arc halted under `--print` |
| `A-G0-02` outside Plan fails closed | `G0_PASS` |
| `A-G0-03` native one-gap question | `G0_PASS` |
| `A-G0-04` trusted cancel | `G0_PASS` |
| `A-G1-02` one contract to one plan | `G1_PASS` |
| `A-G1-04` clear-query no-harm | `G1_PASS` |
| `A-G1-05` instruction-first lineage | `G1_PASS` |
| `A-G1-01`, `A-G1-03` | Excluded — not honestly runnable on the available harness |

The no-edit guarantee was tested with the means to break it: both G1 sessions ran with `Write` available under a contract forbidding edits, and the source tree digest was byte-identical afterwards. In earlier runs "it did not edit anything" described the harness; here it describes the plugin.

Deterministic proof: `npm run check` exits 0 at 81/81 tests, with package self-containment, generated-source parity, and cross-host skill-vocabulary parity all passing.

### What is not verified

**Efficacy is unevaluated.** Passing conformance means the plugin does what it says. It does not mean the plans are better than you would have got without it. The A/B/C/D evaluation is designed and preregistered, and has not been run — its thresholds are `UNSET_PENDING_PILOT`.

Conformance is bound to `claude-opus-5` in one environment. A pass on one model is not a claim about the host in general.

**`EPISTEMIC_CLOSED` is unreachable in v1.** Full resolution requires a calibration this release does not ship, so `ACCEPTED_RESIDUAL` — a residual ledger you explicitly accept — is the only reachable success outcome. That is the honest shape of "resolved enough to plan", and it is stated in the instructions so the model cannot infer otherwise.

**The Codex package is not published yet.** It ships in the tree as source and is deliberately absent from the marketplace manifest. It has never been loaded or run. Publication is planned and waits on a Codex release exposing a session-only loader, so the package can be conformance-tested before anyone is offered an install path.

### Known behaviour worth knowing

Dismissing a question with `Esc` produces no visible outcome. The invocation stays open and a nudge resumes it correctly, but without one you get no sign it is alive. This is a host-interaction property rather than a contract violation, and no instruction change is the right lever for it.

### Provenance

`.planning/` contains the full development record: research artifacts with source-tagged evidence, design and implementation proposals, hash-bound approval receipts, and every live-run result including the failures. Machine-local absolute paths appear there because the receipts are hash-bound and cannot be edited without breaking the bindings they exist to provide.

### Package digest

```
plugins/claude-thyquery  sha256:b1883658b15f17fc8548bc105593f3ce5edaa8897002dffdf45995c747d76125
```
