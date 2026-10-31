# Changelog

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
