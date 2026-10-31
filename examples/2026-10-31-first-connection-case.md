# First connection case: public metadata and reuse

Date: 2026-10-31. Workflow: ACA 0.2.0, from commit `00b22be574fd909ec520311f2b70873422efb4a5`.

This is a maintainer-led case study in an existing Windows environment, not a fresh-agent benchmark or a with/without ACA comparison. The assistant already knew the project and the household device. No target-specific adapter was bundled in ACA; the assistant created small task-local clients during the exercise.

## Real network read

Goal: retrieve public metadata for `morluto/rea`, retain a working invocation, and read it again from a new process.

The assistant consulted the [official repository API documentation](https://docs.github.com/en/rest/repos/repos#get-a-repository) and chose the repository GET endpoint. An initial Python standard-library client made anonymous requests. Both the first read and new-process reuse returned HTTP 403; the precise reason was not established. An intentionally missing target also returned 403 through that route, so it did not verify missing-target handling.

The assistant then reused the owner's already authenticated official GitHub CLI. No credentials were extracted or copied into the task files. Both reads returned `full_name=morluto/rea`, `default_branch=main`, and `archived=false`; the client checked the returned identity. The missing-target probe returned HTTP 404 through this route and was reported as unavailable, not as successful data.

| Attempt | Observed result | Request/client elapsed time |
| --- | --- | --- |
| Anonymous first read | HTTP 403 | 0.594 s |
| Anonymous new-process read | HTTP 403 | 0.563 s |
| Existing CLI first recorded read | Correct target metadata | 0.985 s |
| Existing CLI new-process reuse | Correct target metadata | 0.922 s |
| CLI deliberately missing repository | HTTP 404; no success claim | 0.875 s |

These are individual call timings, not end-to-end task time, an ACA speedup, or a statistical result. One exploratory CLI read also succeeded before the recorded pair. The account was authenticated before this case; login automation was not tested.

A reader with an appropriate existing CLI session can repeat the public read:

```sh
gh api repos/morluto/rea --jq '{full_name,default_branch,archived,html_url}'
```

Run it again from another terminal process and inspect the current response. The local saved connection note records the route, invocation, earlier failure, identity check, and absence of a persistent service. Its format was chosen for the task; ACA does not prescribe it.

## Controlled recovery exercise

A separate temporary HTTP service bound only to loopback returned synthetic repository metadata. It was created by the same maintainer, so this is a known fixture, not undisclosed route discovery.

The Python read client successfully read generation 1, rejected a response for the wrong expected target, reported failure while the service was stopped, and read generation 2 after it restarted at the same address. Every invocation used a new client process. The service was shut down after the exercise.

This checks the small client's behavior and demonstrates the reuse procedure. It does not show that an independent AI autonomously diagnosed or restarted an unknown service, or that a real remote platform recovered.

## Existing device probe: unresolved

Using the [pywizlight project's documented read operation](https://github.com/sbidy/pywizlight#example-udp-requests), the assistant sent one `getPilot` query to the previously known lamp address. No matching response arrived within three seconds. The address may be stale, or the device or route may be unavailable; this probe does not establish the cause.

No discovery scan, pairing, light-state change, or production-service restart was performed. Device identity and current connectivity remain unverified. This was an existing device with prior context, not an unknown-device test.

## What this teaches us

- Reusing a suitable existing tool recovered the network read after the first route failed; no new connector framework was needed.
- The working invocation could be reused from a fresh process. The synthetic check also distinguished fresh results, a stopped service, and wrong-target data.
- Device reachability remains a concrete next task. A historical address is not evidence of a current connection.
- No changes to the common workflow were justified by this small case alone. The next stronger evaluation needs a fresh agent, a less familiar target, and comparable conditions with and without ACA.

There were no platform writes, messages, physical device changes, or changes to the user's production AI services. Experimental clients and raw local evidence remain outside the ACA distribution. This report is not a universal compatibility claim.
