import test from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";

const ROOT = new URL("../../", import.meta.url);

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if ([".claude", ".claude-plugin", ".planning", ".remember"].includes(entry.name)) continue;
    const target = new URL(`${entry.name}${entry.isDirectory() ? "/" : ""}`, directory);
    if (entry.isDirectory()) files.push(...(await walk(target)));
    else files.push(target);
  }
  return files;
}

test("workspace top-level paths stay inside the approved allowlist", async () => {
  const names = (await readdir(ROOT)).sort();
  // Project-owned paths are the product surface and must always be present.
  const required = [
    ".agents",
    ".claude-plugin",
    ".planning",
    ".gitignore",
    "AGENTS.md",
    "CHANGELOG.md",
    "LICENSE",
    "README.md",
    "docs",
    "package.json",
    "plugins",
    "spec",
    "src",
    "tests",
    "tools",
  ].sort();
  // Host-owned paths are created by the surrounding tooling, not by this
  // project, so they are tolerated but never required: a checkout without them
  // must still pass, and this guard must fail on product footprint only.
  // `.git` belongs here for the same reason — it is version-control metadata,
  // not product surface, and a released checkout carries it while an extracted
  // archive does not. `.DS_Store` is the same category one step further out:
  // the Finder writes it into any directory a user opens, so its presence says
  // something about the machine and nothing about the product.
  const hostOwned = [".claude", ".DS_Store", ".git", ".remember"];

  assert.deepEqual(
    names.filter((name) => !hostOwned.includes(name)),
    required,
  );
  for (const name of names) {
    assert.ok(required.includes(name) || hostOwned.includes(name), name);
  }
  assert.ok(!names.includes("node_modules"));
  assert.ok(!names.includes("package-lock.json"));
});

test("workspace implementation has no external dependency or network client", async () => {
  const packageJson = JSON.parse(await readFile(new URL("../../package.json", import.meta.url), "utf8"));
  assert.equal(packageJson.dependencies, undefined);
  assert.equal(packageJson.devDependencies, undefined);
  const files = await walk(ROOT);
  const sourceFiles = files.filter(
    (file) =>
      /\.(?:mjs|js)$/.test(file.pathname) &&
      /\/(?:src|tools)\//.test(file.pathname),
  );
  for (const file of sourceFiles) {
    const contents = await readFile(file, "utf8");
    assert.doesNotMatch(
      contents,
      /node:(?:http|https|net|tls|dns)|\bfetch\s*\(|https?:\/\//,
      file.pathname,
    );
  }
});

test("plugin packages contain no runtime JavaScript or hooks", async () => {
  const pluginFiles = await walk(new URL("../../plugins/", import.meta.url));
  assert.ok(pluginFiles.every((file) => !/\.(?:mjs|js|cjs)$/.test(file.pathname)));
  for (const relative of [
    "../../plugins/codex-thyquery/.codex-plugin/plugin.json",
    "../../plugins/claude-thyquery/.claude-plugin/plugin.json",
  ]) {
    const manifest = JSON.parse(await readFile(new URL(relative, import.meta.url), "utf8"));
    assert.equal(manifest.hooks, undefined);
  }
});
