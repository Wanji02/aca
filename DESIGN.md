# ACA design direction

Read this before changing ACA's scope, packaging, or implementation. This is the project design brief, not extra instructions that every end-user conversation must load.

## The product

**ACA: AI Connecting Anything** is a common workflow that helps the user's own AI connect network software, social platforms, and smart devices.

The user supplies a goal. Their AI understands the environment, chooses tools, discovers a route, implements what is needed, checks the result, and retains useful connection knowledge. The implementation is determined by the target and the user's environment—not by a stack we require in advance.

The essential deliverable is the self-contained [Connect workflow](SKILL.md). A user can give it to an AI as text, a file, or a skill. There is no preferred model or mandatory host.

## Where responsibility belongs

- **ACA:** useful guidance for discovering, establishing, verifying, reusing, and repairing connections.
- **The user's AI:** task understanding, route selection, implementation, tool use, and decisions within the user's authorization.
- **The existing environment:** model execution, available tools, credentials, network access, and any target-specific runtime the task needs.

Keep the user's existing agent, identity, and memory. Apps and devices extend that agent's capabilities; they do not require a new ACA personality or a second conversational agent.

## What we will not build by default

- A collection of model-specific or host-specific installers as the main product.
- A predefined adapter for every platform and device before a user can try a connection.
- A mandatory hardware stack, language, model, memory system, or connection-record schema.
- A second orchestration framework, plugin runtime, or MCP server merely to package a workflow.
- More prompts, templates, dependencies, or tests whose main purpose is maintaining machinery we did not need.

REA and other mature tools can help the AI investigate a target. They are options chosen for a task, not universal access mechanisms or required dependencies.

## What remains important

Simplicity does not mean declaring success without evidence. Check the capability the user requested, retain enough knowledge to reuse it, and distinguish an unknown action outcome from a confirmed result. Keep credentials and unrelated private data out of shared examples. Let the AI choose how to implement these principles rather than mandating a reporting protocol.

Universal intent means the method is not tied to a vendor. It does not mean every model can execute tools or every target exposes every capability. Explain a concrete missing capability when it matters to a task; do not burden every interaction with generic disclaimers.

## How we decide what to add

Before proposing code or structure, ask:

1. Which observed connection problem does this solve?
2. Can the user's AI already solve it with existing tools and the current method?
3. Does it improve successful connection or reuse, or mostly add packaging and maintenance?
4. Can the useful part remain optional and be explained more simply?

An adapter created for a real user task is useful task output. It does not automatically become a mandatory ACA component. Add shared code only when actual cases show a recurring need that existing tools do not meet.

## Validation direction

Test real goals with the workflow, observe route discovery and outcomes, then test reuse and recovery. Keep experimental scripts and raw local evidence separate from the product. Publish concise, sanitized case reports, including failed attempts.

Label synthetic tests, previously known integrations, fresh-agent evaluations, and real-device observations accurately. A maintainer successfully connecting something is a case study, not proof that the workflow caused the success. Claims of improvement require comparable runs with and without ACA; claims across models require actual runs with those models.

Do not make adding hosts, passing framework tests, or growing an adapter catalog the milestone. The milestone is that the user's AI can achieve a useful connection with less repeated work.

## Decision history

2026-10-31: The first package overemphasized Codex/Claude installation, a fixed JSON contract, and validation infrastructure. Following the user's correction, version 0.2.0 removed those parts and returned to one portable method. That machinery remains in Git history, not the default roadmap. Reintroducing it requires concrete evidence and an explicit design discussion; do not gradually rebuild it under a different name.
