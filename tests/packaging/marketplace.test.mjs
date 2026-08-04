import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { validateManifests } from "../../tools/validate-manifests.mjs";

// Codex 0.146.0 looks for a marketplace catalogue at four paths, and this
// repository carries two of them: its own `.agents/plugins/marketplace.json`
// and the Claude one. So "which package is offered to which host" is a real
// question with a wrong answer available — listing the Claude package in a
// catalogue Codex reads hands its loader a directory with no
// `.codex-plugin/plugin.json`, and the user sees that error rather than a
// plugin. A disposable-`CODEX_HOME` probe on 2026-08-04 established the
// resolution rules; these assertions are what keep them true.

async function read(relative) {
  return readFile(new URL(relative, import.meta.url), "utf8");
}

async function json(relative) {
  return JSON.parse(await read(relative));
}

const HOSTS = [
  {
    host: "codex",
    catalogue: "../../.agents/plugins/marketplace.json",
    source: "./plugins/codex-thyquery",
    manifest: "../../plugins/codex-thyquery/.codex-plugin/plugin.json",
    entry: "codex-thyquery",
    foreign: "./plugins/claude-thyquery",
  },
  {
    host: "claude",
    catalogue: "../../.claude-plugin/marketplace.json",
    source: "./plugins/claude-thyquery",
    manifest: "../../plugins/claude-thyquery/.claude-plugin/plugin.json",
    entry: "thyquery",
    foreign: "./plugins/codex-thyquery",
  },
];

test("each host catalogue is named, owned, and lists exactly its own package", async () => {
  for (const host of HOSTS) {
    const catalogue = await json(host.catalogue);
    assert.equal(catalogue.name, "thyquery", `${host.host}: marketplace name`);
    assert.ok(catalogue.owner?.name, `${host.host}: owner.name`);
    assert.equal(catalogue.plugins.length, 1, `${host.host}: one package per catalogue`);
    assert.equal(catalogue.plugins[0].source, host.source, `${host.host}: source`);
    assert.ok(catalogue.plugins[0].description, `${host.host}: description`);
  }
});

test("the catalogue entry name matches the package manifest the loader requires", async () => {
  // The loader keys an install on `<entry>@<marketplace>`: the probe installed
  // `codex-thyquery@thyquery`, where the left half came from the package
  // manifest and the right half from the catalogue. A mismatch between the two
  // halves is unresolvable from the user's side.
  for (const host of HOSTS) {
    const catalogue = await json(host.catalogue);
    const manifest = await json(host.manifest);
    assert.equal(catalogue.plugins[0].name, host.entry, `${host.host}: catalogue entry`);
    assert.equal(manifest.name, host.entry, `${host.host}: package manifest name`);
  }
});

test("neither catalogue offers the other host's package", async () => {
  for (const host of HOSTS) {
    const catalogue = await json(host.catalogue);
    const sources = catalogue.plugins.map((plugin) => plugin.source);
    assert.ok(
      !sources.includes(host.foreign),
      `${host.host}: catalogue must not list ${host.foreign}`,
    );
  }
});

test("both packages ship one version, because one spec generates them", async () => {
  const codex = await json("../../plugins/codex-thyquery/.codex-plugin/plugin.json");
  const claude = await json("../../plugins/claude-thyquery/.claude-plugin/plugin.json");
  const workspace = await json("../../package.json");
  assert.equal(codex.version, claude.version);
  assert.equal(codex.version, workspace.version);
});

test("the manifest validator accepts both catalogues as they stand", async () => {
  const report = await validateManifests();
  assert.deepEqual(report.errors, []);
  assert.equal(report.ok, true);
});
