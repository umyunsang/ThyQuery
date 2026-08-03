import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";

const PROFILE_SCHEMA = "thyquery.runner-profile.v1";
const SYNTHETIC_STREAM_SCHEMA = "thyquery.synthetic-claude-stream.v1";
const SYNTHETIC_RESULT_SCHEMA = "thyquery.synthetic-result.v1";
const COMMAND_SURFACE = Object.freeze([
  "doctor",
  "dry-run",
  "propose",
  "probe-codex",
]);
const CLAUDE_G0_CASE_IDS = Object.freeze([
  "A-G0-01",
  "A-G0-02",
  "A-G0-03",
  "A-G0-04",
]);
const AUTHORITY_FIELDS = Object.freeze([
  "execution_authorized",
  "plugin_load_authorized",
  "model_invocation_authorized",
  "config_mutation_authorized",
  "plan_execution_authorized",
]);
const EXECUTION_SHAPED_COMMANDS = new Set([
  "execute",
  "live",
  "run",
  "invoke",
  "load",
  "load-plugin",
  "install",
  "enable",
]);
const FORBIDDEN_CLAUDE_ARGV = new Set([
  "-c",
  "--command",
  "--dangerously-skip-permissions",
  "--continue",
  "--resume",
  "--fork-session",
]);
const FORBIDDEN_ENVIRONMENT_KEYS = new Set([
  "HOME",
  "PATH",
  "SHELL",
  "USER",
  "LOGNAME",
  "TMPDIR",
  "TMP",
  "TEMP",
]);
const FORBIDDEN_ENVIRONMENT_PREFIXES = Object.freeze([
  "XDG_",
  "ANTHROPIC_",
  "CLAUDE_",
]);
const COUNTER_FIELDS = Object.freeze([
  "questions",
  "research",
  "handoffs",
  "plans",
]);
// The proposed command is frozen as a whole. Validating flags by membership
// let a stray allowed token satisfy a flag whose actual value had been
// weakened, so the argv is compared exactly and then cross-checked against the
// budget and tool objects that the disposition claims to freeze.
const FROZEN_CLAUDE_ARGV = Object.freeze([
  "--bare",
  "--print",
  "--input-format",
  "stream-json",
  "--output-format",
  "stream-json",
  "--replay-user-messages",
  "--prompt-suggestions",
  "false",
  "--permission-mode",
  "plan",
  "--plugin-dir",
  "<CLAUDE_PLUGIN_DIR>",
  "--no-session-persistence",
  "--model",
  "<PINNED_MODEL>",
  "--max-budget-usd",
  "0.50",
  "--setting-sources",
  "local",
  "--settings",
  "<CASE_ROOT>/work/settings.json",
  "--mcp-config",
  "<CASE_ROOT>/work/mcp.json",
  "--strict-mcp-config",
  "--no-chrome",
  "--tools",
  "Read,AskUserQuestion",
  "--allowedTools",
  "Read,AskUserQuestion",
  "--session-id",
  "<CASE_UUID>",
]);
const FROZEN_CLAUDE_CWD = "<CASE_ROOT>/work";
const PLACEHOLDER_ONLY_FLAGS = Object.freeze([
  "--plugin-dir",
  "--model",
  "--session-id",
]);
const CASE_ROOTED_FLAGS = Object.freeze(["--settings", "--mcp-config"]);
const PLACEHOLDER_PATTERN = /^<[A-Z0-9_]+>$/u;
const SAFE_MESSAGE_PREFIXES = Object.freeze([
  "INERT_PROFILE_REQUIRED:",
  "TRACE_INVALID:",
  "RUNNER_ARGUMENT_REJECTED:",
]);
const WITHHELD_MESSAGE =
  "the runner rejected this invocation; details are withheld because they may contain paths or user text";

export const CODEX_PROBE_ALLOWLIST = Object.freeze([
  Object.freeze(["codex", "--version"]),
  Object.freeze(["codex", "--help"]),
  Object.freeze(["codex", "plugin", "--help"]),
  Object.freeze(["codex", "plugin", "add", "--help"]),
  Object.freeze(["codex", "plugin", "marketplace", "--help"]),
  Object.freeze(["codex", "plugin", "marketplace", "add", "--help"]),
  Object.freeze(["codex", "app-server", "--help"]),
  Object.freeze(["codex", "app-server", "generate-json-schema", "--help"]),
]);

const EXPECTED_EVENTS = Object.freeze({
  "A-G0-01": Object.freeze([
    "SESSION_INIT",
    "INVOCATION_OBSERVED",
    "PLAN_RECEIPT",
    "RALPH_ACTION",
    "G0_PASS",
  ]),
  "A-G0-02": Object.freeze([
    "SESSION_INIT",
    "INVOCATION_OBSERVED",
    "PLAN_MODE_REQUIRED",
    "G0_PASS",
  ]),
  "A-G0-03": Object.freeze([
    "SESSION_INIT",
    "INVOCATION_OBSERVED",
    "PLAN_RECEIPT",
    "ASK_USER_QUESTION",
    "G0_PASS",
  ]),
  "A-G0-04": Object.freeze([
    "SESSION_INIT",
    "INVOCATION_OBSERVED",
    "PLAN_RECEIPT",
    "CANCELLED",
    "G0_PASS",
  ]),
});

const ALLOWED_RECORD_KEYS = new Set([
  "schema_version",
  "case_id",
  "type",
  "message_id",
  "event",
  "details",
]);

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function sameJson(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function inertProfileError(reason) {
  return new Error(`INERT_PROFILE_REQUIRED: ${reason}`);
}

function traceInvalid(reason) {
  return new Error(`TRACE_INVALID: ${reason}`);
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function requirePlainObject(value, label) {
  if (!isPlainObject(value)) throw inertProfileError(`${label} must be an object`);
}

function requireExactArray(actual, expected, label) {
  if (!sameJson(actual, expected)) {
    throw inertProfileError(`${label} does not match the frozen contract`);
  }
}

function requirePositiveFinite(value, label) {
  if (!Number.isFinite(value) || value <= 0) {
    throw inertProfileError(`${label} must be a positive finite number`);
  }
}

// Reads the single value carried by a flag. A repeated flag is rejected rather
// than resolved, because a duplicate is how a weaker value would ride along
// behind an accepted one.
function argvFlagValue(argv, flag) {
  const positions = [];
  for (const [index, token] of argv.entries()) {
    if (token === flag) positions.push(index);
  }
  if (positions.length !== 1) {
    throw inertProfileError("a mandatory Claude flag is missing or repeated");
  }
  const value = argv[positions[0] + 1];
  if (typeof value !== "string" || value.startsWith("--")) {
    throw inertProfileError("a mandatory Claude flag does not carry an explicit value");
  }
  return value;
}

// Self-authored diagnostics are constant strings and may be published. Anything
// else, including a filesystem error, is replaced: its message may embed an
// absolute path or user text that the receipt policy discards by construction.
export function sanitizeFailureMessage(error) {
  const message = String(error?.message ?? "");
  if (!SAFE_MESSAGE_PREFIXES.some((prefix) => message.startsWith(prefix))) {
    return WITHHELD_MESSAGE;
  }
  if (/[/\\]/u.test(message)) return WITHHELD_MESSAGE;
  return message;
}

export function validateRunnerProfile(profile) {
  requirePlainObject(profile, "profile");
  if (profile.schema_version !== PROFILE_SCHEMA) {
    throw inertProfileError("unexpected schema version");
  }
  if (profile.status !== "DRY_VALIDATION_ONLY") {
    throw inertProfileError("status must remain DRY_VALIDATION_ONLY");
  }

  requirePlainObject(profile.authorization, "authorization");
  if (profile.authorization.epoch !== "LVP@v3-A") {
    throw inertProfileError("authorization epoch mismatch");
  }
  for (const field of AUTHORITY_FIELDS) {
    if (profile.authorization[field] !== false) {
      throw inertProfileError(`${field} must be false`);
    }
  }

  requireExactArray(profile.command_surface, COMMAND_SURFACE, "command surface");
  if (
    profile.command_surface.some((command) =>
      EXECUTION_SHAPED_COMMANDS.has(String(command).toLowerCase()),
    )
  ) {
    throw inertProfileError("execution-shaped command exposed");
  }

  requirePlainObject(profile.claude, "claude");
  if (profile.claude.required_version !== "2.1.220") {
    throw inertProfileError("Claude version must remain pinned to 2.1.220");
  }
  if (profile.claude.status !== "LIVE_RUN_PROPOSAL_BLOCKED") {
    throw inertProfileError("Claude status must remain blocked");
  }
  if (profile.claude.host_disposition !== "HOST_UNSUPPORTED_IN_CURRENT_APPROVAL_EPOCH") {
    throw inertProfileError("Claude host disposition must remain unsupported in this epoch");
  }
  requireExactArray(profile.claude.g0_case_ids, CLAUDE_G0_CASE_IDS, "Claude G0 cases");
  if (profile.claude.execution_order !== "serial") {
    throw inertProfileError("Claude cases must be serial");
  }
  requirePlainObject(profile.claude.command, "Claude command");
  if (profile.claude.command.executable !== "<CLAUDE_BIN>") {
    throw inertProfileError("Claude executable must remain an unresolved placeholder");
  }
  if (profile.claude.command.shell !== false) {
    throw inertProfileError("Claude proposal must be shell-free argv data");
  }
  if (!Array.isArray(profile.claude.command.argv) || profile.claude.command.argv.length === 0) {
    throw inertProfileError("Claude argv must be finite and nonempty");
  }
  if (profile.claude.command.argv.some((token) => FORBIDDEN_CLAUDE_ARGV.has(token))) {
    throw inertProfileError(
      "Claude argv contains a forbidden execution or session-persistence bypass",
    );
  }
  const argv = profile.claude.command.argv;
  requireExactArray(argv, FROZEN_CLAUDE_ARGV, "Claude argv");
  for (const flag of ["--print", "--no-session-persistence", "--strict-mcp-config"]) {
    if (!argv.includes(flag)) {
      throw inertProfileError("Claude proposal is missing a mandatory safety flag");
    }
  }
  if (argvFlagValue(argv, "--permission-mode") !== "plan") {
    throw inertProfileError("Claude proposal must confine the host to Plan mode");
  }
  for (const flag of ["--input-format", "--output-format"]) {
    if (argvFlagValue(argv, flag) !== "stream-json") {
      throw inertProfileError("Claude proposal must keep stream-json framing on both channels");
    }
  }
  for (const flag of PLACEHOLDER_ONLY_FLAGS) {
    if (!PLACEHOLDER_PATTERN.test(argvFlagValue(argv, flag))) {
      throw inertProfileError(
        "a host-resolvable value replaced a frozen placeholder in the Claude argv",
      );
    }
  }
  for (const flag of CASE_ROOTED_FLAGS) {
    if (!argvFlagValue(argv, flag).startsWith("<CASE_ROOT>/")) {
      throw inertProfileError("Claude argv paths must stay rooted in the disposable case root");
    }
  }
  if (profile.claude.command.cwd !== FROZEN_CLAUDE_CWD) {
    throw inertProfileError("Claude working directory must stay rooted in the disposable case root");
  }
  requirePlainObject(
    profile.claude.command.required_environment,
    "Claude required environment",
  );
  for (const key of Object.keys(profile.claude.command.required_environment)) {
    const normalized = key.toUpperCase();
    if (
      FORBIDDEN_ENVIRONMENT_KEYS.has(normalized) ||
      FORBIDDEN_ENVIRONMENT_PREFIXES.some((prefix) => normalized.startsWith(prefix))
    ) {
      throw inertProfileError(
        "Claude proposal must not redefine a process-identity or host-credential variable",
      );
    }
  }
  if (Object.keys(profile.claude.command.required_environment).length > 0) {
    throw inertProfileError(
      "Claude required environment must stay empty in this approval epoch",
    );
  }
  requireExactArray(
    profile.claude.command.required_secret_env_names,
    ["ANTHROPIC_API_KEY"],
    "Claude secret environment names",
  );
  requireExactArray(
    profile.claude.tools?.available,
    ["Read", "AskUserQuestion"],
    "Claude available tools",
  );
  requireExactArray(
    profile.claude.tools?.allowed_without_prompt,
    ["Read", "AskUserQuestion"],
    "Claude allowed tools",
  );
  if (profile.claude.tools?.unexpected_tool_use !== "TERMINATE_CASE") {
    throw inertProfileError("unexpected Claude tool use must terminate the case");
  }

  requirePlainObject(profile.claude.budgets, "Claude budgets");
  for (const [field, value] of Object.entries(profile.claude.budgets)) {
    requirePositiveFinite(value, `Claude budget ${field}`);
  }
  if (
    profile.claude.budgets.assistant_turns_per_case !== 12 ||
    profile.claude.budgets.usd_per_case !== 0.5 ||
    profile.claude.budgets.usd_suite !== 2 ||
    profile.claude.budgets.wall_clock_ms_per_case !== 180_000 ||
    profile.claude.budgets.wall_clock_ms_suite !== 900_000
  ) {
    throw inertProfileError("Claude budgets differ from the frozen ceilings");
  }
  // The argv is what a future caller would actually hand to the host, so the
  // ceilings the disposition freezes are only real if the argv agrees with
  // them. Editing one without the other is the drift this catches.
  if (Number(argvFlagValue(argv, "--max-budget-usd")) !== profile.claude.budgets.usd_per_case) {
    throw inertProfileError("Claude argv cost ceiling disagrees with the frozen budget object");
  }
  for (const [flag, declared] of [
    ["--tools", profile.claude.tools.available],
    ["--allowedTools", profile.claude.tools.allowed_without_prompt],
  ]) {
    if (argvFlagValue(argv, flag) !== declared.join(",")) {
      throw inertProfileError("Claude argv tool allowlist disagrees with the frozen tool object");
    }
  }
  if (!Array.isArray(profile.claude.blockers) || profile.claude.blockers.length === 0) {
    throw inertProfileError("Claude blockers must remain explicit");
  }
  if (
    profile.claude.protected_targets?.never_access?.includes(
      "<PROJECT_ROOT>/.remember/",
    ) !== true
  ) {
    throw inertProfileError(".remember must remain outside the runner surface");
  }

  requirePlainObject(profile.codex, "codex");
  if (profile.codex.required_version !== "0.146.0") {
    throw inertProfileError("Codex version must remain pinned to 0.146.0");
  }
  if (profile.codex.status !== "ISOLATION_METHOD_UNRESOLVED") {
    throw inertProfileError("Codex isolation must remain unresolved");
  }
  if (profile.codex.host_disposition !== "HOST_UNSUPPORTED_IN_CURRENT_APPROVAL_EPOCH") {
    throw inertProfileError("Codex host disposition must remain unsupported in this epoch");
  }
  if (profile.codex.loader_argv !== null) {
    throw inertProfileError("Codex loader argv must remain null");
  }
  requireExactArray(
    profile.codex.probe_allowlist,
    CODEX_PROBE_ALLOWLIST,
    "Codex probe allowlist",
  );
  if (
    profile.codex.protected_targets?.never_access?.includes(
      "<PROJECT_ROOT>/.remember/",
    ) !== true
  ) {
    throw inertProfileError(".remember must remain outside the Codex probe surface");
  }

  requirePlainObject(profile.receipt_policy, "receipt policy");
  const allowedFields = new Set(profile.receipt_policy.allowlisted_fields ?? []);
  for (const field of profile.receipt_policy.forbidden_raw_fields ?? []) {
    if (allowedFields.has(field)) {
      throw inertProfileError("a forbidden raw field appears in the receipt allowlist");
    }
  }
  return profile;
}

export function renderClaudeProposal(profile, caseId, { run_id, case_uuid } = {}) {
  validateRunnerProfile(profile);
  if (!CLAUDE_G0_CASE_IDS.includes(caseId)) {
    throw inertProfileError("case id is not one of the frozen Claude G0 cases");
  }
  if (typeof run_id !== "string" || !/^[a-z0-9][a-z0-9-]{0,63}$/u.test(run_id)) {
    throw inertProfileError("run_id must be a bounded lowercase synthetic identifier");
  }
  if (
    typeof case_uuid !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu.test(
      case_uuid,
    )
  ) {
    throw inertProfileError("case_uuid must be a UUID");
  }

  const argv = profile.claude.command.argv.map((token) =>
    token === "<CASE_UUID>" ? case_uuid : token,
  );
  return {
    schema_version: "thyquery.claude-command-proposal.v1",
    authorization_epoch: profile.authorization.epoch,
    case_id: caseId,
    run_id,
    status: profile.claude.status,
    host_disposition: profile.claude.host_disposition,
    executable: profile.claude.command.executable,
    argv,
    shell: false,
    cwd: profile.claude.command.cwd,
    environment: { ...profile.claude.command.required_environment },
    secret_env_names: [...profile.claude.command.required_secret_env_names],
    limits: { ...profile.claude.budgets },
    temp: structuredClone(profile.claude.temp),
    cleanup: [...profile.claude.cleanup],
    protected_targets: structuredClone(profile.claude.protected_targets),
    blockers: [...profile.claude.blockers],
    inertness: {
      host_spawned: false,
      plugin_loaded: false,
      model_invoked: false,
      command_executed: false,
      plan_executed: false,
    },
    conformance_status: "CONFORMANCE_UNTESTED",
  };
}

export function isAllowedCodexProbe(argv) {
  if (!Array.isArray(argv) || argv.some((token) => typeof token !== "string")) {
    return false;
  }
  return CODEX_PROBE_ALLOWLIST.some((allowed) => sameJson(argv, allowed));
}

function defaultProbeExecutor(argv, timeoutMs) {
  const child = spawnSync(argv[0], argv.slice(1), {
    encoding: "utf8",
    env: { PATH: process.env.PATH ?? "/usr/bin:/bin" },
    shell: false,
    timeout: timeoutMs,
    windowsHide: true,
  });
  return {
    exit_code: child.status ?? 1,
    signal: child.signal ?? null,
    stdout: child.stdout ?? "",
    stderr: child.stderr ?? String(child.error?.message ?? ""),
  };
}

export function runCodexReadOnlyProbe(
  profile,
  { executor = defaultProbeExecutor, timeout_ms = 10_000 } = {},
) {
  validateRunnerProfile(profile);
  requirePositiveFinite(timeout_ms, "Codex probe timeout");
  const commands = [];
  for (const argv of CODEX_PROBE_ALLOWLIST) {
    if (!isAllowedCodexProbe(argv)) {
      throw inertProfileError("internal Codex allowlist mismatch");
    }
    const result = executor([...argv], timeout_ms);
    requirePlainObject(result, "Codex probe executor result");
    const stdout = String(result.stdout ?? "");
    const stderr = String(result.stderr ?? "");
    commands.push({
      argv: [...argv],
      exit_code: Number.isInteger(result.exit_code) ? result.exit_code : 1,
      signal: result.signal ?? null,
      stdout_sha256: sha256(stdout),
      stderr_sha256: sha256(stderr),
    });
  }
  return {
    schema_version: "codex-isolation-feasibility/v1",
    host: "codex",
    required_cli_version: profile.codex.required_version,
    probe_scope: profile.codex.probe_scope,
    commands,
    all_exit_zero: commands.every((command) => command.exit_code === 0),
    loader_status: profile.codex.status,
    host_disposition: profile.codex.host_disposition,
    loader_argv: null,
    no_config_cache_mutation_path: profile.codex.no_config_cache_mutation_path,
    evidence_codes: [...profile.codex.evidence_codes],
    protected_target_check: "PROFILE_ONLY_NOT_A_RUNTIME_ISOLATION_PROOF",
    inertness: {
      plugin_load_attempted: false,
      model_invoked: false,
      app_server_started: false,
      schema_generated: false,
      write_capable_command_executed: false,
    },
    conformance_status: "CONFORMANCE_UNTESTED",
  };
}

function validateFixtureRecord(record, caseId, index, messageIds) {
  if (!isPlainObject(record)) throw traceInvalid(`record ${index} must be an object`);
  for (const key of Object.keys(record)) {
    if (!ALLOWED_RECORD_KEYS.has(key)) {
      throw traceInvalid(`record ${index} contains a forbidden field`);
    }
  }
  if (record.schema_version !== SYNTHETIC_STREAM_SCHEMA) {
    throw traceInvalid(`record ${index} schema mismatch`);
  }
  if (record.case_id !== caseId) throw traceInvalid(`record ${index} case mismatch`);
  if (!new Set(["system", "assistant", "result"]).has(record.type)) {
    throw traceInvalid(`record ${index} has unknown type`);
  }
  if (record.type === "assistant") {
    if (typeof record.message_id !== "string" || record.message_id.length === 0) {
      throw traceInvalid(`assistant record ${index} lacks message_id`);
    }
    if (messageIds.has(record.message_id)) {
      throw traceInvalid(`record ${index} duplicates an assistant message id`);
    }
    messageIds.add(record.message_id);
  } else if ("message_id" in record) {
    throw traceInvalid(`non-assistant record ${index} has message_id`);
  }
  if (record.event === "ASK_USER_QUESTION") {
    if (
      !sameJson(record.details, {
        option_codes: ["CORRECT", "DEFER", "CANCEL"],
      })
    ) {
      throw traceInvalid("question options must preserve correction/defer/cancel paths");
    }
  } else if ("details" in record) {
    throw traceInvalid(`record ${index} has unexpected details`);
  }
}

export function evaluateClaudeFixture(profile, caseId, records) {
  validateRunnerProfile(profile);
  if (!CLAUDE_G0_CASE_IDS.includes(caseId)) {
    throw traceInvalid("case id is not one of the frozen Claude G0 cases");
  }
  if (!Array.isArray(records) || records.length === 0) {
    throw traceInvalid("fixture must contain records");
  }

  const messageIds = new Set();
  let resultSeen = false;
  for (const [index, record] of records.entries()) {
    if (resultSeen) throw traceInvalid("effect or record observed after terminal result");
    validateFixtureRecord(record, caseId, index, messageIds);
    if (record.type === "result") {
      if (index !== records.length - 1) {
        throw traceInvalid("result must be the final record");
      }
      resultSeen = true;
    }
  }
  if (!resultSeen) throw traceInvalid("terminal result is missing");

  const events = records.map((record) => record.event);
  if (!sameJson(events, EXPECTED_EVENTS[caseId])) {
    throw traceInvalid("event projection does not match the frozen G0 contract");
  }
  if (records[0].type !== "system" || records.at(-1).type !== "result") {
    throw traceInvalid("fixture framing is invalid");
  }

  const assistantTurns = records.filter((record) => record.type === "assistant").length;
  if (assistantTurns > profile.claude.budgets.assistant_turns_per_case) {
    throw traceInvalid("assistant turn ceiling exceeded");
  }

  const count = (event) => events.filter((candidate) => candidate === event).length;
  const counters = {
    questions: count("ASK_USER_QUESTION"),
    research: count("RESEARCH_ACTION"),
    handoffs: count("HANDOFF_INTENT"),
    plans: count("NATIVE_PLAN_OBSERVED"),
  };
  const canonical = `${records.map((record) => JSON.stringify(record)).join("\n")}\n`;
  return {
    schema_version: SYNTHETIC_RESULT_SCHEMA,
    case_id: caseId,
    verdict: "DRY_FIXTURE_PASS",
    trace_sha256: sha256(canonical),
    assistant_turns: assistantTurns,
    counters,
    live_case_executed: false,
    host_spawned: false,
    model_invoked: false,
  };
}

export function projectDryReceipt(result) {
  if (!isPlainObject(result)) throw traceInvalid("result must be an object");
  if (result.schema_version !== SYNTHETIC_RESULT_SCHEMA) {
    throw traceInvalid("result schema_version is not the frozen synthetic-result schema");
  }
  if (!CLAUDE_G0_CASE_IDS.includes(result.case_id)) {
    throw traceInvalid("result case_id is not a frozen Claude G0 case");
  }
  if (result.verdict !== "DRY_FIXTURE_PASS") {
    throw traceInvalid("only dry fixture PASS may be projected");
  }
  if (!/^[0-9a-f]{64}$/u.test(result.trace_sha256 ?? "")) {
    throw traceInvalid("trace digest must be SHA-256");
  }
  if (!Number.isInteger(result.assistant_turns) || result.assistant_turns < 0) {
    throw traceInvalid("assistant_turns must be a nonnegative integer");
  }
  if (!isPlainObject(result.counters)) throw traceInvalid("result counters must be an object");
  const counters = {};
  for (const field of COUNTER_FIELDS) {
    const value = result.counters[field];
    if (!Number.isInteger(value) || value < 0) {
      throw traceInvalid("counters must be nonnegative integers");
    }
    counters[field] = value;
  }
  for (const field of Object.keys(result.counters)) {
    if (!COUNTER_FIELDS.includes(field)) {
      throw traceInvalid("counters carry a field outside the frozen projection");
    }
  }
  return {
    schema_version: SYNTHETIC_RESULT_SCHEMA,
    case_id: result.case_id,
    verdict: result.verdict,
    trace_sha256: result.trace_sha256,
    assistant_turns: result.assistant_turns,
    counters,
    live_case_executed: false,
    model_invoked: false,
  };
}
