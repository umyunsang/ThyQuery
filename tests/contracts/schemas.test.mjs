import test from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";

import { digest } from "../../src/reference/canonicalize.mjs";
import {
  createInitialState,
  makeEvent,
} from "../../src/reference/reducer.mjs";

const SCHEMA_DIRECTORY = new URL("../../spec/schemas/", import.meta.url);

async function loadSchemas() {
  const schemas = new Map();
  for (const name of (await readdir(SCHEMA_DIRECTORY)).filter((item) => item.endsWith(".json"))) {
    schemas.set(name, JSON.parse(await readFile(new URL(name, SCHEMA_DIRECTORY), "utf8")));
  }
  return schemas;
}

function typeMatches(value, type) {
  if (type === "null") return value === null;
  if (type === "array") return Array.isArray(value);
  if (type === "object") return value !== null && typeof value === "object" && !Array.isArray(value);
  if (type === "integer") return Number.isSafeInteger(value);
  return typeof value === type;
}

function validate(value, schema, schemas, path = "$") {
  if (schema.$ref) {
    const referenced = schemas.get(schema.$ref);
    if (!referenced) return [`${path}: unresolved $ref ${schema.$ref}`];
    return validate(value, referenced, schemas, path);
  }

  const errors = [];
  if (schema.const !== undefined && value !== schema.const) {
    errors.push(`${path}: expected constant ${schema.const}`);
    return errors;
  }
  if (schema.enum && !schema.enum.includes(value)) {
    errors.push(`${path}: value not in enum`);
    return errors;
  }
  if (schema.type) {
    const types = Array.isArray(schema.type) ? schema.type : [schema.type];
    if (!types.some((type) => typeMatches(value, type))) {
      errors.push(`${path}: expected ${types.join("|")}`);
      return errors;
    }
  }

  if (typeof value === "string") {
    if (schema.minLength !== undefined && value.length < schema.minLength) {
      errors.push(`${path}: string too short`);
    }
    if (schema.pattern && !new RegExp(schema.pattern).test(value)) {
      errors.push(`${path}: pattern mismatch`);
    }
  }
  if (typeof value === "number") {
    if (schema.minimum !== undefined && value < schema.minimum) errors.push(`${path}: below minimum`);
    if (schema.maximum !== undefined && value > schema.maximum) errors.push(`${path}: above maximum`);
  }
  if (Array.isArray(value)) {
    if (schema.uniqueItems) {
      const normalized = value.map((item) => JSON.stringify(item));
      if (new Set(normalized).size !== normalized.length) errors.push(`${path}: duplicate items`);
    }
    if (schema.items) {
      value.forEach((item, index) => {
        errors.push(...validate(item, schema.items, schemas, `${path}[${index}]`));
      });
    }
  }
  if (value && typeof value === "object" && !Array.isArray(value)) {
    for (const required of schema.required ?? []) {
      if (!(required in value)) errors.push(`${path}.${required}: required`);
    }
    for (const [key, item] of Object.entries(value)) {
      if (schema.properties?.[key]) {
        errors.push(...validate(item, schema.properties[key], schemas, `${path}.${key}`));
      } else if (schema.additionalProperties === false) {
        errors.push(`${path}.${key}: additional property`);
      }
    }
  }
  return errors;
}

test("all canonical schemas parse and declare draft 2020-12 identifiers", async () => {
  const schemas = await loadSchemas();
  assert.equal(schemas.size, 6);
  for (const [name, schema] of schemas) {
    assert.equal(schema.$schema, "https://json-schema.org/draft/2020-12/schema", name);
    assert.match(schema.$id, /^https:\/\/thyquery\.local\//, name);
    assert.equal(schema.type, "object", name);
  }
});

test("reference state and event satisfy the canonical structural schemas", async () => {
  const schemas = await loadSchemas();
  const state = createInitialState({
    invocation_id: "schema-state",
    original_query: "Synthetic query",
    host: "codex",
    transition_budget: 2,
  });
  const event = makeEvent(state, "PLAN_PREFLIGHT_RECORDED", {
    verified: true,
    receipt: "synthetic",
  });
  assert.deepEqual(validate(state, schemas.get("canonical-state.schema.json"), schemas), []);
  assert.deepEqual(validate(event, schemas.get("event-envelope.schema.json"), schemas), []);

  const missing = structuredClone(event);
  delete missing.expected_state_hash;
  assert.ok(
    validate(missing, schemas.get("event-envelope.schema.json"), schemas).some((error) =>
      error.includes("expected_state_hash"),
    ),
  );
});

test("host, handoff, and terminal samples satisfy their contracts", async () => {
  const schemas = await loadSchemas();
  const host = {
    schema_version: "thyquery.host-capabilities.v1",
    host: "claude-code",
    version: "2.1.220",
    surface: "plugin-skill",
    canonical_invocation: "/thyquery:start <query>",
    plan_evidence: "REQUIRED",
    native_question: "AskUserQuestion",
    native_plan_observation: "stock Plan surface",
    static_validation: "PENDING",
    live_conformance: "CONFORMANCE_UNTESTED"
  };
  const handoff = {
    schema_version: "thyquery.handoff.v1",
    handoff_key: digest({ invocation_id: "i", contract_digest: "c" }),
    invocation_id: "i",
    contract_digest: digest({ contract: 1 }),
    authorization_kind: "EPISTEMIC_CLOSED",
    outcome: "INTENT_ONLY",
    receipt: null
  };
  const terminal = {
    schema_version: "thyquery.terminal-outcome.v1",
    kind: "RESOURCE_EXHAUSTED",
    authorizes_handoff: false,
    native_plan_count: 0,
    reason: "transition budget reached without closure"
  };
  assert.deepEqual(validate(host, schemas.get("host-capabilities.schema.json"), schemas), []);
  assert.deepEqual(validate(handoff, schemas.get("handoff.schema.json"), schemas), []);
  assert.deepEqual(validate(terminal, schemas.get("terminal-outcome.schema.json"), schemas), []);
});
