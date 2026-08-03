import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import {
  createInitialState,
  makeEvent,
} from "../../src/reference/reducer.mjs";
import { replayEvents } from "../../src/reference/replay.mjs";

async function json(relative) {
  return JSON.parse(await readFile(new URL(relative, import.meta.url), "utf8"));
}

test("guard and edge matrices cover every frozen identifier with positive and negative cases", async () => {
  const precedence = await json("../../spec/graph/guard-precedence.v1.json");
  const graph = await json("../../spec/graph/control-graph.v1.json");
  const guardMatrix = await json("../fixtures/core/guard-matrix.json");
  const edgeMatrix = await json("../fixtures/core/edge-coverage.json");

  assert.deepEqual(
    guardMatrix.guards.map((item) => item.id),
    precedence.guards.map((item) => item.id),
  );
  assert.deepEqual(
    edgeMatrix.edges.map((item) => item.id).sort(),
    graph.edges.map((item) => item.id).sort(),
  );
  for (const item of [...guardMatrix.guards, ...edgeMatrix.edges]) {
    assert.ok(item.positive);
    assert.ok(item.negative);
  }
});

test("Codex and Claude question fixtures are semantically equivalent without false tool parity", async () => {
  const codex = await json("../fixtures/codex/question-contract.json");
  const claude = await json("../fixtures/claude/question-contract.json");
  for (const field of [
    "semantic_outcome",
    "gap_count",
    "correction_path",
    "defer_path",
    "cancel_path",
    "forced_truth",
    "status",
  ]) {
    assert.deepEqual(codex[field], claude[field], field);
  }
  assert.notEqual(codex.option_policy, claude.option_policy);
});

test("privacy projection contains only allowlisted keys and no synthetic sensitive value", async () => {
  const fixture = await json("../fixtures/privacy/minimum-trace.json");
  const initial = createInitialState({
    invocation_id: "privacy-fixture",
    original_query: fixture.input.original_query,
    host: "codex",
    transition_budget: 2,
  });
  const event = makeEvent(initial, "EVIDENCE_RECORDED", {
    evidence_id: "private-synthetic",
    claim: "synthetic privacy projection evidence",
    answer: fixture.input.answer,
    secret: fixture.input.secret,
    source_ref: "synthetic",
    retrieval_scope: "synthetic privacy fixture",
    applicability: "trace redaction only",
    freshness: "CURRENT",
    confidence_limits: "fixture assertion only",
    disposition: "directly_supported",
  }, { evidence_refs: ["synthetic"] });
  const { trace } = replayEvents(initial, [event]);
  assert.deepEqual(Object.keys(trace).sort(), fixture.allowed_trace_keys.sort());
  const serialized = JSON.stringify(trace);
  for (const value of fixture.forbidden_values) assert.doesNotMatch(serialized, new RegExp(value));
});

test("uncertain handoff fixture explicitly forbids retry and exactly-once claims", async () => {
  const fixture = await json("../fixtures/handoff/unknown-outcome.json");
  assert.equal(fixture.expected_terminal, "HANDOFF_OUTCOME_UNKNOWN");
  assert.equal(fixture.retry_count, 0);
  assert.ok(fixture.forbidden.includes("blind retry"));
  assert.ok(fixture.forbidden.includes("exactly-once claim"));
});
