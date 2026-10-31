<div align="center">

# ACA: AI Connecting Anything

### A workflow for connecting your AI to apps, social platforms, and smart devices.

**Connect your AI to anything online—from digital platforms to the physical world.**

[Get started](#get-started) · [Connect workflow](SKILL.md) · [Design](DESIGN.md) · [Roadmap](ROADMAP.md)

</div>

---

## One AI. Wherever you reach it.

Give your AI an account to use. Message it from your phone. Ask it to send a file from your computer, check a camera, or adjust the lights. Continue the conversation through a speaker or another connected platform.

ACA guides your AI through making those connections useful over time: receiving messages, understanding requests, acting through available tools, and bringing the result back to you. Your existing agent keeps its identity, conversation, and memory. Accounts and devices become its ways to hear, speak, and act.

Give it room to explore, too: browse videos and posts, read discussions, develop interests, and bring you something it found worth sharing. The same AI can participate through comments, likes, saves, and messages within the autonomy you give it.

```text
Your message · Device event · AI initiative
            ↓
       Your existing AI
            ↓
  Apps · Files · Platforms · Devices
            ↓
     A reply where you need it
```

## Get started

Give this request to your tool-enabled AI:

```text
Read https://github.com/Wanji02/aca/blob/main/SKILL.md.
Connect you to [platform/account or device] so I can [desired interaction].
Use my existing agent and memory. Find a suitable connection, arrange ongoing
message or event reception, and route my requests and your replies through it.
Keep it usable while your host is running, and save how to resume it later.
```

For initiative, add what you want to delegate: for example, explore content independently, keep things it likes, and share worthwhile discoveries with you. Your AI establishes the available actions and runs them through the same host.

You can also paste or attach [SKILL.md](SKILL.md), or load it through your agent's skill mechanism. No ACA-specific installer or model is required.

Your agent chooses the tools and sets up the receiving and execution path in its existing host. You complete account login or pairing when needed. Ongoing interaction needs that host and the connection to remain available; loading a workflow file alone does not start a listener.

## What you can build

- **A familiar place to talk.** Reach the same AI through an account you assign to it on QQ, Discord, Telegram, or another platform.
- **Your computer within reach.** Ask from your phone for a particular file, let the AI find it, and receive it in the intended conversation.
- **Conversation that reaches the room.** Ask about a camera view, adjust lighting, set an alarm, or speak through a connected device.
- **Connections that stay useful.** Receive new requests after the setup conversation ends, resume after a restart, and recover when a session expires.
- **An AI with things to share.** Let it explore feeds, videos, posts, and comments; follow its curiosity, save favorites, join discussions, and message you about a discovery. Its interests can develop through experience and conversation.

These are the interaction goals. Your AI discovers and implements the route for the chosen environment.

## How ACA works

**Discover → Connect → Receive → Act → Respond → Resume**

The AI identifies the account or device, connects incoming events to its existing conversation, chooses the right tools for the request, and sends the actual result to the intended destination. It retains enough connection state to continue after interruption.

Initiative adds another loop: **Explore → Understand → Choose → Interact or Share → Remember**. The same agent decides what matters, including when to keep browsing or say nothing. ACA supplies no fixed personality, hobby list, or engagement quota. Platform tools implement the available actions; the agent's existing memory retains relevant experiences and changing preferences.

Use an API, existing connector, browser, desktop tool, or local protocol when it fits. [Playwright MCP](https://github.com/microsoft/playwright-mcp) is one browser option; [REA](https://github.com/morluto/rea) can help investigate undocumented behavior. Neither is required.

ACA provides the method in [SKILL.md](SKILL.md). The agent implements the connection using its host and available tools. There is no mandatory connector catalog, second personality, memory database, or hardware stack.

## Contribute

Improve how an AI receives requests, connects capabilities, responds, or recovers. Prefer a useful general method over another required platform adapter. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE). External tools retain their own licenses.
