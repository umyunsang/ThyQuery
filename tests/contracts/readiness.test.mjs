import test from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";

import { validatePackages } from "../../tools/validate-packages.mjs";

async function json(relative) {
  return JSON.parse(await readFile(new URL(relative, import.meta.url), "utf8"));
}

function rawSha256(contents) {
  return createHash("sha256").update(contents).digest("hex");
}

test("both live manifests are finite, explicitly not run, and honest about unresolved isolation", async () => {
  for (const relative of [
    "../fixtures/codex/live-manifest.json",
    "../fixtures/claude/live-manifest.json",
  ]) {
    const manifest = await json(relative);
    assert.equal(manifest.status, "NOT_RUN_REQUIRES_SEPARATE_APPROVAL");
    assert.equal(manifest.budget.case_count, manifest.cases.length);
    assert.equal(manifest.cases.length, 9);
    assert.equal(manifest.isolation.persistent_install, false);
    assert.equal(manifest.isolation.real_config_mutation, false);
    assert.equal(manifest.isolation.paid_calls_allowed, false);
    assert.equal(manifest.isolation.plan_execution_allowed, false);
    assert.equal(manifest.isolation.status, "ISOLATION_METHOD_UNRESOLVED");
    assert.equal(manifest.isolation.loader_method, null);
    assert.equal(manifest.isolation.cleanup_receipt, null);
    assert.match(manifest.surface, /isolation method unresolved/i);
    assert.doesNotMatch(manifest.surface, /\bisolated\b/i);
    assert.equal(manifest.budget.max_model_turns_per_case, "UNSET_PENDING_APPROVAL");
    assert.equal(manifest.budget.max_cost, "UNSET_PENDING_APPROVAL");
    assert.equal(manifest.budget.deadline, "UNSET_PENDING_APPROVAL");
    for (const liveCase of manifest.cases) {
      for (const field of ["id", "name", "preconditions", "action", "expected", "forbidden", "cleanup", "verdict"]) {
        assert.ok(field in liveCase, `${manifest.host}/${liveCase.id}/${field}`);
      }
      assert.ok(liveCase.expected.length > 0);
      assert.ok(liveCase.forbidden.length > 0);
      assert.ok(liveCase.cleanup.length > 0);
    }
  }
});

test("evaluation outcome schema cannot validate evidence-free metric groups", async () => {
  const schema = await json("../evaluation/outcome.schema.json");
  for (const pin of [
    "schema_version",
    "run_id",
    "host_version",
    "model_id",
    "pair_id",
    "compute_budget",
    "gate_receipts",
  ]) {
    assert.ok(schema.required.includes(pin), pin);
  }
  for (const group of [
    "contract_recovery",
    "plan_fidelity",
    "trace_integrity",
    "burden",
    "privacy",
  ]) {
    const metric = schema.properties[group];
    assert.equal(metric.type, "object", group);
    assert.equal(metric.additionalProperties, false, group);
    assert.ok(metric.required.length > 0, group);
  }
});

// `LVP_v3.md` is approval-bound: its SHA-256 is pinned in
// `approval_receipt_LVP_v3_A.md`, so it can never be edited. Binding it to a
// live-computed package digest therefore made a legitimate package change
// unrepairable — the assertion could only be satisfied by breaking the
// receipt. History is now checked against the values it actually recorded,
// and current-artifact drift is checked separately below.
test("the approval-bound LVP v3 record is intact as history", async () => {
  const lvp = await readFile(
    new URL(
      "../../.planning/2026-08-03-thyquery-two-host-plugin-intake/LVP_v3.md",
      import.meta.url,
    ),
    "utf8",
  );
  const codexManifest = await readFile(
    new URL("../fixtures/codex/live-manifest.json", import.meta.url),
  );
  const claudeManifest = await readFile(
    new URL("../fixtures/claude/live-manifest.json", import.meta.url),
  );
  assert.match(lvp, /ThyQuery Live Validation Proposal — `LVP@v3`/);
  // The package digests as they stood when this proposal was approved.
  assert.match(
    lvp,
    /sha256:2909fdb9f5dbdb786cdae8bb1a887b458ff8039b03a54b81a1a4b27821e10de7/,
  );
  assert.match(
    lvp,
    /sha256:58d640b357e3a75a304e5ee55672e745089a671b84aecc2b5fa6c0377c50d9e4/,
  );
  // Manifests are unchanged since approval, so these stay live-computed.
  assert.match(lvp, new RegExp(rawSha256(codexManifest)));
  assert.match(lvp, new RegExp(rawSha256(claudeManifest)));
  assert.match(lvp, /`npm test`: 60\/60 PASS/);
  assert.match(lvp, /Exact `LVP@v3-A 승인`/);
});

test("current package digests match the living artifact receipt", async () => {
  const evidence = await readFile(
    new URL("../../docs/implementation-evidence.md", import.meta.url),
    "utf8",
  );
  const packages = await validatePackages();
  for (const name of ["plugins/codex-thyquery", "plugins/claude-thyquery"]) {
    assert.match(evidence, new RegExp(packages.package_digests[name]), name);
  }
});

test("LVP v4 closes the runner epoch with bound artifacts and no live approval request", async () => {
  const lvp = await readFile(
    new URL(
      "../../.planning/2026-08-03-thyquery-two-host-plugin-intake/LVP_v4.md",
      import.meta.url,
    ),
    "utf8",
  );
  for (const relative of [
    "../../tests/live-validation/runner-profile.v1.json",
    "../../src/live-validation/runner.mjs",
    "../../tools/live-validation-runner.mjs",
    "../../docs/live-validation-runner.md",
    "../fixtures/live/claude/A-G0-01.ndjson",
    "../fixtures/live/claude/A-G0-02.ndjson",
    "../fixtures/live/claude/A-G0-03.ndjson",
    "../fixtures/live/claude/A-G0-04.ndjson",
  ]) {
    const contents = await readFile(new URL(relative, import.meta.url));
    assert.match(lvp, new RegExp(rawSha256(contents)), relative);
  }
  // The epoch's proof is a historical measurement: 78/78 passed when this
  // disposition closed. Requiring it to track later test additions was the
  // same mistake as binding LVP v3 to a live package digest — a hardcoded
  // *historical* value is correct, a hardcoded *current* value is not.
  const proof = lvp.match(/`npm test`: (\d+)\/(\d+) PASS/u);
  assert.ok(proof, "LVP v4 must record an `npm test` proof");
  assert.equal(proof[1], proof[2], "recorded proof must be a full pass");
  assert.equal(proof[1], "78", "the closing epoch recorded 78 passing tests");
  assert.match(lvp, /NO_LIVE_APPROVAL_REQUESTED/);
  assert.match(lvp, /HOST_UNSUPPORTED_IN_CURRENT_APPROVAL_EPOCH/);
  assert.match(lvp, /CONFORMANCE_UNTESTED/);
  assert.doesNotMatch(lvp, /`LVP@v4-[A-Z] 승인`/);
});

test("B and C differ only in controller identity across matched evaluation inputs", async () => {
  const evaluation = await json("../evaluation/arms.v1.json");
  assert.equal(evaluation.status, "NOT_RUN_REQUIRES_SEPARATE_APPROVAL");
  assert.equal(evaluation.thresholds, "UNSET_PENDING_PILOT");
  const matchedFields = [
    "intent_layer",
    "native_planner",
    "contract_schema",
    "prompt_policy",
    "action_repertoire",
    "evidence_corpus",
    "termination_budget",
    "model",
    "tools",
    "facts",
  ];
  for (const field of matchedFields) {
    assert.deepEqual(evaluation.arms.B[field], evaluation.arms.C[field], field);
  }
  assert.notEqual(evaluation.arms.B.controller, evaluation.arms.C.controller);
  assert.equal(evaluation.estimands["C-B"], "primary increment from guarded graph control");
});

test("all dossiers are sealed synthetic fixtures and preregistration remains pending", async () => {
  const directory = new URL("../evaluation/dossiers/", import.meta.url);
  const names = (await readdir(directory)).filter((name) => name.endsWith(".json"));
  assert.equal(names.length, 3);
  for (const name of names) {
    const dossier = JSON.parse(await readFile(new URL(name, directory), "utf8"));
    assert.equal(dossier.synthetic, true);
    assert.equal(dossier.privacy, "synthetic-only");
    assert.ok(dossier.hidden_contract.acceptance_criteria.length > 0);
  }
  const preregistration = await readFile(
    new URL("../evaluation/preregistration.md", import.meta.url),
    "utf8",
  );
  assert.match(preregistration, /NOT_RUN_REQUIRES_SEPARATE_APPROVAL/);
  assert.match(preregistration, /C−B/);
  assert.match(preregistration, /UNSET_PENDING_PILOT/);
});
