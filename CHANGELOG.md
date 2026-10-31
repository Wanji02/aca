# Changelog

## 0.1.0 - 2026-10-31

- Add the self-contained `aca-connect` skill and project-local copy helper for Codex and Claude Code layouts.
- Define connection-record schema `1.0.0`, replacing the initial unvalidated `0.1` template.
- Add Ajv-based record checks, per-capability evidence/context binding, and artificial positive/negative examples.
- Add package checks and isolated installation/validation tests, plus Windows/Linux CI configuration.
- Keep target integration with the user's existing agent and tools. This version does not ship a universal runtime or establish real platform/device compatibility.
