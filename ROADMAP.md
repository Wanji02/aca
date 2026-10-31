# Roadmap

## Current foundation

ACA provides the self-contained [Connect workflow](SKILL.md) and [design direction](DESIGN.md). The workflow guides the user's AI; the actual receiving, execution, and delivery paths run in that user's host and environment.

## Next: stay reachable through an account

Connect a user-assigned account to the existing agent. New messages should reach it after setup ends, retain the right conversation and sender, and produce replies through the same account. Reuse existing host and connector capabilities before building anything new.

## Then: connect requests to actions

Let the same agent handle a phone message that asks for a particular computer file, a camera observation, or a device action, and return the result to the intended conversation. Establish the caller's authority and the requested target through the existing host and user delegation.

## Keep the connection usable

Resume after the agreed host restart, handle expired sessions, avoid replaying completed work, and support pause, stop, and account changes. Verify the behavior where it runs; keep detailed development evidence local.

## Keep ACA small

Improve the shared method from real use. Add reusable code only for a recurring gap that available tools do not solve. Do not make platform counts, mandatory adapters, host-specific installers, or public test reports the goal.
