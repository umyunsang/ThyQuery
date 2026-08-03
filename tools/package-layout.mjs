// The skill directory name is not decoration: Claude Code derives the
// invocation from it, so `skills/start` is what makes `/thyquery:start` the
// command. The two packages stopped agreeing on that name when Claude's
// invocation was renamed, because Codex reaches its skill through its own
// `$thyquery` grammar and renaming its directory would silently rename an
// invocation nobody has ever run.
//
// Every tool that walks a package needs the name, and the package validator
// checks required files by exact path, so a hardcoded "skills/thyquery" in one
// of them fails as "missing file" rather than as "wrong directory". The name is
// declared once here so the divergence has a single source.
export const SKILL_DIR = {
  "plugins/codex-thyquery": "thyquery",
  "plugins/claude-thyquery": "start",
};

export const PACKAGES = Object.keys(SKILL_DIR);

/** Path to a file inside a package's skill directory, relative to the package root. */
export function skillPath(packagePath, ...segments) {
  return ["skills", SKILL_DIR[packagePath], ...segments].join("/");
}
