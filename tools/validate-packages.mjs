import { lstat, readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { digest } from "../src/reference/canonicalize.mjs";
import { checkGeneratedResources } from "./render-plugin-resources.mjs";
import { validateManifests } from "./validate-manifests.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PACKAGES = ["plugins/codex-thyquery", "plugins/claude-thyquery"];
const ALLOWED_EXTENSIONS = new Set([".json", ".md", ".yaml"]);
const REQUIRED = {
  "plugins/codex-thyquery": [
    ".codex-plugin/plugin.json",
    "skills/thyquery/SKILL.md",
    "skills/thyquery/agents/openai.yaml",
    "skills/thyquery/references/protocol.generated.md",
    "skills/thyquery/references/graph.generated.md",
    "skills/thyquery/references/closure.generated.md",
    "skills/thyquery/references/codex-adapter.md",
    "skills/thyquery/references/copy.md",
  ],
  "plugins/claude-thyquery": [
    ".claude-plugin/plugin.json",
    "skills/thyquery/SKILL.md",
    "skills/thyquery/references/protocol.generated.md",
    "skills/thyquery/references/graph.generated.md",
    "skills/thyquery/references/closure.generated.md",
    "skills/thyquery/references/claude-adapter.md",
    "skills/thyquery/references/copy.md",
  ],
};

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(target)));
    else files.push(target);
  }
  return files;
}

export async function validatePackages() {
  const errors = [];
  const package_digests = {};
  const manifestReport = await validateManifests();
  errors.push(...manifestReport.errors);

  for (const packagePath of PACKAGES) {
    const packageRoot = path.join(ROOT, packagePath);
    const files = await walk(packageRoot);
    const relativeFiles = new Set(files.map((file) => path.relative(packageRoot, file)));
    for (const required of REQUIRED[packagePath]) {
      if (!relativeFiles.has(required)) errors.push(`${packagePath}: missing ${required}`);
    }
    for (const file of files) {
      const relative = path.relative(ROOT, file);
      const info = await lstat(file);
      if (info.isSymbolicLink()) errors.push(`${relative}: symlink forbidden`);
      if (!ALLOWED_EXTENSIONS.has(path.extname(file))) {
        errors.push(`${relative}: unsupported package file type`);
        continue;
      }
      if (info.size > 100_000) errors.push(`${relative}: unexpectedly large file`);
      const contents = await readFile(file, "utf8");
      if (/\/Users\/|[A-Za-z]:\\/.test(contents)) errors.push(`${relative}: absolute path leak`);
      if (/https?:\/\//.test(contents)) errors.push(`${relative}: remote endpoint in package`);
      if (/\b(?:sk|pk)_(?:live|test)_[A-Za-z0-9]+\b/.test(contents)) {
        errors.push(`${relative}: secret-like value`);
      }
    }
    const digestPayload = [];
    for (const file of [...files].sort()) {
      digestPayload.push({
        path: path.relative(packageRoot, file),
        contents: await readFile(file, "utf8"),
      });
    }
    package_digests[packagePath] = digest(digestPayload);
  }

  const codexManifest = JSON.parse(
    await readFile(
      path.join(ROOT, "plugins/codex-thyquery/.codex-plugin/plugin.json"),
      "utf8",
    ),
  );
  const claudeManifest = JSON.parse(
    await readFile(
      path.join(ROOT, "plugins/claude-thyquery/.claude-plugin/plugin.json"),
      "utf8",
    ),
  );
  if (codexManifest.hooks || claudeManifest.hooks) errors.push("ordinary-prompt hooks forbidden");

  const generated = await checkGeneratedResources();
  errors.push(...generated.mismatches.map((item) => `${item}: generated mismatch`));
  return { ok: errors.length === 0, errors, package_digests };
}

async function main() {
  const report = await validatePackages();
  if (!report.ok) {
    for (const error of report.errors) process.stderr.write(`ERROR ${error}\n`);
    process.exitCode = 1;
    return;
  }
  process.stdout.write("two self-contained instruction-only packages validate\n");
  for (const [packagePath, packageDigest] of Object.entries(report.package_digests)) {
    process.stdout.write(`${packagePath} ${packageDigest}\n`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await main();
