import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { checkGeneratedResources } from "../../tools/render-plugin-resources.mjs";
import { validateManifests } from "../../tools/validate-manifests.mjs";
import { validatePackages } from "../../tools/validate-packages.mjs";

test("host manifests and explicit skill entrypoints are valid", async () => {
  const report = await validateManifests();
  assert.deepEqual(report.errors, []);
  assert.equal(report.ok, true);
});

test("Claude skill is user-invocable only and cannot be selected implicitly", async () => {
  const skill = await readFile(
    new URL("../../plugins/claude-thyquery/skills/start/SKILL.md", import.meta.url),
    "utf8",
  );
  const frontmatter = skill.match(/^---\n([\s\S]*?)\n---\n/)?.[1] ?? "";
  assert.match(frontmatter, /^disable-model-invocation:\s*true$/m);
});

test("both plugin packages are self-contained and side-effect free", async () => {
  const report = await validatePackages();
  assert.deepEqual(report.errors, []);
  assert.equal(report.ok, true);
  for (const packageDigest of Object.values(report.package_digests)) {
    assert.match(packageDigest, /^sha256:[0-9a-f]{64}$/);
  }
});

test("generated semantic references match canonical sources in both hosts", async () => {
  const report = await checkGeneratedResources();
  assert.deepEqual(report.mismatches, []);
  assert.equal(report.ok, true);
});
