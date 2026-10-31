# Roadmap

## Available

- One self-contained Connect workflow in [SKILL.md](SKILL.md), readable directly by an AI or loadable as a skill.
- English introduction, contribution guidance, and [evaluation scenarios](examples/scenarios.md).
- No required runtime, model, host installer, programming language, or connection-record schema.

The [design direction](DESIGN.md) keeps these choices explicit. The [first case report](examples/2026-10-31-first-connection-case.md) records a real public API read and process reuse, a separate synthetic recovery exercise, and physical acceptance deferred because the device environment was unavailable. It is not an independent-agent or cross-model evaluation.

The [Bluesky case](examples/2026-10-31-bluesky-public-feed.md) adds real public social-feed reads, cursor reuse across processes, identity mismatch handling, and recovery from an invalid cursor using preserved state. Authenticated social actions and comparative agent evaluations remain open.

## Next: demonstrate the method

The [generic browser case](examples/2026-10-31-playwright-browser.md) records actual Playwright MCP public-page navigation and network inspection, plus a separate synthetic publishing flow with attachment upload, layout changes, and browser reopening. Real authenticated publishing remains untested; the tool is optional and adds no ACA runtime dependency.

The [fresh-context handoff case](examples/2026-10-31-fresh-agent-handoff.md) records one agent discovering a public Hacker News connection and another reusing its saved method for fresh reads. Both used the same configured model and host; no without-ACA control or fault-recovery test was performed.

1. Give an agent a real network or device goal without a hidden, prewritten target adapter. Observe how it discovers and establishes a route.
2. Ask it to reuse the result after an interruption. Retain the successful method and the failures that explain its limits.
3. Repeat with different tool-enabled agents and targets. Within each environment, compare with and without ACA while keeping the model, tools, permissions, and task conditions the same.
4. Improve the workflow from those results. Add reusable code only when real cases reveal a recurring need that existing tools do not already meet.

Success means easier, working connections—not the number of bundled adapters, supported installation directories, or framework tests. Case reports must distinguish plans, simulated checks, and real outcomes. No universal compatibility result has been established.
