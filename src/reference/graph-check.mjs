function adjacency(graph) {
  const outgoing = new Map(graph.nodes.map((node) => [node, []]));
  const incoming = new Map(graph.nodes.map((node) => [node, []]));
  for (const edge of graph.edges) {
    outgoing.get(edge.from)?.push(edge);
    incoming.get(edge.to)?.push(edge);
  }
  return { outgoing, incoming };
}

function reachable(start, outgoing) {
  const seen = new Set();
  const stack = [start];
  while (stack.length) {
    const node = stack.pop();
    if (seen.has(node)) continue;
    seen.add(node);
    for (const edge of outgoing.get(node) ?? []) stack.push(edge.to);
  }
  return seen;
}

function reverseReachable(starts, incoming) {
  const seen = new Set();
  const stack = [...starts];
  while (stack.length) {
    const node = stack.pop();
    if (seen.has(node)) continue;
    seen.add(node);
    for (const edge of incoming.get(node) ?? []) stack.push(edge.from);
  }
  return seen;
}

function stronglyConnectedComponents(nodes, outgoing) {
  let index = 0;
  const indices = new Map();
  const low = new Map();
  const stack = [];
  const onStack = new Set();
  const components = [];

  function visit(node) {
    indices.set(node, index);
    low.set(node, index);
    index += 1;
    stack.push(node);
    onStack.add(node);

    for (const edge of outgoing.get(node) ?? []) {
      const target = edge.to;
      if (!indices.has(target)) {
        visit(target);
        low.set(node, Math.min(low.get(node), low.get(target)));
      } else if (onStack.has(target)) {
        low.set(node, Math.min(low.get(node), indices.get(target)));
      }
    }

    if (low.get(node) === indices.get(node)) {
      const component = [];
      let current;
      do {
        current = stack.pop();
        onStack.delete(current);
        component.push(current);
      } while (current !== node);
      components.push(component.sort());
    }
  }

  for (const node of nodes) if (!indices.has(node)) visit(node);
  return components;
}

export function checkGuardPrecedence(precedence) {
  const errors = [];
  const priorities = precedence.guards.map((guard) => guard.priority);
  const ids = precedence.guards.map((guard) => guard.id);
  if (new Set(priorities).size !== priorities.length) errors.push("DUPLICATE_PRIORITY");
  if (new Set(ids).size !== ids.length) errors.push("DUPLICATE_GUARD_ID");
  if (!priorities.every((priority, index) => priority === index)) {
    errors.push("NON_CONTIGUOUS_PRIORITY");
  }
  return { ok: errors.length === 0, errors };
}

export function checkControlGraph(graph, precedence) {
  const errors = [];
  const nodeSet = new Set(graph.nodes);
  const terminalSet = new Set(graph.terminal_nodes);
  const edgeIds = new Set();

  if (!nodeSet.has(graph.start)) errors.push("START_NOT_DECLARED");
  if (nodeSet.size !== graph.nodes.length) errors.push("DUPLICATE_NODE");
  for (const terminal of terminalSet) {
    if (!nodeSet.has(terminal)) errors.push(`UNKNOWN_TERMINAL:${terminal}`);
  }
  for (const edge of graph.edges) {
    if (edgeIds.has(edge.id)) errors.push(`DUPLICATE_EDGE:${edge.id}`);
    edgeIds.add(edge.id);
    if (!nodeSet.has(edge.from)) errors.push(`UNKNOWN_FROM:${edge.id}`);
    if (!nodeSet.has(edge.to)) errors.push(`UNKNOWN_TO:${edge.id}`);
  }

  const { outgoing, incoming } = adjacency(graph);
  const fromStart = reachable(graph.start, outgoing);
  for (const node of graph.nodes) {
    if (!fromStart.has(node)) errors.push(`UNREACHABLE:${node}`);
  }
  const toTerminal = reverseReachable(graph.terminal_nodes, incoming);
  for (const node of graph.nodes) {
    if (!toTerminal.has(node)) errors.push(`NO_TERMINAL_PATH:${node}`);
  }
  for (const terminal of terminalSet) {
    if ((outgoing.get(terminal) ?? []).length > 0) {
      errors.push(`TERMINAL_NOT_ABSORBING:${terminal}`);
    }
  }

  const authorizers = new Set(graph.handoff_authorizers);
  const handoffIncoming = incoming.get("HANDOFF_READY") ?? [];
  if (handoffIncoming.length !== authorizers.size) {
    errors.push("HANDOFF_AUTHORIZER_CARDINALITY");
  }
  for (const edge of handoffIncoming) {
    if (!authorizers.has(edge.from)) errors.push(`ILLEGAL_HANDOFF_SOURCE:${edge.from}`);
  }
  for (const authorizer of authorizers) {
    if (!handoffIncoming.some((edge) => edge.from === authorizer)) {
      errors.push(`MISSING_HANDOFF_AUTHORIZER:${authorizer}`);
    }
  }
  const planIncoming = incoming.get("OBSERVE_NATIVE_PLAN") ?? [];
  if (
    planIncoming.length !== 1 ||
    planIncoming[0].from !== "HANDOFF_READY"
  ) {
    errors.push("HANDOFF_DOES_NOT_DOMINATE_PLAN_OBSERVATION");
  }

  const sccs = stronglyConnectedComponents(graph.nodes, outgoing);
  for (const component of sccs) {
    const componentSet = new Set(component);
    const selfLoop =
      component.length === 1 &&
      (outgoing.get(component[0]) ?? []).some((edge) => edge.to === component[0]);
    if (component.length === 1 && !selfLoop) continue;
    const hasExit = component.some((node) =>
      (outgoing.get(node) ?? []).some((edge) => !componentSet.has(edge.to)),
    );
    if (!hasExit && !component.some((node) => terminalSet.has(node))) {
      errors.push(`SCC_WITHOUT_EXIT:${component.join(",")}`);
    }
  }

  const guardReport = checkGuardPrecedence(precedence);
  errors.push(...guardReport.errors.map((error) => `GUARD:${error}`));
  return {
    ok: errors.length === 0,
    errors,
    reachable_count: fromStart.size,
    node_count: graph.nodes.length,
    edge_count: graph.edges.length,
    sccs,
  };
}
