import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

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

  const codexSkill = await text("plugins/codex-thyquery/skills/thyquery/SKILL.md");
  const claudeSkill = await text("plugins/claude-thyquery/skills/thyquery/SKILL.md");
  for (const [label, contents] of [
    ["codex skill", codexSkill],
    ["claude skill", claudeSkill],
  ]) {
    const frontmatter = parseFrontmatter(contents);
    if (!frontmatter) errors.push(`${label}: frontmatter missing`);
    if (frontmatter?.name !== "thyquery") errors.push(`${label}: name must be thyquery`);
    if (!frontmatter?.description) errors.push(`${label}: description missing`);
    if (!/PLAN_MODE_REQUIRED/.test(contents)) errors.push(`${label}: Plan fail-closed missing`);
    if (!/COMPLETE_AFTER_PLAN/.test(contents)) errors.push(`${label}: absorbing completion missing`);
  }

  const claudeFrontmatter = parseFrontmatter(claudeSkill);
  if (claudeFrontmatter?.["disable-model-invocation"] !== "true") {
    errors.push("claude skill: disable-model-invocation must be true");
  }

  const openaiYaml = await text(
    "plugins/codex-thyquery/skills/thyquery/agents/openai.yaml",
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
