#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

import {
  evaluateClaudeFixture,
  projectDryReceipt,
  renderClaudeProposal,
  runCodexReadOnlyProbe,
  sanitizeFailureMessage,
  validateRunnerProfile,
} from "../src/live-validation/runner.mjs";

const ROOT = new URL("../", import.meta.url);
const PROFILE_URL = new URL("tests/live-validation/runner-profile.v1.json", ROOT);
const FIXTURE_ROOT = new URL("tests/fixtures/live/claude/", ROOT);
const ALLOWED_COMMANDS = new Set(["doctor", "dry-run", "propose", "probe-codex"]);
const CASE_UUIDS = Object.freeze({
  "A-G0-01": "00000000-0000-4000-8000-000000000001",
  "A-G0-02": "00000000-0000-4000-8000-000000000002",
  "A-G0-03": "00000000-0000-4000-8000-000000000003",
  "A-G0-04": "00000000-0000-4000-8000-000000000004",
});

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

async function readProfile() {
  const raw = await readFile(PROFILE_URL, "utf8");
  const profile = JSON.parse(raw);
  validateRunnerProfile(profile);
  return { profile, raw };
}

async function readFixture(caseId) {
  const raw = await readFile(new URL(`${caseId}.ndjson`, FIXTURE_ROOT), "utf8");
  const records = raw
    .split(/\r?\n/u)
    .filter(Boolean)
    .map((line) => JSON.parse(line));
  return { raw, records };
}

function responseBase() {
  return {
    authorization_epoch: "LVP@v3-A",
    host_spawned: false,
    plugin_loaded: false,
    model_invoked: false,
    live_case_executed: false,
    plan_executed: false,
    conformance_status: "CONFORMANCE_UNTESTED",
  };
}

function emit(value) {
  process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
}

function fail(code, message, exitCode = 1) {
  emit({
    ok: false,
    code,
    message,
    ...responseBase(),
  });
  process.exitCode = exitCode;
}

function parseProposeArgs(args) {
  let caseId = "A-G0-01";
  for (let index = 0; index < args.length; index += 1) {
    const token = args[index];
    if (token === "--json") continue;
    if (token === "--case") {
      const value = args[index + 1];
      if (!value || !Object.hasOwn(CASE_UUIDS, value)) {
        throw new Error("--case must name one frozen Claude G0 case");
      }
      caseId = value;
      index += 1;
      continue;
    }
    throw new Error(
      "RUNNER_ARGUMENT_REJECTED: proposal accepts only --json and --case with a frozen G0 case; the rejected argument is not echoed",
    );
  }
  return caseId;
}

function assertNoExtraArgs(args) {
  const extras = args.filter((token) => token !== "--json");
  if (extras.length > 0) {
    throw new Error(
      "RUNNER_ARGUMENT_REJECTED: this command accepts only --json; the rejected argument is not echoed",
    );
  }
}

async function doctor() {
  const { profile, raw: profileRaw } = await readProfile();
  const fixtures = [];
  for (const caseId of profile.claude.g0_case_ids) {
    const { raw, records } = await readFixture(caseId);
    const result = evaluateClaudeFixture(profile, caseId, records);
    fixtures.push({
      case_id: caseId,
      fixture_sha256: sha256(raw),
      trace_sha256: result.trace_sha256,
      verdict: result.verdict,
    });
  }
  emit({
    ok: true,
    schema_version: "thyquery.runner-doctor.v1",
    status: "DRY_VALIDATION_READY",
    profile_sha256: sha256(profileRaw),
    command_surface: [...profile.command_surface],
    claude_status: profile.claude.status,
    claude_host_disposition: profile.claude.host_disposition,
    codex_status: profile.codex.status,
    codex_host_disposition: profile.codex.host_disposition,
    fixtures,
    ...responseBase(),
  });
}

async function dryRun() {
  const { profile } = await readProfile();
  const receipts = [];
  for (const caseId of profile.claude.g0_case_ids) {
    const { records } = await readFixture(caseId);
    receipts.push(projectDryReceipt(evaluateClaudeFixture(profile, caseId, records)));
  }
  emit({
    ok: true,
    schema_version: "thyquery.runner-dry-suite.v1",
    status: "DRY_FIXTURE_SUITE_PASS",
    case_count: receipts.length,
    receipts,
    live_evidence_created: false,
    ...responseBase(),
  });
}

async function propose(args) {
  const caseId = parseProposeArgs(args);
  const { profile } = await readProfile();
  const proposal = renderClaudeProposal(profile, caseId, {
    run_id: "proposal-only",
    case_uuid: CASE_UUIDS[caseId],
  });
  emit({
    ok: true,
    schema_version: "thyquery.runner-proposal-envelope.v1",
    status: proposal.status,
    proposal,
    executable_live_scope: false,
    ...responseBase(),
  });
}

async function probeCodex() {
  const { profile } = await readProfile();
  const probe = runCodexReadOnlyProbe(profile);
  emit({
    ok: probe.all_exit_zero,
    schema_version: "thyquery.runner-codex-probe-envelope.v1",
    status: probe.loader_status,
    probe,
    live_evidence_created: false,
    ...responseBase(),
  });
  if (!probe.all_exit_zero) process.exitCode = 1;
}

async function main() {
  const [command, ...args] = process.argv.slice(2);
  if (!ALLOWED_COMMANDS.has(command)) {
    fail("COMMAND_NOT_ALLOWED", "runner exposes no host/plugin execution command", 2);
    return;
  }
  try {
    if (command === "doctor") {
      assertNoExtraArgs(args);
      await doctor();
    } else if (command === "dry-run") {
      assertNoExtraArgs(args);
      await dryRun();
    } else if (command === "propose") {
      await propose(args);
    } else if (command === "probe-codex") {
      assertNoExtraArgs(args);
      await probeCodex();
    }
  } catch (error) {
    fail("RUNNER_VALIDATION_FAILED", sanitizeFailureMessage(error));
  }
}

await main();
