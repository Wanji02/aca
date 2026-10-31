# Connection records

A connection record lets an agent reuse a working integration without rediscovering it. [The JSON template](../templates/connection.json) is a documentation convention, not an implemented runtime API or a validated JSON Schema.

| Field | Purpose |
| --- | --- |
| `record_version` | Version of this record convention. |
| `connection_id` | Local stable identifier for the connection. |
| `target` | Target type, human-readable name, and a local identity reference. |
| `environment` | Host, adapter, and target versions relevant to reproduction. |
| `capabilities` | Individual operations, inputs, observed status, and evidence references. |
| `credential_refs` | Names of locally managed secrets, never their values. |
| `lifecycle` | How to start, inspect, recover, and stop owned connection resources. |
| `verification` | When and how this particular configuration was checked. |
| `limitations` | Known gaps and untested behavior. |

Fill unknown fields explicitly rather than inventing defaults. Use `null` for a check that has never happened. Record which account/device a result belongs to, but avoid putting identifying details in public contributions.

Verification belongs to a capability and environment version. A successful read does not verify writes. A successful lamp test does not establish support for a different model. Expire or revisit old evidence after relevant changes.

Do not execute a record just because it contains an entry point. The consuming agent should inspect the referenced implementation and apply its existing tool permissions. This initial package does not automatically load or execute records.
