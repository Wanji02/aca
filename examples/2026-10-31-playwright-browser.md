# A generic browser tool across two targets

Date: 2026-10-31. Maintainer-led case using the existing Connect workflow.

## Goal and tools

Evaluate an existing browser MCP as an optional network interaction tool, without adding a platform adapter or an ACA runtime.

The run used unmodified [Microsoft Playwright MCP](https://github.com/microsoft/playwright-mcp), npm package `@playwright/mcp@0.0.83`, with Playwright `1.64.0-alpha-1790635538000`, Node.js `24.16.0`, and an installed Chrome `156.0.8078.76`. Chrome ran headlessly with an isolated profile. No existing account session was attached.

The maintainer selected actions from current accessibility snapshots. Browser interactions used MCP navigation, snapshot, click, form-fill, upload, network inspection, and close tools. No page-evaluation or unsafe code-execution tool was used. Experimental transport and fixture code stayed outside the ACA product.

## Real public website

1. Open the public `bsky.app` profile at `https://bsky.app/profile/bsky.app`.
2. Read the accessibility snapshot and inspect observed profile/feed network requests.
3. Select the media tab from its current snapshot reference.
4. Observe a successful feed request with `filter=posts_with_media`.
5. Inspect the profile response body and confirm its handle matches the requested public profile.

These were real browser reads and navigation. No login, follow, reply, like, private-message read, or other social write occurred.

## Controlled local publishing exercise

A self-authored loopback website provided a draft form, audience selector, attachment upload, preview, publish action, and persistent local ledger. This was a known synthetic fixture, not a blind test on an unfamiliar platform.

| Exercise | Observed result |
| --- | --- |
| Fill a draft, select an audience, attach a synthetic text file, preview, then submit | Local POST returned 201; the page showed a receipt. |
| Open an alternate layout with changed field order and new DOM identifiers | A deliberately stale reference was rejected. No submission resulted from that failed action. |
| Read the new snapshot, locate the current fields, preview and submit a second draft | A second local entry was created through the same generic tools. |
| Close and reopen the browser | Both entries remained visible. |
| Inspect the backend ledger independently | Exactly two submissions and two stored entries; the first attachment's SHA-256 matched the input file. |

The successful MCP session made 25 tool calls, including the expected stale-reference failure. No duplicate local submissions were observed in this run. Browser reopening was tested; server restart and uncertain real-platform delivery were not.

## Failures and cleanup

The default Chrome channel initially resolved a missing per-user executable. Explicitly selecting the installed Chrome executable worked. An experimental local transport restart also timed out; replacing that test transport with a session-owned implementation resolved the issue. Its cause was not established as an upstream MCP defect.

The browser was closed, the MCP process exited with code 0, and the local fixture was stopped. Its listening port was confirmed closed. No global agent configuration, production session, device, or ACA runtime dependency changed.

## What this establishes

An existing general browser MCP supported public-page discovery and a separate form/upload/publish exercise. Current UI observations let the maintainer recover from changed references without a prewritten platform click script. This supports offering Playwright MCP as one replaceable tool the user's AI can choose.

It does not establish authenticated publishing on Twitter, TikTok, QQ, or any other platform. There was no independent-agent evaluation, cross-model comparison, or controlled measurement of ACA's contribution. Authentication, platform-specific behavior, permissions, and delivery still need checking for each actual connection.

ACA remains a workflow. It does not wrap this tool in another MCP server, require a browser backend, or turn this fixture into a bundled social adapter. The next useful evaluation is a fresh agent applying the workflow to an authorized real task, with actual delivery verified when that task involves a write.
