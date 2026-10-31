# Synthetic record examples

`fixture-verified.json` is a deliberately constructed input for schema tests. It demonstrates the required shape of a verification declaration. Its timestamp and observation are fictional test data; no network service or device was contacted to produce it.

`invalid-stale.json` changes the environment revision while retaining the old verification. ACA's checker must reject this combination.

These examples test record validation, not the truth of observations. Do not copy their `verified` state into a real connection. Start real work from the `needs_setup` template.
