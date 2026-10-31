# Roadmap

## Available

- One self-contained Connect workflow in [SKILL.md](SKILL.md), readable directly by an AI or loadable as a skill.
- English introduction, contribution guidance, and [evaluation scenarios](examples/scenarios.md).
- No required runtime, model, host installer, programming language, or connection-record schema.

The [design direction](DESIGN.md) keeps these choices explicit. The [first case report](examples/2026-10-31-first-connection-case.md) records a real public API read and process reuse, a separate synthetic recovery exercise, and physical acceptance deferred because the device environment was unavailable. It is not an independent-agent or cross-model evaluation.

## Next: demonstrate the method

1. Give an agent a real network or device goal without a hidden, prewritten target adapter. Observe how it discovers and establishes a route.
2. Ask it to reuse the result after an interruption. Retain the successful method and the failures that explain its limits.
3. Repeat with different tool-enabled agents and targets. Within each environment, compare with and without ACA while keeping the model, tools, permissions, and task conditions the same.
4. Improve the workflow from those results. Add reusable code only when real cases reveal a recurring need that existing tools do not already meet.

Success means easier, working connections—not the number of bundled adapters, supported installation directories, or framework tests. Case reports must distinguish plans, simulated checks, and real outcomes. No universal compatibility result has been established.
