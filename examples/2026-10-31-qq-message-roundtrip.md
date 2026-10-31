# QQ: a real text-message round trip

Date: 2026-10-31. User-authorized test with a designated test account and one designated contact.

## Goal and route

An agent starting without the coordinator's conversation history received the ACA workflow and the task of connecting QQ. It inspected the environment and selected the existing native QQ client, version 9.9.15.28327, after checking its Tencent signature. It used local Windows window observation and input rather than installing a connector, browser backend, or another agent runtime.

This was a desktop interaction route, not QQ API integration. The local experimental helpers are task artifacts, not mandatory ACA components.

## Login and human participation

The client initially offered a saved account. The agent opened the add-account QR login path instead of using that saved identity. The coordinator delivered the QR screenshot to the user.

At the user's request, the coordinator also tried password login. QQ presented a security challenge, which was not solved by automation. The user then chose QR login. Returning from the challenge stalled on a loading screen; the coordinator restarted the test client, reopened QR login, and supplied a new screenshot. The user completed the login.

These coordinator actions and user participation are part of the result. This was not unattended authentication or a wholly independent end-to-end agent run.

## Verified outcome

After login, the agent checked that the active account matched the designated test account. It searched the requested contact name, found one exact match in the friend list, and checked the conversation header before sending.

| Step | Evidence observed |
| --- | --- |
| Prepare one harmless connection-test message | Draft visible in the intended conversation. |
| Send once | Matching outgoing bubble appeared, composer cleared, and no error marker was visible. This alone was treated as sender-side evidence. |
| Verify recipient receipt | The user explicitly confirmed receipt and that they had replied. |
| Read the reply | The agent observed the requested acknowledgment as an incoming bubble in the test conversation. |
| Independent review | The coordinator inspected the outgoing-message and incoming-reply screenshots. |

The test sent one message and observed one requested reply. No second send or retry was needed. Waiting stopped after the reply; no persistent listener was installed. The QQ session was left open for the user.

## Scope and retained knowledge

The local handoff records the selected route, login participation, current-session observations, and how to recheck the account, window, and contact before continuing. Window handles and coordinates are observations of this session, not durable identifiers. Account identifiers, credentials, QR codes, contact names, avatars, and conversation screenshots are excluded from the public report.

This establishes a real, supervised text-message round trip in the tested native-client session. It does not establish unattended operation, restart persistence after authenticated login, unknown-delivery recovery, media or group messaging, other-model compatibility, or a general QQ API adapter. There was no without-ACA control.

The practical result follows ACA's method-first design: inspect what is available, choose a route that fits the task, and verify the actual outcome. Existing APIs, browser tools, desktop tools, or connectors remain choices for the user's AI rather than a stack ACA requires.
