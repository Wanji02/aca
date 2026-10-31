# Evaluation scenarios

These are proposed exercises, not completed integrations or a compatibility list. Use the same Connect workflow across agent hosts and record what actually happens.

Recorded work: [first connection case](2026-10-31-first-connection-case.md). Keep its limited observations separate from the broader exercises below.

Additional case: [Bluesky public feed and cursor reuse](2026-10-31-bluesky-public-feed.md), including actual API failures and preservation of a usable connection.

## Network connection

Recorded fresh-context case: [Hacker News discovery and handoff](2026-10-31-fresh-agent-handoff.md). One agent discovered a route from the goal; a second reused its saved connection. This tests same-host context handoff, not cross-model compatibility.

Recorded browser case: [Playwright MCP across a public page and a local publishing fixture](2026-10-31-playwright-browser.md). The publishing portion is synthetic, not real social delivery.

Ask an agent to connect an account on a chosen platform and retrieve one item the user is permitted to access. Let it discover a suitable interface rather than giving it a hidden target-specific script.

Record the route, account binding, tool requirements, user participation, elapsed time, cost when available, and observed result. If testing a write, use an explicitly authorized destination and check for duplicate sends after a simulated interruption.

## Device connection

Choose a device whose adapter is not preinstalled in the evaluation environment. Request one exposed capability, such as reading a camera frame or changing a lamp's brightness. Let the agent research and establish the route.

Verify the actual result. Distinguish interface availability, software acknowledgment, state readback, and physical confirmation. Missing hardware capabilities should remain unsupported rather than being simulated as success.

## Reuse and recovery

Restart the adapter or disconnect the target, then ask the agent to reuse its saved connection. Check whether it diagnoses the specific interruption and recovers without rebuilding everything or duplicating pending actions.

Change a relevant version or revoke access and check whether the agent notices the saved connection needs rechecking, instead of treating an earlier success as current proof.

## Evidence to retain

- Agent host and model version; available tools.
- Target and adapter versions, with personal identifiers removed for sharing.
- Requested capability and acceptance criterion.
- Steps completed autonomously and steps requiring user involvement.
- Time to first verified result and time to reuse it.
- Failures, ambiguous outcomes, recovery behavior, and remaining gaps.

Keep results per environment. Do not extrapolate one successful connection to every device or account on a platform.
