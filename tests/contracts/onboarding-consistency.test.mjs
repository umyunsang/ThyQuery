import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

// The CAL_OK correction reached the closure policy, the generator template, and
// both skills, but not the README — and nothing checked, so a reader was left
// expecting an outcome the release cannot produce. These assertions bind the
// two documents so the next such correction cannot drift out of one of them.

async function read(relative) {
  return readFile(new URL(relative, import.meta.url), "utf8");
}

test("the README and the closure policy agree that v1 cannot reach resolved closure", async () => {
  const policy = await read("../../spec/policies/closure-policy.v1.md");
  const readme = await read("../../README.md");

  // Guard the premise: if the policy ever stops saying this, the README
  // assertions below become wrong rather than merely unnecessary.
  assert.match(policy, /No such calibration exists in v1/u);
  assert.match(policy, /`CAL_OK` is false for every stratum in v1/u);

  assert.match(readme, /no calibration/iu, "README must state that no calibration ships");
  assert.match(
    readme,
    /`EPISTEMIC_CLOSED` is unreachable/u,
    "README must state that resolved closure is unreachable in v1",
  );
  assert.match(
    readme,
    /`ACCEPTED_RESIDUAL`[^\n]*only reachable success outcome/u,
    "README must name the residual path as the only reachable success",
  );
});

test("both outcome-copy files unpin output language instead of fixing one", async () => {
  for (const host of ["claude-thyquery", "codex-thyquery"]) {
    const copy = await read(`../../plugins/${host}/skills/thyquery/references/copy.md`);
    assert.match(
      copy,
      /output language follows the user's query language/iu,
      `${host} copy must state the language rule`,
    );
    assert.match(
      copy,
      /an explicit language request from the user overrides/iu,
      `${host} copy must let an explicit request override`,
    );
    // A single hardcoded rendering is the defect this repair removed: the file
    // instructed "keep host wording natural" and then pinned Korean literals.
    assert.match(copy, /English/u, `${host} copy must carry an English reference rendering`);
    assert.match(copy, /[가-힣]/u, `${host} copy must keep the Korean reference rendering`);
  }
});
