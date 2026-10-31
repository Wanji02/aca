<div align="center">

# ACA: AI Connecting Anything

### A workflow for connecting your AI to apps, social platforms, and smart devices.

**Connect your AI to anything online—from digital platforms to the physical world.**

[Start connecting](#get-started) · [Read the workflow](SKILL.md) · [Design direction](DESIGN.md) · [Contribute](CONTRIBUTING.md)

</div>

---

## Your AI figures out the connection.

Tell your AI what you want to connect. ACA gives it a common method to investigate the target, choose suitable tools, establish the connection, check the result, and retain what works.

Your AI chooses the implementation for your environment. Keep your own model, personality, memory, and tools. Connect a platform, a device, or both.

```text
Understand → Discover → Connect → Verify → Reuse
```

## Get started

Give your AI this request, replacing the target and goal:

```text
Read https://github.com/Wanji02/aca/blob/main/SKILL.md and use its workflow
to connect my AI to [app, platform, or device] so it can [desired capability].
Inspect my environment, choose and implement a suitable route, verify that it
works, and save what you need to use the connection again.
```

If your AI cannot open links, paste or attach [SKILL.md](SKILL.md). That single file contains the complete workflow. If your agent supports skills, it can also load that file using its own skill mechanism. No ACA installer, package manager, or model-specific setup is required.

The AI needs tools capable of doing the task, such as a terminal, browser, API client, or access to the device's network. The workflow guides those tools; it does not grant missing access. Login or pairing may require your help.

## What can you ask for?

- “Connect my AI to the messaging platform I use.”
- “Let my AI see through my camera and speak through my speaker.”
- “Connect my lights so my AI can control them.”
- “Connect both my online accounts and my devices.”
- “Restore the connection we set up last time.”

These are goals to investigate, not a preverified compatibility list. Each target's interfaces determine which capabilities can actually be connected.

## How ACA works

| Step | Your AI decides and does |
| --- | --- |
| Understand | Identify your goal, the intended target, and what a working result means. |
| Discover | Inspect the environment and find relevant interfaces, connectors, or tools. |
| Connect | Reuse or build the smallest suitable connection. |
| Verify | Check the actual requested outcome and resolve failures. |
| Reuse | Keep useful connection knowledge and implementation artifacts, then recover or adapt them when needed. |

An API, existing plugin, browser, or local protocol may be enough. When an undocumented interface needs investigation, your AI can use [REA](https://github.com/morluto/rea) or other suitable tools. REA is an optional discovery tool, not a required ACA dependency.

For browser-based connections, an existing browser tool or [Playwright MCP](https://github.com/microsoft/playwright-mcp) can supply page interaction and network inspection. Our [browser case](examples/2026-10-31-playwright-browser.md) records a public website read and a separate local publishing exercise. Your AI chooses the tool; ACA does not require this one.

There is no prescribed language, hardware stack, connector catalog, or connection-record format. The reusable product is the method; target-specific implementation happens where the user needs it.

## What is available today?

A self-contained, model- and host-independent workflow, plus [evaluation scenarios](examples/scenarios.md). It can be read as ordinary instructions or loaded as a skill. This describes the format and intended use; it does not claim successful execution by every model or integration with every target.

Published [connection cases](examples/scenarios.md) record API and browser work, including failures and recovery. A [fresh-context handoff](examples/2026-10-31-fresh-agent-handoff.md) also demonstrates discovery by one agent and saved-connection reuse by another. Cross-model and controlled comparisons remain next. See the [roadmap](ROADMAP.md).

## Contributing

Share a useful method, a real connection case, or a failure that teaches us what to improve. Keep examples free of credentials, private conversations, and personal media. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE). External tools and connectors retain their own licenses.
