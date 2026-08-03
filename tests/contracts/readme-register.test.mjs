import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

// The README kept acquiring content written for other readers. Outcome tokens
// and `disable-model-invocation` are vocabulary for the model; sentences lifted
// out of SKILL.md are instructions constraining it; "Make the onboarding flow
// better" is the live-validation probe query. Each was removed when someone
// noticed it, which meant the next one shipped and waited to be noticed too.
// These assertions fail on the category instead.

async function read(relative) {
  return readFile(new URL(relative, import.meta.url), "utf8");
}

/** Prose only: code blocks, HTML, and link targets legitimately carry identifiers. */
function prose(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/gu, " ")
    .replace(/<[^>]+>/gu, " ")
    .replace(/\]\([^)]+\)/gu, "] ");
}

function shingles(text, size) {
  const words = text.toLowerCase().match(/[a-z']+/gu) ?? [];
  const out = new Set();
  for (let i = 0; i + size <= words.length; i += 1) {
    out.add(words.slice(i, i + size).join(" "));
  }
  return out;
}

test("the README carries no machine vocabulary", async () => {
  const readme = prose(await read("../../README.md"));

  // Outcome names, status codes, and policy flags are all SCREAMING_SNAKE_CASE,
  // so the shape is a reliable proxy for "written for the model, not the reader".
  const machineToken = readme.match(/\b[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)+\b/u);
  assert.equal(machineToken, null, `README prose contains a machine token: ${machineToken?.[0]}`);

  for (const term of ["disable-model-invocation", "macrostep", "guard ladder", "contract delta"]) {
    assert.ok(!readme.toLowerCase().includes(term), `README prose contains internal term: ${term}`);
  }
});

test("the README does not reuse the live-validation probe query", async () => {
  const readme = (await read("../../README.md")).toLowerCase();
  // Reusing it presents an internal test input as if it were a user's request,
  // and quietly ties the public example to whatever the fixtures happen to say.
  assert.ok(
    !readme.includes("make the onboarding flow better"),
    "README reuses the live-validation probe query as its example",
  );
});

test("the README is not written out of the skill instructions", async () => {
  const readme = shingles(prose(await read("../../README.md")), 6);
  for (const source of [
    "../../plugins/claude-thyquery/skills/start/SKILL.md",
    "../../plugins/claude-thyquery/skills/start/references/copy.md",
  ]) {
    const borrowed = [...shingles(prose(await read(source)), 6)].filter((run) => readme.has(run));
    assert.deepEqual(borrowed, [], `README repeats ${source.split("/").pop()} verbatim: ${borrowed[0]}`);
  }
});
