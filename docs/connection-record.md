# Connection records

A connection record lets an agent reuse a working integration without rediscovering it. The contract is now [JSON Schema 1.0.0](../skills/aca-connect/references/connection.schema.json), with a [complete guide](../skills/aca-connect/references/record-guide.md) inside the portable skill. Start from [the template](../templates/connection.json), then use [the validation command](installation.md#check-a-connection-record).

| Field | Purpose |
| --- | --- |
| `record_version` | Exact contract version: `1.0.0`. |
| `connection_id` | Local stable identifier for the connection. |
| `target` | Target type, human-readable name, and a local identity reference. |
| `environment` | Host, adapter, and target versions plus a revision binding evidence to this context. |
| `capabilities` | Individual operations, inputs, observed status, and evidence references. |
| `credential_refs` | Names of locally managed secrets, never their values. |
| `lifecycle` | How to start, inspect, recover, and stop owned connection resources. |
| `capabilities[].verification` | Per-capability evidence, timestamp, context revision, and fixture/real-target scope. |
| `limitations` | Known gaps and untested behavior. |

Fill unknown fields explicitly rather than inventing defaults. Use `null` for a check that has never happened. Record which account/device a result belongs to, but avoid putting identifying details in public contributions. The original `0.1` unvalidated template needs explicit migration; the complete guide explains the changes.

Verification belongs to a capability and environment version. A successful read does not verify writes. A successful lamp test does not establish support for a different model. Expire or revisit old evidence after relevant changes.

Do not execute a record just because it contains an entry point. The consuming agent should inspect the referenced implementation and apply its existing tool permissions. The checker does not execute records or verify the truth of their evidence. An invalid stale-revision example and a valid synthetic example are in [record examples](../examples/records/synthetic-fixture-note.md).
