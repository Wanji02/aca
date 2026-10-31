# Connection record 1.0.0

Use the adjacent `connection.schema.json` and `../assets/connection.template.json`. This directory travels with the skill; no repository-relative dependencies are required to read the contract.

## What the record represents

A record describes one local connection instance, not a generic recipe, an executable plugin, or a user's personality. Keep it in a user-selected local directory outside this public package. Share sanitized methods separately.

- `record_version`: exact contract version, currently `1.0.0`.
- `connection_id`: a stable local ID, separate from a public account name.
- `target`: type, friendly name, and a local reference that identifies the intended account/device.
- `environment`: the host, target, and adapter versions, plus a `context_revision` that binds evidence to this configuration. Use `null` where a version is unknown.
- `capabilities`: operations, their declarative entry points, and their individual verification states.
- `credential_refs`: names of entries in the host's secret store; never secret values.
- `lifecycle`: ownership and procedures for on-demand, externally managed, or persistent operation.
- `limitations`: useful untested scope or current gaps.

Entry points describe a host tool, command, HTTP interface, or manual procedure. They are not executed by validation. Do not put credentials in URLs, command arguments, or free text. An entry-point description is not a grant of execution permission.

## Capability states

| State | Meaning |
| --- | --- |
| `needs_setup` | Discovery, login, pairing, implementation, or testing remains. |
| `verified` | The stated capability passed the recorded criterion in the recorded context. |
| `partial` | A useful subset worked; explain the missing part in limitations. |
| `unsupported` | The capability is unavailable through the investigated route. |
| `failed` | An observed attempt failed. |
| `unknown` | The outcome is unresolved, including a write timeout that might have succeeded. |

`verified` and `partial` require an entry point and a verification object with a timestamp, observation, evidence references, and matching context revision. A verification object identifies `fixture` or `real_target` scope. Fixture success does not establish real-device or real-platform support. Evidence references point to local reports or artifacts; the validator neither opens nor verifies them.

Increment `environment.context_revision` whenever identity, relevant configuration, adapter, or target versions change. Reset affected capabilities to `needs_setup` or `unknown` and clear their current verification; retain previous reports separately. If a capability is rechecked, save fresh evidence under the new revision. The checker rejects mismatched revisions, but cannot detect an environmental change the author failed to record.

Persistent connections require start, health-check, and stop procedures and an owned-resource reference. Stop only owned resources. For externally managed services, describe recovery if known; do not pretend ACA owns their processes.

## Validation and compatibility

Use a JSON Schema draft 2020-12 validator with date-time format checking. ACA's repository checker adds unique capability names and matching context revisions. It reads records without executing commands, accessing secrets, fetching evidence, or changing values. Passing validation proves consistency of the declaration, not truthful evidence, credential safety, or present connectivity.

Unknown fields and unsupported versions are rejected. The optional `extensions` object accepts namespaced keys for additional metadata; consumers must not execute its values. Do not place secrets there.

The initial unvalidated `0.1` template is replaced by this version. Migration is explicit: retain the old record; add an environment revision and lifecycle mode; convert entry points into descriptive objects; move applicable evidence into each capability. Unverified historical claims remain `needs_setup` until checked. There is no silent migration or inference of success.
