import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

// The CAL_OK correction reached the closure policy, the generator template, and
// both skills, but not the onboarding document — and nothing checked, so a
// reader was left expecting an outcome the release cannot produce. These
// assertions bind the two documents so the next such correction cannot drift
// out of one of them.
//
// The binding follows the promise rather than the file. It sat on the README
// while the README explained outcomes; the README now sends readers to
// getting-started.md for that, so the guard moved with the explanation. A
// reader can only be misled by the document that names the outcomes, and this
// asserts against whichever one that is.

async function read(relative) {
  return readFile(new URL(relative, import.meta.url), "utf8");
}

test("onboarding and the closure policy agree that v1 cannot reach resolved closure", async () => {
  const policy = await read("../../spec/policies/closure-policy.v1.md");
  const onboarding = await read("../../docs/getting-started.md");
  const readme = await read("../../README.md");

  // Guard the premise: if the policy ever stops saying this, the onboarding
  // assertions below become wrong rather than merely unnecessary.
  assert.match(policy, /No such calibration exists in v1/u);
  assert.match(policy, /`CAL_OK` is false for every stratum in v1/u);

  assert.match(onboarding, /no calibration/iu, "onboarding must state that no calibration ships");
  assert.match(
    onboarding,
    /`EPISTEMIC_CLOSED` is unreachable/u,
    "onboarding must state that resolved closure is unreachable in v1",
  );
  assert.match(
    onboarding,
    /`ACCEPTED_RESIDUAL`[^\n]*only reachable success outcome/u,
    "onboarding must name the residual path as the only reachable success",
  );

  // The README may stay silent about outcomes, but it must not send readers
  // somewhere else for them: the promise and its correction have to stay one
  // click apart.
  assert.match(
    readme,
    /\]\(docs\/getting-started\.md\)/u,
    "README must link the document that carries the outcome statements",
  );
});

const HOSTS = [
  ["claude-thyquery", "start"],
  ["codex-thyquery", "thyquery"],
];

test("both outcome-copy files unpin output language instead of fixing one", async () => {
  for (const [host, skillDir] of HOSTS) {
    const copy = await read(`../../plugins/${host}/skills/${skillDir}/references/copy.md`);
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

// Both skills promise that every invocation ends with one typed outcome "with
// its reference copy", and for two outcomes that copy did not exist: `BLOCKED`
// and `HOST_CAPABILITY_CONTRADICTION` were named as emittable and defined
// nowhere, so reaching either left the model to improvise a terminal the user
// would read as authoritative. The list is the non-success set from
// spec/product-contract.md, which is what makes this check track the spec
// rather than the two outcomes that happened to be missing.
test("every non-success outcome a skill can emit has copy to emit it with", async () => {
  const nonSuccessOutcomes = [
    "PLAN_MODE_REQUIRED",
    "CANCELLED",
    "BLOCKED",
    "STALLED",
    "RESOURCE_EXHAUSTED",
    "STATE_CORRUPT",
    "HOST_CAPABILITY_CONTRADICTION",
    "HANDOFF_OUTCOME_UNKNOWN",
  ];

  for (const [host, skillDir] of HOSTS) {
    const copy = await read(`../../plugins/${host}/skills/${skillDir}/references/copy.md`);
    for (const outcome of nonSuccessOutcomes) {
      assert.ok(
        copy.includes(`## \`${outcome}\``),
        `${host} copy must define the non-success outcome ${outcome}`,
      );
    }

    // The outcomes a user actually meets carry both renderings. Asserting on the
    // section rather than the file stops a rendering elsewhere from covering for
    // one that is missing here.
    for (const outcome of ["BLOCKED", "HOST_CAPABILITY_CONTRADICTION"]) {
      const marker = `## \`${outcome}\``;
      const remainder = copy.slice(copy.indexOf(marker));
      const nextHeading = remainder.indexOf("\n## ", marker.length);
      const section = nextHeading === -1 ? remainder : remainder.slice(0, nextHeading);
      assert.match(section, /- Korean: `[^\n]+`/u, `${host} ${outcome} needs Korean copy`);
      assert.match(section, /- English: `[^\n]+`/u, `${host} ${outcome} needs English copy`);
    }
  }
});

// The v0.2.0 rename moved the skill directory to `start` and changed the command
// to `/thyquery:start`, but the adapter kept the sentence explaining the old
// command — so a file the skill loads as policy asserted the very condition the
// rename removed. Binding the claim to the frontmatter it describes is what
// makes the next rename fail here instead of shipping.
test("the Claude adapter derives the invocation from what actually names it", async () => {
  const skill = await read("../../plugins/claude-thyquery/skills/start/SKILL.md");
  const adapter = await read(
    "../../plugins/claude-thyquery/skills/start/references/claude-adapter.md",
  );
  assert.match(skill, /^name: start$/mu);
  assert.match(
    adapter,
    /plugin namespace \(`thyquery`\) and the skill directory name \(`start`\)/u,
  );
  assert.doesNotMatch(adapter, /both plugin namespace and skill name are `thyquery`/u);
});
