# Roadmap

## Available in 0.1.0

- English project introduction.
- A host-neutral Connect workflow.
- A portable `aca-connect` skill and project-local installation helper.
- Connection-record schema 1.0.0, templates, and Ajv-based checks.
- Synthetic validation and installation tests; native Codex discovery checked.
- Evaluation scenarios and contribution guidance.

See [the M1 report](docs/validation/m1.md) for actual evidence and remaining host checks. Claude Code's install layout is tested; its runtime discovery and real-task behavior remain untested here.

## Next

1. Exercise the skill on controlled fixtures, then an authorized network target and real device, without hidden prewritten adapters.
2. Compare with/without ACA under the same host, model, tools, permissions, and target conditions; publish sanitized reports including failed routes and recovery.
3. Finish second-host discovery and compare real-task behavior across tool-enabled hosts separately from the within-host comparison.
4. Turn repeated setup and verification steps into small reusable helpers.
5. Add richer host packaging or an MCP frontend only where it improves the workflow.

The direction is broad connection coverage with a small common workflow. Platform clients, audio models, device firmware, and personal memory systems are not mandatory core dependencies.
