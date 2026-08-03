import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { checkControlGraph } from "../../src/reference/graph-check.mjs";

async function json(path) {
  return JSON.parse(await readFile(new URL(path, import.meta.url), "utf8"));
}

test("control graph is reachable, absorbing, bounded-cycle-ready, and handoff-dominated", async () => {
  const graph = await json("../../spec/graph/control-graph.v1.json");
  const precedence = await json("../../spec/graph/guard-precedence.v1.json");
  const report = checkControlGraph(graph, precedence);
  assert.deepEqual(report.errors, []);
  assert.equal(report.ok, true);
  assert.equal(report.reachable_count, report.node_count);
});

test("graph checker rejects terminal leakage and illegal handoff sources", async () => {
  const graph = await json("../../spec/graph/control-graph.v1.json");
  const precedence = await json("../../spec/graph/guard-precedence.v1.json");
  const broken = structuredClone(graph);
  broken.edges.push({
    id: "bad-terminal-edge",
    from: "COMPLETE_AFTER_PLAN",
    to: "DIAGNOSE_GAP",
    guard: "ALWAYS",
  });
  broken.edges.push({
    id: "bad-handoff-edge",
    from: "ASK_USER",
    to: "HANDOFF_READY",
    guard: "ALWAYS",
  });
  const report = checkControlGraph(broken, precedence);
  assert.equal(report.ok, false);
  assert.ok(report.errors.includes("TERMINAL_NOT_ABSORBING:COMPLETE_AFTER_PLAN"));
  assert.ok(report.errors.includes("ILLEGAL_HANDOFF_SOURCE:ASK_USER"));
});
