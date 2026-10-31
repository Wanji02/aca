<div align="center">

# ACA: AI Connecting Anything

### A workflow for connecting your AI to apps, social platforms, and smart devices.

**Connect your AI to anything online—from digital platforms to the physical world.**

[Get started](#get-started) · [Install the skill](docs/installation.md) · [The workflow](docs/connect-workflow.md) · [Contribute](CONTRIBUTING.md)

</div>

---

## Your AI. Your connections.

Tell your AI what you want to connect. ACA gives it a practical workflow to research the target, choose an integration route, build the connection, verify the result, and keep it working.

Keep your own agent, model, personality, and tools. Start with an app, a social platform, a smart device—or connect them together.

```text
Understand → Discover → Connect → Verify → Reuse → Maintain
```

## What can you ask for?

- “Connect my AI to the social platform I use.”
- “Let my AI see through my camera and speak through my speaker.”
- “Connect my lights so my AI can control them.”
- “Reuse this connection after I restart my computer.”

These are starting goals for the workflow. The available functions come from the target's interfaces, the user's access, and the tools available to their agent.

## How it works

| Step | What your AI does |
| --- | --- |
| **Understand** | Turn your request into concrete capabilities and identify the intended account or device. |
| **Discover** | Inspect the environment, official interfaces, existing connectors, and target behavior. |
| **Connect** | Reuse an appropriate integration or create the smallest adapter needed for your environment. |
| **Verify** | Check an actual result: a returned frame, a delivered message, a state change, or audible playback. |
| **Reuse** | Save the working entry points, dependency versions, and evidence in a local connection record. |
| **Maintain** | Check health, recover from interruptions, and revalidate after changes. |

An existing API or connector may be enough. When an interface needs investigation, an agent can use tools such as [REA](https://github.com/morluto/rea) as part of discovery. ACA does not require a fixed hardware stack or a second agent to take over your conversations.

## Get started

Install the portable `aca-connect` skill into an existing project, then describe a concrete target:

```sh
git clone https://github.com/Wanji02/aca.git
cd aca
node scripts/install-skill.mjs --host codex --project /path/to/your/workspace
```

Use `--host claude` for the Claude Code directory layout. Start a new host session in the chosen workspace and invoke `$aca-connect` in Codex or `/aca-connect` in Claude Code. See [installation and host verification](docs/installation.md) for manual copying, prerequisites, and the scope actually tested.

```text
Use aca-connect to connect my AI to [target].
I want to be able to [capabilities].
Inspect my environment, reuse suitable existing tools, implement the connection,
and verify the actual result. Save a reusable local connection record.
```

Your agent needs the tools relevant to the target: for example, web research, a terminal, an integration client, or access to a device on your network. Login and physical pairing may need your participation.

You can also give your agent [the workflow](docs/connect-workflow.md) directly. The skill has no mandatory model server, hardware stack, or MCP dependency.

Start with one capability. Expand a working connection instead of rebuilding it for every request.

## In this repository

- [Connect workflow](docs/connect-workflow.md): instructions your agent can follow.
- [Portable skill](skills/aca-connect/SKILL.md): a short entry point with bundled references and a template.
- [Installation](docs/installation.md): project-local setup, validation, and removal.
- [Connection record guide](docs/connection-record.md): how to retain a reusable connection.
- [Record schema](skills/aca-connect/references/connection.schema.json): versioned JSON Schema with an Ajv-based checker.
- [Connection template](templates/connection.json): a starting record for your local environment.
- [Evaluation scenarios](examples/scenarios.md): network and device exercises, including recovery.
- [Roadmap](ROADMAP.md): what is included now and what comes next.

This release provides a loadable skill, workflow, and connection-record checks. Target-specific adapters are created or reused in the user's environment; this repository does not yet ship a universal connector runtime or a verified platform/device compatibility catalog. See [validation results](docs/validation/m1.md) and [the changelog](CHANGELOG.md).

## Built around connection

ACA focuses on making connections discoverable, testable, and reusable. It leaves conversation, memory, voice selection, and decisions with your existing AI. Audio and video services can be added when the chosen devices and host support them.

Connection records stay local by default. Share reproducible methods and sanitized examples, not account sessions, pairing secrets, personal conversations, or private media.

## Contributing

Bring a connection method, a reproducible case, or a failure that improves the workflow. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE). External tools and connectors retain their own licenses.
