import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  CODEX_PROBE_ALLOWLIST,
  evaluateClaudeFixture,
  isAllowedCodexProbe,
  projectDryReceipt,
  renderClaudeProposal,
  runCodexReadOnlyProbe,
  sanitizeFailureMessage,
  validateRunnerProfile,
} from "../../src/live-validation/runner.mjs";

const ROOT = new URL("../../", import.meta.url);
const PROFILE_URL = new URL("runner-profile.v1.json", import.meta.url);
const CLAUDE_FIXTURE_ROOT = new URL("../fixtures/live/claude/", import.meta.url);

async function json(url) {
  return JSON.parse(await readFile(url, "utf8"));
}

async function jsonl(url) {
  return (await readFile(url, "utf8"))
    .split(/\r?\n/u)
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

test("runner profile is an inert, bounded LVP@v3-A artifact", async () => {
  const profile = await json(PROFILE_URL);
  assert.doesNotThrow(() => validateRunnerProfile(profile));
  assert.equal(profile.authorization.epoch, "LVP@v3-A");
  for (const field of [
    "execution_authorized",
    "plugin_load_authorized",
    "model_invocation_authorized",
    "config_mutation_authorized",
    "plan_execution_authorized",
  ]) {
    assert.equal(profile.authorization[field], false, field);
  }
  assert.deepEqual(profile.command_surface, [
    "doctor",
    "dry-run",
    "propose",
    "probe-codex",
  ]);
  assert.equal(profile.claude.status, "LIVE_RUN_PROPOSAL_BLOCKED");
  assert.equal(profile.codex.status, "ISOLATION_METHOD_UNRESOLVED");
  assert.deepEqual(profile.claude.g0_case_ids, [
    "A-G0-01",
    "A-G0-02",
    "A-G0-03",
    "A-G0-04",
  ]);
  assert.deepEqual(profile.claude.tools.available, ["Read", "AskUserQuestion"]);
  assert.equal(profile.claude.budgets.assistant_turns_per_case, 12);
  assert.equal(profile.claude.budgets.usd_per_case, 0.5);
  assert.equal(profile.claude.budgets.usd_suite, 2);
  assert.equal(profile.claude.budgets.wall_clock_ms_per_case, 180_000);
  assert.equal(profile.claude.budgets.wall_clock_ms_suite, 900_000);
});

test("profile validation rejects authority expansion and execution-shaped verbs", async () => {
  const profile = await json(PROFILE_URL);
  for (const mutation of [
    (candidate) => candidate.command_surface.push("execute"),
    (candidate) => candidate.command_surface.push("live"),
    (candidate) => {
      candidate.authorization.model_invocation_authorized = true;
    },
    (candidate) => {
      candidate.authorization.plugin_load_authorized = true;
    },
    (candidate) => {
      candidate.claude.status = "LIVE_RUN_READY";
    },
    (candidate) => {
      candidate.claude.command.argv.push("--dangerously-skip-permissions");
    },
    (candidate) => {
      candidate.claude.command.argv.push("--resume", "private-session");
    },
    (candidate) => {
      candidate.claude.command.required_environment.HOME = "/private/home";
    },
    (candidate) => {
      candidate.codex.probe_allowlist.push(["codex", "plugin", "add", "./candidate"]);
    },
  ]) {
    const candidate = clone(profile);
    mutation(candidate);
    assert.throws(() => validateRunnerProfile(candidate), /INERT_PROFILE_REQUIRED/u);
  }
});

test("mandatory safety flags are enforced by value, not by token presence", async () => {
  const profile = await json(PROFILE_URL);
  const swap = (argv, flag, value) => {
    const index = argv.indexOf(flag);
    argv[index + 1] = value;
  };
  for (const mutation of [
    // A stray allowed token must not satisfy the flag it belongs to.
    (candidate) => {
      swap(candidate.claude.command.argv, "--permission-mode", "acceptEdits");
      candidate.claude.command.argv.push("plan");
    },
    (candidate) => {
      swap(candidate.claude.command.argv, "--tools", "Read,AskUserQuestion,Bash");
    },
    (candidate) => {
      swap(candidate.claude.command.argv, "--allowedTools", "Read,AskUserQuestion,Bash");
    },
    (candidate) => {
      swap(candidate.claude.command.argv, "--output-format", "text");
    },
    // A duplicated flag must not let a second, weaker value ride along.
    (candidate) => {
      candidate.claude.command.argv.push("--permission-mode", "acceptEdits");
    },
  ]) {
    const candidate = clone(profile);
    mutation(candidate);
    assert.throws(() => validateRunnerProfile(candidate), /INERT_PROFILE_REQUIRED/u);
  }
});

test("no concrete host-resolvable value may replace a frozen placeholder", async () => {
  const profile = await json(PROFILE_URL);
  const swap = (argv, flag, value) => {
    const index = argv.indexOf(flag);
    argv[index + 1] = value;
  };
  for (const mutation of [
    (candidate) => swap(candidate.claude.command.argv, "--model", "claude-opus-5"),
    (candidate) => swap(candidate.claude.command.argv, "--plugin-dir", "/etc"),
    (candidate) => swap(candidate.claude.command.argv, "--settings", "/Users/example/settings.json"),
    (candidate) => swap(candidate.claude.command.argv, "--mcp-config", "/Users/example/mcp.json"),
    (candidate) => swap(candidate.claude.command.argv, "--session-id", "11111111-1111-4111-8111-111111111111"),
    (candidate) => {
      candidate.claude.command.cwd = "/Users/example";
    },
  ]) {
    const candidate = clone(profile);
    mutation(candidate);
    assert.throws(() => validateRunnerProfile(candidate), /INERT_PROFILE_REQUIRED/u);
  }
});

test("the argv cost ceiling cannot drift away from the frozen budget object", async () => {
  const profile = await json(PROFILE_URL);
  const raised = clone(profile);
  const index = raised.claude.command.argv.indexOf("--max-budget-usd");
  raised.claude.command.argv[index + 1] = "500";
  assert.throws(() => validateRunnerProfile(raised), /INERT_PROFILE_REQUIRED/u);

  const lowered = clone(profile);
  lowered.claude.command.argv[lowered.claude.command.argv.indexOf("--max-budget-usd") + 1] = "0.01";
  assert.throws(() => validateRunnerProfile(lowered), /INERT_PROFILE_REQUIRED/u);
});

test("validator diagnostics never interpolate caller-supplied values", async () => {
  const profile = await json(PROFILE_URL);
  const secret = "private-user-query-and-path";
  assert.throws(
    () => renderClaudeProposal(profile, secret, { run_id: "r", case_uuid: "00000000-0000-4000-8000-000000000001" }),
    (error) => /INERT_PROFILE_REQUIRED/u.test(error.message) && !error.message.includes(secret),
  );
  assert.throws(
    () => evaluateClaudeFixture(profile, secret, [{ type: "system" }]),
    (error) => /TRACE_INVALID/u.test(error.message) && !error.message.includes(secret),
  );
  const drifted = clone(profile);
  drifted.receipt_policy.allowlisted_fields.push(secret);
  drifted.receipt_policy.forbidden_raw_fields.push(secret);
  assert.throws(
    () => validateRunnerProfile(drifted),
    (error) => /INERT_PROFILE_REQUIRED/u.test(error.message) && !error.message.includes(secret),
  );
});

test("Codex probe executor is called only with allowlisted vectors and emits hashes, never output", async () => {
  const profile = await json(PROFILE_URL);
  const observed = [];
  const probe = runCodexReadOnlyProbe(profile, {
    timeout_ms: 1234,
    executor(argv, timeoutMs) {
      observed.push({ argv, timeoutMs });
      return {
        exit_code: 0,
        signal: null,
        stdout: `synthetic stdout for ${argv.join(" ")}`,
        stderr: "synthetic private stderr",
      };
    },
  });
  assert.deepEqual(
    observed.map(({ argv }) => argv),
    CODEX_PROBE_ALLOWLIST,
  );
  assert.ok(observed.every(({ timeoutMs }) => timeoutMs === 1234));
  assert.equal(probe.commands.length, 8);
  assert.equal(probe.all_exit_zero, true);
  assert.equal(probe.loader_status, "ISOLATION_METHOD_UNRESOLVED");
  assert.equal(probe.inertness.write_capable_command_executed, false);
  const serialized = JSON.stringify(probe);
  assert.ok(!serialized.includes("synthetic stdout"));
  assert.ok(!serialized.includes("synthetic private stderr"));
  assert.match(probe.commands[0].stdout_sha256, /^[0-9a-f]{64}$/u);
  assert.match(probe.commands[0].stderr_sha256, /^[0-9a-f]{64}$/u);
});

test("Claude proposal is argv data, pins safety ceilings, and remains blocked", async () => {
  const profile = await json(PROFILE_URL);
  const proposal = renderClaudeProposal(profile, "A-G0-01", {
    run_id: "synthetic-run",
    case_uuid: "00000000-0000-4000-8000-000000000001",
  });

  assert.equal(proposal.status, "LIVE_RUN_PROPOSAL_BLOCKED");
  assert.equal(proposal.executable, "<CLAUDE_BIN>");
  assert.equal(proposal.command, undefined);
  assert.equal(proposal.shell, false);
  assert.equal(proposal.cwd, "<CASE_ROOT>/work");
  assert.deepEqual(proposal.environment, {});
  assert.deepEqual(proposal.secret_env_names, ["ANTHROPIC_API_KEY"]);
  assert.ok(!JSON.stringify(proposal).includes("$ANTHROPIC_API_KEY"));
  for (const token of [
    "--bare",
    "--print",
    "--input-format",
    "stream-json",
    "--output-format",
    "--permission-mode",
    "plan",
    "--plugin-dir",
    "--no-session-persistence",
    "--max-budget-usd",
    "0.50",
    "--strict-mcp-config",
    "--tools",
    "Read,AskUserQuestion",
  ]) {
    assert.ok(proposal.argv.includes(token), token);
  }
  assert.deepEqual(proposal.limits, profile.claude.budgets);
  assert.ok(proposal.blockers.length > 0);
  assert.equal(proposal.inertness.host_spawned, false);
  assert.equal(proposal.inertness.plugin_loaded, false);
  assert.equal(proposal.inertness.model_invoked, false);
});

test("Codex probe accepts only the eight fixed read-only help/version vectors", () => {
  assert.equal(CODEX_PROBE_ALLOWLIST.length, 8);
  for (const argv of CODEX_PROBE_ALLOWLIST) {
    assert.equal(isAllowedCodexProbe(argv), true, argv.join(" "));
  }
  for (const argv of [
    ["codex", "plugin", "add", "./candidate"],
    ["codex", "plugin", "marketplace", "add", "./candidate"],
    ["codex", "app-server"],
    ["codex", "app-server", "generate-json-schema", "--out", "./schema"],
    ["codex", "exec", "hello"],
    ["sh", "-c", "codex --help"],
  ]) {
    assert.equal(isAllowedCodexProbe(argv), false, argv.join(" "));
  }
});

test("four Claude G0 recorded fixtures dry-validate without becoming live evidence", async () => {
  const profile = await json(PROFILE_URL);
  const expected = new Map([
    ["A-G0-01", { questions: 0, research: 0, handoffs: 0, plans: 0 }],
    ["A-G0-02", { questions: 0, research: 0, handoffs: 0, plans: 0 }],
    ["A-G0-03", { questions: 1, research: 0, handoffs: 0, plans: 0 }],
    ["A-G0-04", { questions: 0, research: 0, handoffs: 0, plans: 0 }],
  ]);

  for (const [caseId, counters] of expected) {
    const records = await jsonl(new URL(`${caseId}.ndjson`, CLAUDE_FIXTURE_ROOT));
    const result = evaluateClaudeFixture(profile, caseId, records);
    assert.equal(result.verdict, "DRY_FIXTURE_PASS");
    assert.equal(result.live_case_executed, false);
    assert.equal(result.host_spawned, false);
    assert.equal(result.model_invoked, false);
    assert.deepEqual(result.counters, counters);
    assert.ok(result.assistant_turns <= profile.claude.budgets.assistant_turns_per_case);
  }
});

test("fixture evaluator fails closed on unknown records, duplicates, raw secrets, and post-terminal effects", async () => {
  const profile = await json(PROFILE_URL);
  const base = await jsonl(new URL("A-G0-04.ndjson", CLAUDE_FIXTURE_ROOT));
  const candidates = [
    [...base, { schema_version: "thyquery.synthetic-claude-stream.v1", type: "mystery" }],
    [base[0], base[1], clone(base[1]), ...base.slice(2)],
    base.map((record, index) =>
      index === 1 ? { ...record, raw_query: "private-user-query" } : record,
    ),
    [
      ...base,
      {
        schema_version: "thyquery.synthetic-claude-stream.v1",
        case_id: "A-G0-04",
        type: "assistant",
        message_id: "after-terminal",
        event: "HANDOFF_INTENT",
      },
    ],
  ];
  for (const records of candidates) {
    assert.throws(
      () => evaluateClaudeFixture(profile, "A-G0-04", records),
      /TRACE_INVALID/u,
    );
  }
});

test("dry receipts are allowlist projections that cannot retain sensitive source fields", () => {
  const receipt = projectDryReceipt({
    schema_version: "thyquery.synthetic-result.v1",
    case_id: "A-G0-03",
    verdict: "DRY_FIXTURE_PASS",
    trace_sha256: "a".repeat(64),
    assistant_turns: 2,
    counters: { questions: 1, research: 0, handoffs: 0, plans: 0 },
    query: "private-user-query",
    answer: "private-user-answer",
    source_text: "private-source",
    raw_path: "/Users/example/private",
    api_key: "secret-token",
    stdout: "raw-host-output",
  });
  assert.deepEqual(Object.keys(receipt).sort(), [
    "assistant_turns",
    "case_id",
    "counters",
    "live_case_executed",
    "model_invoked",
    "schema_version",
    "trace_sha256",
    "verdict",
  ]);
  const serialized = JSON.stringify(receipt);
  for (const secret of [
    "private-user-query",
    "private-user-answer",
    "private-source",
    "/Users/example/private",
    "secret-token",
    "raw-host-output",
  ]) {
    assert.ok(!serialized.includes(secret), secret);
  }
});

test("dry receipt projection rejects schema drift and invalid counters", () => {
  const valid = {
    schema_version: "thyquery.synthetic-result.v1",
    case_id: "A-G0-01",
    verdict: "DRY_FIXTURE_PASS",
    trace_sha256: "b".repeat(64),
    assistant_turns: 1,
    counters: { questions: 0, research: 0, handoffs: 0, plans: 0 },
  };
  for (const mutation of [
    (candidate) => {
      candidate.schema_version = "private-user-query";
    },
    (candidate) => {
      candidate.counters.questions = -1;
    },
    (candidate) => {
      candidate.counters.research = "private-source-text";
    },
  ]) {
    const candidate = clone(valid);
    mutation(candidate);
    assert.throws(() => projectDryReceipt(candidate), /TRACE_INVALID/u);
  }
});

test("CLI rejects every execution-shaped command and exposes stable JSON only", () => {
  const tool = fileURLToPath(new URL("tools/live-validation-runner.mjs", ROOT));
  for (const command of ["execute", "live", "run", "invoke", "load-plugin"]) {
    const child = spawnSync(process.execPath, [tool, command, "--json"], {
      cwd: new URL(".", ROOT),
      encoding: "utf8",
      env: { PATH: process.env.PATH ?? "" },
    });
    assert.equal(child.status, 2, command);
    const response = JSON.parse(child.stdout);
    assert.equal(response.ok, false);
    assert.equal(response.code, "COMMAND_NOT_ALLOWED");
    assert.equal(response.host_spawned, false);
    assert.equal(response.model_invoked, false);
  }
});

test("doctor, dry-run, and propose need no host binary on PATH", () => {
  const tool = fileURLToPath(new URL("tools/live-validation-runner.mjs", ROOT));
  const cases = [
    {
      argv: ["doctor", "--json"],
      verify(response) {
        assert.equal(response.status, "DRY_VALIDATION_READY");
        assert.equal(response.fixtures.length, 4);
      },
    },
    {
      argv: ["dry-run", "--json"],
      verify(response) {
        assert.equal(response.status, "DRY_FIXTURE_SUITE_PASS");
        assert.equal(response.case_count, 4);
        assert.ok(response.receipts.every((receipt) => receipt.live_case_executed === false));
      },
    },
    {
      argv: ["propose", "--case", "A-G0-03", "--json"],
      verify(response) {
        assert.equal(response.status, "LIVE_RUN_PROPOSAL_BLOCKED");
        assert.equal(response.executable_live_scope, false);
        assert.equal(response.proposal.case_id, "A-G0-03");
      },
    },
  ];

  for (const fixture of cases) {
    const child = spawnSync(process.execPath, [tool, ...fixture.argv], {
      cwd: new URL(".", ROOT),
      encoding: "utf8",
      env: { PATH: "" },
    });
    assert.equal(child.status, 0, child.stderr);
    const response = JSON.parse(child.stdout);
    assert.equal(response.ok, true);
    assert.equal(response.host_spawned, false);
    assert.equal(response.plugin_loaded, false);
    assert.equal(response.model_invoked, false);
    assert.equal(response.live_case_executed, false);
    assert.equal(response.plan_executed, false);
    fixture.verify(response);
  }
});

test("CLI validation errors never echo untrusted arguments", () => {
  const tool = fileURLToPath(new URL("tools/live-validation-runner.mjs", ROOT));
  const secret = "private-user-query-and-path";
  const child = spawnSync(
    process.execPath,
    [tool, "propose", `--${secret}`, "--json"],
    {
      cwd: new URL(".", ROOT),
      encoding: "utf8",
      env: { PATH: "" },
    },
  );
  assert.equal(child.status, 1);
  assert.ok(!child.stdout.includes(secret));
  const response = JSON.parse(child.stdout);
  assert.equal(response.code, "RUNNER_VALIDATION_FAILED");
  assert.equal(response.host_spawned, false);
  assert.equal(response.model_invoked, false);
});

test("failure messages are reduced to self-authored, path-free text", () => {
  // The runner used to emit String(error.message) verbatim, so a filesystem
  // error published an absolute path in the receipt envelope.
  const fsError = new Error(
    "ENOENT: no such file or directory, open '/Users/example/private/runner-profile.v1.json'",
  );
  fsError.code = "ENOENT";
  const reduced = sanitizeFailureMessage(fsError);
  for (const leak of ["/Users/example", "ENOENT", "runner-profile"]) {
    assert.ok(!reduced.includes(leak), leak);
  }
  assert.doesNotMatch(reduced, /\//u);

  // Self-authored validator diagnostics are already constant and must survive.
  for (const authored of [
    "INERT_PROFILE_REQUIRED: Claude argv does not match the frozen contract",
    "TRACE_INVALID: counters must be nonnegative integers",
    "RUNNER_ARGUMENT_REJECTED: this command accepts only --json",
  ]) {
    assert.equal(sanitizeFailureMessage(new Error(authored)), authored);
  }

  // A self-authored prefix must not become a smuggling channel for a path.
  assert.doesNotMatch(
    sanitizeFailureMessage(new Error("TRACE_INVALID: /Users/example/private")),
    /\/Users/u,
  );
});
