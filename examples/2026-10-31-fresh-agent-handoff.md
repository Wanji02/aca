# Fresh-context discovery and connection handoff

Date: 2026-10-31. Target: public Hacker News entries and discussion.

## Evaluation setup

A new agent context received the Connect workflow, a task, an output directory, and read-only boundaries. It did not inherit the coordinator's conversation or receive an API address or target-specific implementation. The task was to retrieve the current top five entries and one available top-level comment, then retain enough information for another fresh context to continue.

The agent read the workspace recovery entry as required by local instructions. That entry contained summaries of earlier ACA cases, but no Hacker News connection recipe. It was instructed not to read earlier case reports or experimental clients. This was a shared filesystem with context separation, not a permissions sandbox or a model with no prior knowledge of Hacker News.

## Discovery result

The agent searched for official documentation and selected the [official Hacker News API](https://github.com/HackerNews/API). It wrote a small Python standard-library reader in its local experiment directory. No SDK, browser backend, account, or ACA runtime was needed for this goal.

The recorded reader run made nine successful public GET requests: documentation, ranking, five entries, a comment, and the official homepage. That reader run took approximately 6.52 seconds; this excludes investigation, coding, and reporting time. Web search and documentation browsing were additional discovery actions, not included in the nine-request count.

The coordinator independently checked saved response hashes and semantics:

- The five returned entries matched the first five IDs in the saved ranking response, in order.
- Reported metadata matched the saved item responses.
- The official homepage showed the same five IDs in the same order.
- The selected comment was live, had text, named the selected story as its parent, and appeared in that parent's child list.

Some scores and comment counts differed between the API and homepage. Both observations were retained. The requests were not an atomic snapshot; timing or caching could explain the difference, but the specific cause was not established.

## Retained connection

The agent saved the reader, invocation instructions, interface semantics, request records, original responses, and an unrequested candidate comment for follow-up. The handoff explains how to refresh an existing story, distinguish total comments from immediate children, and select another live comment if a candidate disappears.

These artifacts belong to the local task. They are not a new mandatory ACA adapter, storage format, or framework.

## Reuse result

A second new agent context received the workflow, the saved handoff entry point, and a follow-up goal. It did not inherit the first agent's conversation. It reused the saved reader without modifying it or conducting new interface research.

Six successful public GET requests refreshed all five original stories and fetched a different top-level comment. This reader run took approximately 3.45 seconds, excluding the agent's reading and verification work. The first story's score changed from 274 to 279 and its total comments from 167 to 169 between observations. The second comment had not been fetched in the discovery run.

The coordinator checked all six raw response hashes, the new comment's parent/child relationship and live status, the refreshed story IDs, and the unchanged hashes of the handoff and reader. The first comment was not reused as the new sample. No repair was necessary, so fault recovery was not tested.

Across the two reader runs there were 15 recorded public GET requests and no recorded HTTP failures. The original discovery search/documentation browsing was additional. No platform write, account login, dependency installation, or production configuration change was made.

## Interpretation

This is a same-host, same-configured-model exercise with fresh agent contexts. There was no without-ACA control, no authenticated action, and no hardware test. It cannot establish that ACA caused the success, that every model transfers the method, or that private platform actions are supported.

The useful result is narrower and concrete: one agent discovered a working public connection from a goal, and another fresh context continued through its retained instructions and implementation. The route was an API because it fit this task; the earlier browser case remains a different optional route. Neither becomes a required ACA stack.
