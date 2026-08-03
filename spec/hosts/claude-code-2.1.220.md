# Claude Code Adapter Snapshot — 2.1.220

## Product surface

- Canonical invocation: `/thyquery:thyquery <query>`; the plugin manifest namespace is `thyquery` and the skill name is `thyquery`.
- Entry requirement: verified stock Plan before any refinement action. The skill does not call `EnterPlanMode` and does not compose with `/plan`.
- Native question surface: `AskUserQuestion`, with adaptive choices plus correction/defer/cancel paths. The tool's existence and interactive behavior are established by direct use, not assumed; what remains untested is its availability under `--print` and whether this skill drives it correctly.
- Native Plan presentation and observation must use documented stock Plan behavior; no plugin-authored substitute plan is accepted.
- Static package validation uses `claude plugin validate --strict <path>` without installation or loading.
- Runtime helper: none. `src/reference/` is development-only.
- Live invocation, Plan receipt, native question, native plan, and no-execution behavior: `CONFORMANCE_UNTESTED`.

## What "untested" does and does not mean for the question surface

Three separate claims are easy to collapse into one, and collapsing them overstates the project's ignorance:

1. **The tool exists and works interactively — established.** `AskUserQuestion` has been invoked directly and answered during this project's own sessions. Its absence from the `--tools` help string is not evidence of anything: that string documents the flag's syntax and gives `"Bash,Edit,Read"` only as an example, and does not enumerate the built-in set.
2. **Availability under `--print` with `--input-format stream-json` — untested.** A non-interactive print-mode session is a different context from an interactive one, and whether a question can be asked and an answer returned there, in what correlation shape, is not established by the CLI's help output.
3. **Whether this skill drives the tool correctly — untested, and this is the actual conformance question.** One question per material gap, a stated reason the answer can change the plan, preserved correction/direct-input/unsure/defer/cancel paths, no coercion of a preference, no treatment of silence or fatigue as acceptance, and `HOST_CAPABILITY_CONTRADICTION` rather than a fabricated substitute when the surface is unavailable.

Only the second and third are open. Case `A-G0-03` exists to close them.

## CLI capability evidence (read-only inspection, 2026-08-03)

Established by reading `--version` and `--help` only. No plugin was loaded and no model was called.

- The executable was pinned and digested before each live run, resolved from the `claude` symlink to a versioned binary under the user's local share directory. The exact path and SHA-256 are machine-local facts recorded in the run receipts under `.planning/`, not distribution claims — a different installation will have a different digest, and pinning is a per-run discipline rather than a property of this release.
- `--permission-mode` accepts `plan`, so Plan confinement is expressible on the command line.
- `--plugin-dir` loads a plugin "for this session only" and is repeatable. `--bare` names it as one of its explicit context paths and states that skills still resolve, so session-only loading of an instruction-first skill package is supported rather than merely hoped for.
- `--no-session-persistence` prevents session files; it and `--max-budget-usd` apply only with `--print`.
- `--bare` skips hooks, LSP, plugin sync, attribution, auto-memory, background prefetches, keychain reads, and CLAUDE.md auto-discovery, which is what makes a non-persistent isolated run tractable at all.

## Constraints that bound any future conformance run

- **`--bare` never reads OAuth or the keychain.** Its authentication is strictly `ANTHROPIC_API_KEY` or an `apiKeyHelper` supplied through `--settings`. A Claude Code subscription login therefore cannot authenticate an isolated `--bare` run, which bills Anthropic API credits instead. Isolation and subscription billing cannot both be satisfied on this CLI surface; that trade belongs to the user, not to this project.
- `--safe-mode` disables plugins outright and cannot validate ThyQuery.
- `--disable-slash-commands` disables all skills and cannot be used either.
- `--resume`, `--continue`, and `--fork-session` exist and would defeat the mandatory `--no-session-persistence`; the runner profile rejects them by value.
- Not establishable without a live run: the stream-json record shapes; whether print-mode `AskUserQuestion` can ask and receive an answer, and in what correlation shape; which record authoritatively marks an observed stock Plan artifact; and the reporting granularity of `--max-budget-usd`.

Conformance, once tested, is bound to the model it was tested against. A pass on one model is not a claim about the host in general.
