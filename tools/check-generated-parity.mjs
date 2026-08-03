import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { PACKAGES, skillPath } from "./package-layout.mjs";
import { checkGeneratedResources } from "./render-plugin-resources.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const NAMES = [
  "protocol.generated.md",
  "graph.generated.md",
  "closure.generated.md",
];

const report = await checkGeneratedResources();
if (!report.ok) {
  throw new Error(`Generated resources differ from spec: ${report.mismatches.join(", ")}`);
}

for (const name of NAMES) {
  const codex = await readFile(
    path.join(ROOT, "plugins/codex-thyquery", skillPath("plugins/codex-thyquery", "references", name)),
    "utf8",
  );
  const claude = await readFile(
    path.join(ROOT, "plugins/claude-thyquery", skillPath("plugins/claude-thyquery", "references", name)),
    "utf8",
  );
  if (codex !== claude) throw new Error(`Cross-host parity failed for ${name}`);
}

// The generated files above are byte-identical across hosts, so parity on them
// alone proved nothing about the hand-written skills — which is how the Claude
// package came to compress the four action owners into prose while Codex kept
// the labelled vocabulary the action policy defines. Hand-written instructions
// legitimately differ in host grammar, so they are checked for the shared
// vocabulary they must both carry rather than for byte equality.
const REQUIRED_SKILL_VOCABULARY = [
  "`USER`",
  "`EXTERNAL`",
  "`FRAME`",
  "`SHARED`",
  "would change the contract or the plan",
  "only reachable success outcome",
  "use 12 unless the caller configures it",
  "only a guard ends the loop",
  "Never end an invocation silently",
  "CANCELLED",
  "RESOURCE_EXHAUSTED",
  "PLAN_MODE_REQUIRED",
  "HOST_CAPABILITY_CONTRADICTION",
  "COMPLETE_AFTER_PLAN",
];

for (const packagePath of PACKAGES) {
  const skill = await readFile(
    path.join(ROOT, packagePath, skillPath(packagePath, "SKILL.md")),
    "utf8",
  );
  for (const token of REQUIRED_SKILL_VOCABULARY) {
    if (!skill.includes(token)) {
      throw new Error(`${packagePath} skill is missing required vocabulary: ${token}`);
    }
  }
}

process.stdout.write("generated source, cross-host, and skill-vocabulary parity pass\n");
