import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { digest } from "../src/reference/canonicalize.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PACKAGE_ROOTS = [
  path.join(ROOT, "plugins/codex-thyquery/skills/thyquery/references"),
  path.join(ROOT, "plugins/claude-thyquery/skills/thyquery/references"),
];

async function readSource(relativePath) {
  return readFile(path.join(ROOT, relativePath), "utf8");
}

export async function buildGeneratedResources() {
  const product = await readSource("spec/product-contract.md");
  const graph = JSON.parse(await readSource("spec/graph/control-graph.v1.json"));
  const precedence = JSON.parse(
    await readSource("spec/graph/guard-precedence.v1.json"),
  );
  const closure = await readSource("spec/policies/closure-policy.v1.md");
  const sourceDigest = digest({ product, graph, precedence, closure });

  const protocol = `<!-- GENERATED; source of truth is spec/. -->
# ThyQuery Protocol Snapshot v1

- Source digest: \`${sourceDigest}\`
- Runtime status: instruction-only candidate; the Node reference controller is development-only.
- Entry: verified stock Plan is mandatory. Missing proof yields \`PLAN_MODE_REQUIRED\` and no action.
- Commit authority: validated typed events through one canonical reducer; model/tool output is proposal-only.
- Handoff authority: only \`EPISTEMIC_CLOSED\` or \`ACCEPTED_RESIDUAL\` bound to the current contract digest. In v1 no calibration exists, so \`EPISTEMIC_CLOSED\` is unreachable and \`ACCEPTED_RESIDUAL\` is the only reachable success outcome.
- Materiality: a gap, fact, or contradiction is material only when resolving it differently would change the contract or the plan.
- Loop obligation: one committed macrostep is not the end. Return to guard recomputation after every commit and re-evaluate the whole ladder from a fresh snapshot. The loop exits only when a guard fires, never because an action finished or the contract looks complete.
- Transition budget: a finite count of committed active macrosteps, decremented once per commit, **default 12** unless the caller configures it. Preflight, guard recomputation, replay, read-only observation, and an exact repeated response consume none. Zero yields \`RESOURCE_EXHAUSTED\`, a typed non-success. Do not infer a different figure from how hard the request feels.
- Action admissibility: \`net_value = expected_plan_loss_reduction − user_burden\`. Non-positive or non-finite net value is inadmissible; with no admissible action the outcome is a typed non-success. Rank by loss reduction, then lower burden, then stable edge ID.
- Stall tests: \`exact_repeat\` is the same canonical response under a fresh key; \`oscillation\` is returning to a prior contract digest and leaving again; \`semantic_stall\` is a commit with no contract, residual, or evidence delta; \`unproductive_scc\` is re-entering refinement with no improvement in coverage, contradictions, or residuals. Fatigue and slow progress are not stall evidence.
- Product terminal: one observed native plan, then \`COMPLETE_AFTER_PLAN\`; never execute it.
- Non-success: cancel, block, stall, cap, integrity failure, host contradiction, and uncertain handoff authorize no plan.
- Replay: pure event fold with zero user, network, planner, filesystem, or execution effects.
`;

  const guardLines = precedence.guards
    .map((guard) => `${guard.priority}. \`${guard.id}\` — ${guard.meaning}`)
    .join("\n");
  const graphSnapshot = `<!-- GENERATED; source of truth is spec/. -->
# ThyQuery Guarded Graph Snapshot v1

- Source digest: \`${sourceDigest}\`
- Start node: \`${graph.start}\`
- Declared nodes: ${graph.nodes.length}
- Declared edges: ${graph.edges.length}

## Frozen guard precedence

${guardLines}

Evaluate every guard against one canonical snapshot. Success is checked before cap exhaustion, but only after cancel, integrity, and non-waivable host conditions. Equal-priority incompatible edges without a frozen tie-break are \`STATE_CORRUPT(EDGE_CONFLICT)\`.

Only \`${graph.handoff_authorizers.join("\` and \`")}\` may reach \`HANDOFF_READY\`. All product terminals are absorbing.
`;

  const closureSnapshot = `<!-- GENERATED; source of truth is spec/. -->
# ThyQuery Closure Snapshot v1

- Source digest: \`${sourceDigest}\`

\`EPISTEMIC_CLOSED\` requires all of:

- graph integrity;
- philosophical/user-authority grounding;
- calibrated coverage, residual-risk, conflict, stability, and non-myopic value-of-information gates;
- plan-input readiness;
- no unauthorized intent drift; and
- explicit resolved acceptance bound to the current contract digest.

An uncalibrated stratum cannot resolve.

## Calibration status in v1

No calibration exists for any task, risk, or language stratum in this release. No thresholds have been fitted on held-out cases, none are shipped, and no universal cross-domain constants are available to stand in for them.

Therefore the calibration conjunct is false everywhere, \`EPISTEMIC_CLOSED\` is unreachable in v1, and \`ACCEPTED_RESIDUAL\` is the only reachable success outcome. This is a fact about the release, not a judgment to make per invocation.

Do not infer or assume a calibration to satisfy the conjunct. A task that feels low-risk, an answer that feels complete, a confident estimate, and a stratum resembling a calibrated one are all insufficient; inventing a threshold at run time reintroduces the unsupported constant this policy refuses to ship. Route through the residual path and let the user accept what remains open — that is the honest outcome, not a degraded one.

\`ACCEPTED_RESIDUAL\` requires an explicit current-digest ledger containing provenance, impact, mitigation, reversibility, and owner for every residual. Resource limits and repeated/stable model output are never success evidence.
`;

  return {
    "protocol.generated.md": protocol,
    "graph.generated.md": graphSnapshot,
    "closure.generated.md": closureSnapshot,
  };
}

export async function checkGeneratedResources() {
  const expected = await buildGeneratedResources();
  const mismatches = [];
  for (const packageRoot of PACKAGE_ROOTS) {
    for (const [name, contents] of Object.entries(expected)) {
      const target = path.join(packageRoot, name);
      let actual;
      try {
        actual = await readFile(target, "utf8");
      } catch {
        mismatches.push(path.relative(ROOT, target));
        continue;
      }
      if (actual !== contents) mismatches.push(path.relative(ROOT, target));
    }
  }
  return { ok: mismatches.length === 0, mismatches };
}

async function main() {
  const expected = await buildGeneratedResources();
  if (process.argv.includes("--write")) {
    for (const packageRoot of PACKAGE_ROOTS) {
      for (const [name, contents] of Object.entries(expected)) {
        await writeFile(path.join(packageRoot, name), contents, "utf8");
      }
    }
    process.stdout.write("generated plugin resources written\n");
    return;
  }

  const report = await checkGeneratedResources();
  if (!report.ok) {
    process.stderr.write(`generated resource mismatch: ${report.mismatches.join(", ")}\n`);
    process.exitCode = 1;
    return;
  }
  process.stdout.write("generated plugin resources match canonical sources\n");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await main();
}
