import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { SKILL_DIR, skillPath } from "./package-layout.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const STRICT_SEMVER = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z.-]+)?$/;

async function json(relativePath) {
  return JSON.parse(await readFile(path.join(ROOT, relativePath), "utf8"));
}

async function text(relativePath) {
  return readFile(path.join(ROOT, relativePath), "utf8");
}

function parseFrontmatter(contents) {
  const match = contents.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return null;
  return Object.fromEntries(
    match[1]
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const separator = line.indexOf(":");
        return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
      }),
  );
}

function requireFields(object, fields, prefix, errors) {
  for (const field of fields) {
    if (!(field in object) || object[field] === "") errors.push(`${prefix}: missing ${field}`);
  }
}

// Each host discovers its catalogue at its own path and will only load a
// package carrying its own manifest. Codex reads `.agents/plugins/` first but
// falls back to `.claude-plugin/marketplace.json`, so a package listed in the
// wrong catalogue is not merely untidy: it is offered to a loader that then
// fails with "missing .codex-plugin/plugin.json" in front of the user.
const MARKETPLACES = {
  ".agents/plugins/marketplace.json": {
    label: "codex marketplace",
    manifest: ".codex-plugin/plugin.json",
    foreignPackage: "plugins/claude-thyquery",
  },
  ".claude-plugin/marketplace.json": {
    label: "claude marketplace",
    manifest: ".claude-plugin/plugin.json",
    foreignPackage: "plugins/codex-thyquery",
  },
};

async function validateMarketplaces(errors) {
  for (const [catalogue, host] of Object.entries(MARKETPLACES)) {
    let marketplace;
    try {
      marketplace = await json(catalogue);
    } catch {
      errors.push(`${host.label}: ${catalogue} is missing or unreadable`);
      continue;
    }
    requireFields(marketplace, ["name"], host.label, errors);
    if (!marketplace.owner?.name) errors.push(`${host.label}: owner.name required`);
    if (!Array.isArray(marketplace.plugins) || marketplace.plugins.length === 0) {
      errors.push(`${host.label}: plugins must be a non-empty array`);
      continue;
    }

    for (const entry of marketplace.plugins ?? []) {
      requireFields(entry ?? {}, ["name", "source", "description"], `${host.label} entry`, errors);
      if (typeof entry?.source !== "string") {
        errors.push(`${host.label}: ${entry?.name} source must be a relative path string`);
        continue;
      }
      // The base is the marketplace root — the repository — not the directory
      // holding the manifest. Codex resolved `./plugins/codex-thyquery` to
      // `<repo>/plugins/codex-thyquery` when it materialized the package, even
      // though the manifest sits two levels down in `.agents/plugins/`.
      const packageRoot = path.resolve(ROOT, entry.source);
      if (packageRoot !== ROOT && !packageRoot.startsWith(ROOT + path.sep)) {
        errors.push(`${host.label}: ${entry.name} source escapes the repository`);
        continue;
      }
      if (packageRoot === path.join(ROOT, host.foreignPackage)) {
        errors.push(`${host.label}: must not list ${host.foreignPackage}`);
        continue;
      }
      let hosted;
      try {
        hosted = JSON.parse(await readFile(path.join(packageRoot, host.manifest), "utf8"));
      } catch {
        errors.push(`${host.label}: ${entry.name} source has no ${host.manifest}`);
        continue;
      }
      // The loader keys installs on this pair: the probe installed
      // `codex-thyquery@thyquery`, where the plugin half comes from the package
      // manifest and the marketplace half from the catalogue name.
      if (hosted.name !== entry.name) {
        errors.push(
          `${host.label}: entry ${entry.name} must match ${host.manifest} name ${hosted.name}`,
        );
      }
    }
  }
}

export async function validateManifests() {
  const errors = [];
  const codex = await json("plugins/codex-thyquery/.codex-plugin/plugin.json");
  const claude = await json("plugins/claude-thyquery/.claude-plugin/plugin.json");

  for (const [label, manifest] of [
    ["codex", codex],
    ["claude", claude],
  ]) {
    requireFields(manifest, ["name", "version", "description", "author"], label, errors);
    if (!STRICT_SEMVER.test(manifest.version ?? "")) errors.push(`${label}: invalid semver`);
    if (!manifest.author?.name) errors.push(`${label}: author.name required`);
    for (const forbidden of ["hooks", "mcpServers", "apps", "commands", "agents"]) {
      if (forbidden in manifest) errors.push(`${label}: forbidden manifest field ${forbidden}`);
    }
    if (/example\.com|localhost|127\.0\.0\.1/.test(JSON.stringify(manifest))) {
      errors.push(`${label}: placeholder or endpoint in manifest`);
    }
  }

  if (codex.name !== "codex-thyquery") errors.push("codex: name must match package folder");
  if (codex.skills !== "./skills/") errors.push("codex: skills path must be ./skills/");
  requireFields(
    codex.interface ?? {},
    [
      "displayName",
      "shortDescription",
      "longDescription",
      "developerName",
      "category",
      "capabilities",
      "defaultPrompt",
    ],
    "codex.interface",
    errors,
  );
  if (!codex.interface?.defaultPrompt?.some((prompt) => prompt.startsWith("$thyquery"))) {
    errors.push("codex: default prompt must start with $thyquery");
  }
  if (claude.name !== "thyquery") errors.push("claude: manifest namespace must be thyquery");
  if (codex.version !== claude.version) {
    errors.push("both packages are generated from one spec and must share a version");
  }

  await validateMarketplaces(errors);

  const codexSkill = await text(`plugins/codex-thyquery/${skillPath("plugins/codex-thyquery", "SKILL.md")}`);
  const claudeSkill = await text(`plugins/claude-thyquery/${skillPath("plugins/claude-thyquery", "SKILL.md")}`);
  // The skill name is the invocation. Claude Code builds `/thyquery:<name>`
  // from it, so this asserts the command each host actually publishes rather
  // than a shared constant the two packages no longer have.
  for (const [label, contents, expectedName] of [
    ["codex skill", codexSkill, SKILL_DIR["plugins/codex-thyquery"]],
    ["claude skill", claudeSkill, SKILL_DIR["plugins/claude-thyquery"]],
  ]) {
    const frontmatter = parseFrontmatter(contents);
    if (!frontmatter) errors.push(`${label}: frontmatter missing`);
    if (frontmatter?.name !== expectedName) {
      errors.push(`${label}: name must be ${expectedName}`);
    }
    if (!frontmatter?.description) errors.push(`${label}: description missing`);
    if (!/PLAN_MODE_REQUIRED/.test(contents)) errors.push(`${label}: Plan fail-closed missing`);
    if (!/COMPLETE_AFTER_PLAN/.test(contents)) errors.push(`${label}: absorbing completion missing`);
  }

  const claudeFrontmatter = parseFrontmatter(claudeSkill);
  if (claudeFrontmatter?.["disable-model-invocation"] !== "true") {
    errors.push("claude skill: disable-model-invocation must be true");
  }

  const openaiYaml = await text(
    `plugins/codex-thyquery/${skillPath("plugins/codex-thyquery", "agents/openai.yaml")}`,
  );
  if (!/default_prompt: "Use \$thyquery/.test(openaiYaml)) {
    errors.push("codex openai.yaml: default_prompt must mention $thyquery");
  }
  if (!/allow_implicit_invocation: false/.test(openaiYaml)) {
    errors.push("codex openai.yaml: implicit invocation must be false");
  }

  return { ok: errors.length === 0, errors };
}

async function main() {
  const report = await validateManifests();
  if (!report.ok) {
    for (const error of report.errors) process.stderr.write(`ERROR ${error}\n`);
    process.exitCode = 1;
    return;
  }
  process.stdout.write("manifest and skill entrypoint validation pass\n");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await main();
