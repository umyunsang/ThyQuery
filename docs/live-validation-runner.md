# Live-validation runner preparation

Status: `DRY_VALIDATION_ONLY(LVP@v3-A)`. This tooling cannot load either plugin, invoke a model, run a G0/G1 case, or execute a plan.

The repository-level runner exists to remove ambiguity from a later live proposal. It validates recorded categorical fixtures, renders a future Claude argv vector as data, and can run a fixed Codex help/version feasibility probe. It is not bundled inside either plugin.

## Command surface

```sh
node tools/live-validation-runner.mjs doctor --json
node tools/live-validation-runner.mjs dry-run --json
node tools/live-validation-runner.mjs propose --case A-G0-01 --json
node tools/live-validation-runner.mjs probe-codex --json
```

| Command | May start an external process? | Meaning |
|---|---:|---|
| `doctor` | No | Validate the frozen profile and all four recorded Claude G0 projections; emit only hashes and categorical status. |
| `dry-run` | No | Parse and evaluate those projections; return minimum-disclosure dry receipts. |
| `propose` | No | Render the blocked future Claude command as an executable token plus argv array. It never joins or evaluates a shell string. |
| `probe-codex` | Yes, fixed read-only commands only | Run the eight exact Codex `--version`/`--help` vectors below; retain exit codes and stdout/stderr hashes, not raw output. |

Every other verb, including `run`, `live`, `execute`, `invoke`, and `load-plugin`, returns `COMMAND_NOT_ALLOWED` with exit status 2. There is no hidden execution API.

The canonical machine-readable contract is [runner-profile.v1.json](../tests/live-validation/runner-profile.v1.json). Its authorization booleans are all false and validated at load time. `doctor`, `dry-run`, and `propose` are tested with an empty `PATH`, demonstrating that those commands do not need or discover a host executable.

## Claude proposal frozen as data

The profile pins Claude Code `2.1.220`, the four G0 IDs, serial execution, the current package digest, and these ceilings:

| Ceiling | Frozen value |
|---|---:|
| Completed top-level assistant messages | 12 per case |
| Cost | USD 0.50 per case; USD 2.00 suite |
| Wall clock | 180 seconds per case; 900 seconds suite |
| Available/allowed tools | `Read`, `AskUserQuestion` only |

The rendered argv uses `--bare`, print-mode stream JSON, replayed user messages, Plan permission mode, session-only `--plugin-dir`, no session persistence, an explicit model placeholder, a cost ceiling, explicit empty settings, strict empty MCP configuration, no Chrome, the two-tool allowlist, and a case UUID. The executable and model remain placeholders. The environment map is deliberately empty; the runner does not repurpose `HOME`, `PATH`, or XDG variables. Profile validation enforces this rather than merely asserting it: a required-environment entry naming a process-identity or host-credential variable, and any nonempty environment map at all, are rejected as `INERT_PROFILE_REQUIRED`. Session-persistence bypasses (`--resume`, `--continue`, `--fork-session`) are rejected on the same basis, because they would defeat the mandatory `--no-session-persistence` flag.

The argv is validated as a frozen whole, not flag by flag. An earlier membership-only check accepted `--permission-mode acceptEdits` whenever a stray `plan` token appeared elsewhere in the array, and accepted `--tools Read,AskUserQuestion,Bash`; Plan confinement and the two-tool allowlist were asserted but not enforced. Validation now compares the argv exactly, rejects a repeated flag instead of guessing which occurrence the host would honour, requires `--plugin-dir`, `--model`, and `--session-id` to stay unresolved placeholders, requires `--settings`, `--mcp-config`, and `cwd` to stay rooted in the disposable case root, and cross-checks `--max-budget-usd`, `--tools`, and `--allowedTools` against the frozen budget and tool objects so the two cannot drift apart. A future caller would have to supply the named `ANTHROPIC_API_KEY` channel without exposing its value.

The command remains `LIVE_RUN_PROPOSAL_BLOCKED` and `HOST_UNSUPPORTED_IN_CURRENT_APPROVAL_EPOCH` because local help does not establish:

- the NDJSON input/output schemas;
- `AskUserQuestion` request/response correlation;
- an authoritative native-plan observation signal;
- enforcement/accounting of the cost cap;
- a pinned executable path/digest and model;
- isolation from non-session config/cache and managed policy;
- safe credential provision in this proposed surface.

`--safe-mode` cannot be substituted because it disables plugins. `--disable-slash-commands` cannot be used because it removes `/thyquery:thyquery`.

## Recorded G0 projections

The four files under `tests/fixtures/live/claude/` use `thyquery.synthetic-claude-stream.v1`. This is a project-owned categorical projection, not a claim about Claude's undocumented stream schema.

- `A-G0-01`: invocation observed; Plan receipt precedes the first Ralph action.
- `A-G0-02`: outside Plan produces `PLAN_MODE_REQUIRED` with zero questions, research, handoffs, or plans.
- `A-G0-03`: exactly one native-question marker exposes correction, defer, and cancel option codes.
- `A-G0-04`: cancellation is followed only by the categorical result record, with zero handoffs or plans.

Unknown record types, duplicate assistant message IDs, extra/raw fields, incorrect event order, malformed question options, missing/follow-on terminal records, and turn-cap excess all fail as `TRACE_INVALID`. A dry PASS means only that this parser contract is deterministic. It is never copied into either not-run live manifest as host evidence.

Dry receipts allow only schema/case/verdict, trace digest, assistant-turn count, categorical counters, and false live/model flags. Query text, answers, source text, paths, credentials, and raw stdout/stderr are discarded by construction.

Projection also validates before it emits, so a drifting result cannot smuggle text through a retained field. A `schema_version` other than the frozen `thyquery.synthetic-result.v1`, a counter that is not a nonnegative integer, and any counter key outside the four categorical fields are rejected as `TRACE_INVALID`. The emitted schema value is the frozen constant, never the caller's string.

CLI argument errors follow the same rule. A rejected or unknown argument is never echoed into stdout, because a mistyped query or path would otherwise be preserved in the failure envelope; the runner reports the accepted argument shape instead and exits `RUNNER_VALIDATION_FAILED`.

Every failure envelope passes through `sanitizeFailureMessage`. Only self-authored diagnostics — those prefixed `INERT_PROFILE_REQUIRED:`, `TRACE_INVALID:`, or `RUNNER_ARGUMENT_REJECTED:` — are published, and even those are withheld if they contain a path separator, so the prefix cannot become a smuggling channel. Anything else, including a filesystem error that would otherwise publish an absolute path, is replaced with a constant. Validator diagnostics are themselves constant strings: case ids, record fields, message ids, and receipt-policy field names are described rather than quoted.

## Codex feasibility probe

Only these argv vectors are callable:

```text
codex --version
codex --help
codex plugin --help
codex plugin add --help
codex plugin marketplace --help
codex plugin marketplace add --help
codex app-server --help
codex app-server generate-json-schema --help
```

Actual plugin or marketplace add, app-server startup, schema generation with `--out`, model invocation, and configuration/cache mutation are rejected. Current Codex 0.146.0 has no demonstrated session-only local-plugin loader; its result is `ISOLATION_METHOD_UNRESOLVED` and `HOST_UNSUPPORTED_IN_CURRENT_APPROVAL_EPOCH`.

The protected-target lists and cleanup sequence in the profile are future proof obligations only. No claim of cache/config non-mutation is made from the profile itself. `.remember/` is outside every runner/probe surface and may never be read, hashed, changed, or included.

## Current disposition

Both hosts remain `CONFORMANCE_UNTESTED`. No live-run approval is requested by this artifact: Claude lacks an evidenced stream/receipt/isolation contract, and Codex lacks a safe local loader. Any later plugin load or model call needs a new fingerprinted proposal and fresh exact approval.
