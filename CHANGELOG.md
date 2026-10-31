# Changelog

## Public social read case - 2026-10-31

- Record Bluesky public identity/profile/feed discovery, pagination reuse, and recovery using preserved valid state after an invalid cursor.
- Six recorded runs: three successful reads and three reported failures. No authenticated social writes, device probes, new core dependencies, or changes to SKILL.md.

## Design and first case - 2026-10-31

- Record the method-first design direction and explicit non-goals in DESIGN.md.
- Publish a maintainer-led public API read/reuse case, a separately labeled local recovery exercise, and an unresolved read-only device probe. No model-comparison or universal-compatibility claim.
- Keep experimental integration clients outside the ACA product; the workflow is unchanged.

## 0.2.0 - 2026-10-31

- Center ACA on a single self-contained SKILL.md that an AI can read directly or load through its own skill mechanism.
- Let the user's AI choose integration tools, implementation, and local record format.
- Remove the host-specific installer and UI metadata, mandatory JSON record contract and templates, npm dependencies, and their dedicated scripts, tests, and CI workflow.
- Replace installation-led onboarding with a direct request to the user's AI; focus the roadmap on real connection and reuse cases.
- The 0.1.0 implementation and checks remain in Git history; its test results are not validation of the revised workflow or universal compatibility.

## 0.1.0 - 2026-10-31

- Add the self-contained `aca-connect` skill and project-local copy helper for Codex and Claude Code layouts.
- Define connection-record schema `1.0.0`, replacing the initial unvalidated `0.1` template.
- Add Ajv-based record checks, per-capability evidence/context binding, and artificial positive/negative examples.
- Add package checks and isolated installation/validation tests, plus Windows/Linux CI configuration.
- Keep target integration with the user's existing agent and tools. This version does not ship a universal runtime or establish real platform/device compatibility.
