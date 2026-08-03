import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { digest } from "../src/reference/canonicalize.mjs";
import {
  createInitialState,
  makeEvent,
  reduceEvent,
} from "../src/reference/reducer.mjs";
import { replayEvents } from "../src/reference/replay.mjs";
import { routeNext } from "../src/reference/router.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function replaceTokens(value, state) {
  if (Array.isArray(value)) return value.map((item) => replaceTokens(item, state));
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, replaceTokens(item, state)]),
    );
  }
  if (value === "$CURRENT_CONTRACT_DIGEST") return state.contract.digest;
  if (value === "$HANDOFF_KEY") {
    return digest({
      invocation_id: state.invocation.invocation_id,
      contract_digest: state.contract.digest,
    });
  }
  if (value === "$RESIDUAL_LEDGER_DIGEST") {
    throw new Error("Use residual_ledger_digest_from_residuals in fixture options");
  }
  return value;
}

export async function replayFixture(fixture) {
  const initial = createInitialState(fixture.initial);
  let constructionState = initial;
  const events = [];
  for (const step of fixture.events ?? []) {
    const payload = replaceTokens(step.payload ?? {}, constructionState);
    if (step.residual_ledger_digest_from_residuals) {
      payload.residual_ledger_digest = digest(payload.residuals);
    }
    const event = makeEvent(
      constructionState,
      step.event_type,
      payload,
      step.options ?? {},
    );
    events.push(event);
    constructionState = reduceEvent(constructionState, event);
  }

  const replay = replayEvents(initial, events);
  const route = routeNext(replay.state);
  const routedState = route.state;
  const expected = fixture.expected ?? {};
  if (expected.next !== undefined && route.next !== expected.next) {
    throw new Error(`${fixture.name}: expected route ${expected.next}, got ${route.next}`);
  }
  if (
    expected.terminal_state !== undefined &&
    routedState.integrity.terminal !== expected.terminal_state
  ) {
    throw new Error(
      `${fixture.name}: expected terminal ${expected.terminal_state}, got ${routedState.integrity.terminal}`,
    );
  }
  if (
    expected.transition_remaining !== undefined &&
    replay.state.budgets.transition_remaining !== expected.transition_remaining
  ) {
    throw new Error(
      `${fixture.name}: expected budget ${expected.transition_remaining}, got ${replay.state.budgets.transition_remaining}`,
    );
  }
  if (
    expected.native_plan_count !== undefined &&
    replay.state.handoff.plan_count !== expected.native_plan_count
  ) {
    throw new Error(
      `${fixture.name}: expected ${expected.native_plan_count} plans, got ${replay.state.handoff.plan_count}`,
    );
  }
  if (replay.effects.length !== 0) throw new Error(`${fixture.name}: replay emitted effects`);
  return { name: fixture.name, route, state: routedState };
}

async function main() {
  const input = process.argv[2] ?? "tests/fixtures/core";
  const directory = path.resolve(ROOT, input);
  const names = (await readdir(directory))
    .filter((name) => name.endsWith(".json"))
    .sort();
  if (names.length === 0) throw new Error(`No JSON fixtures in ${input}`);

  let replayed = 0;
  for (const name of names) {
    const fixture = JSON.parse(await readFile(path.join(directory, name), "utf8"));
    if (!fixture.initial) continue;
    const result = await replayFixture(fixture);
    process.stdout.write(`PASS ${name} -> ${result.route.next}\n`);
    replayed += 1;
  }
  if (replayed === 0) throw new Error(`No replayable fixtures in ${input}`);
  process.stdout.write(`${replayed} deterministic fixtures passed\n`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await main();
}
