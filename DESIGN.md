# ACA design direction

Read this before changing scope, packaging, or implementation.

## Purpose

**ACA: AI Connecting Anything** helps a user's existing AI connect apps, social platforms, and smart devices as ongoing channels and tools.

The product outcome is that the user can reach the same AI through an assigned account, request something involving its connected capabilities, and receive a response. A social account is a place to talk to the AI; a camera provides observations; a speaker provides a voice; files and devices support actions. The connection remains useful after the setup conversation ends.

The account remains under the user's control. Assigning it to the AI means binding an authorized session and its incoming/outgoing interactions to that agent, not transferring ownership or granting every correspondent access to the user's computer.

## One agent, many connections

Keep the existing identity, conversation, memory, and decision maker. Incoming messages and device events reach that agent. It interprets the request and chooses tools, and the result returns to the appropriate conversation or endpoint.

The receiving path must be real: an event subscription, existing plugin, polling service, or another mechanism that can dispatch work to the host when the agent is idle. Merely opening an application or loading a model does not create that path. Reuse the host's mechanisms before adding infrastructure, and preserve account/source identity across delivery and tool execution.

## What ACA provides

The self-contained [Connect workflow](SKILL.md) guides discovery, account/device association, ongoing reception, execution, response, and recovery. Users can supply it as text, a file, or a skill. Their AI chooses the tools, implementation, and local storage appropriate to the task.

ACA does not prescribe a model, connector catalog, language, memory database, device stack, record schema, or second agent runtime. REA, browser tools, APIs, and existing plugins are options. A local implementation for a real task does not automatically become a mandatory product component.

Method-first does not mean implementation-free: when the user's environment lacks a receiving or delivery path, the agent must establish one to fulfill an ongoing-interaction request. Adding more instructions cannot substitute for a running connection.

## Completion and maintenance

Treat one-time tasks and ongoing channels differently. For ongoing use, check new input after setup, a reply from the same agent, later interactions, and the lifecycle the user requested. Check real effects for tool actions. Retain enough state to resume without duplicate processing, recover lost sessions, and stop when requested.

Give the agent freedom to choose a route while preserving the user's actual authority and intended recipients. A new message from an unbound contact is conversation input, not authorization to export local files or operate devices.

## Public presentation

Lead with the useful interaction, a quick start, how the method works, and what runs it. Keep implementation logs, raw evidence, and individual test reports in local development records. A selected demonstration can be added when it helps a user understand the product; publishing every test is not a milestone.

Describe what the workflow guides separately from what a particular deployment currently runs. Internally retain failures and distinguish live outcomes, simulations, human participation, and future work. Removing reports from the public tree does not erase their evidence or turn a supervised test into unattended operation.

## Decision history

- 2026-10-31, 0.2: removed host-specific installers, fixed schemas, and unnecessary framework machinery; returned to one portable method.
- 2026-10-31, 0.3: clarified that accounts are ongoing interaction channels for the same agent. Prior read/send checks remain internal evidence. The next implementation focus is continuous reception, replies, and cross-tool requests, rather than accumulating connection demonstrations.
