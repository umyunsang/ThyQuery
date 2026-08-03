# Codex Adapter Snapshot — 0.146.0

- Canonical invocation: `$thyquery <query>`.
- Entry requirement: verified stock Plan before any refinement action.
- Native question surface: `request_user_input`. Its existence is established, not assumed — the official stock Plan template names it and directs its use when user input is needed during intent and decision work (`R1_codex_plan.md`). What is untested is whether this skill drives it to the action policy's standard.
- The surface is mode-gated, and that gate is established rather than inferred: a live probe in Default mode returned `request_user_input is unavailable in Default mode` (`R1-C09`, tagged `directly_supported`). A mode-gated rejection proves the capability exists and is withheld outside Plan; it is not evidence of absence. Preflight must therefore test effective callability in the actual session rather than schema presence.
- Missing Plan or unavailable Plan receipt: `PLAN_MODE_REQUIRED`; no fallback question or research.
- Current static validation boundary: package schema/skill validation only. The inspected Codex CLI exposes marketplace-oriented plugin commands but no direct local `plugin validate` command.
- Runtime helper: none. `src/reference/` is development-only.
- Live invocation, Plan receipt, native question, native plan, and no-execution behavior: `CONFORMANCE_UNTESTED`.

## CLI capability evidence (read-only inspection, 2026-08-03)

Eight fixed `--version` and `--help` vectors were executed; all exited 0. Raw output was discarded and only SHA-256 digests were retained, so the evidence below is about the shape of the exposed surface, not its wording.

- The plugin surface is marketplace-oriented: `plugin add`, `plugin marketplace`, and `plugin marketplace add` exist. No session-only local-plugin loader equivalent to Claude's `--plugin-dir` was observed, and no direct local `plugin validate` command exists.
- `app-server` and `app-server generate-json-schema` exist but were not started and no schema was generated.
- A prior live probe of the structured-choice surface returned `request_user_input is unavailable in Default mode`, which is consistent with the Plan-first entry requirement but does not prove availability inside a verified Plan session.

## Why the Codex cell stays unresolved

Isolation is `ISOLATION_METHOD_UNRESOLVED` because no demonstrated method loads a local candidate package without touching real marketplace, configuration, or cache state. Resolving it would require identifying exact disposable targets, proving protected-home non-mutation, and proving recoverability — none of which the help surface establishes. Exit-zero help vectors prove the commands exist; they prove nothing about mutation.

Conformance, once tested, is bound to the model it was tested against. A pass on one model is not a claim about the host in general.
