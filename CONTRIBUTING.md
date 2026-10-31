# Contributing to ACA

Contribute a clearer connection method, a reusable helper, a reproducible integration report, or a failure that exposes a gap in the workflow.

Keep public documentation, issues, examples, and code comments in English.

For a connection report, include the target and environment versions, requested capability, chosen route, actual test result, and recovery behavior. Label simulations and untested ideas explicitly. Remove personal account identifiers, credentials, pairing codes, private media, and conversation history.

Prefer small changes that work with the user's existing agent. Explain new dependencies and preserve third-party licenses and attribution. Do not copy connector or reverse-engineering tool code without checking its license.

Use an issue to describe a problem or a pull request to propose a concrete change. For changes to the skill, schema, or helpers, run:

```sh
npm ci --ignore-scripts
npm run check
npm test
```

Tests use temporary workspaces and artificial connection data. They do not contact user platforms or devices. Add regression cases for meaningful failures and distinguish schema checks, host discovery, model behavior, and real-target acceptance. Never present an upstream project's test count as ACA evidence.

Keep the installed skill self-contained. The canonical schema and template live inside `skills/aca-connect`; `templates/connection.json` is a checked convenience copy. A breaking record-format change needs a new explicit version and migration notes.
