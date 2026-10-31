# Load ACA Connect

ACA's skill is a self-contained folder at `skills/aca-connect`. Loading it adds connection guidance to your existing agent. It does not start a server, install REA, connect accounts, or alter your agent's persona.

## Project-local installation

Clone this repository and choose an existing workspace where you want the skill available:

```sh
git clone https://github.com/Wanji02/aca.git
cd aca
node scripts/install-skill.mjs --host codex --project /path/to/your/workspace --dry-run
node scripts/install-skill.mjs --host codex --project /path/to/your/workspace
```

On Windows, use a quoted path such as `"C:\Projects\My Workspace"` for `--project`. The copy helper requires Node.js 22 or newer and no npm dependencies. It refuses an existing `aca-connect` folder and linked destination components. It writes only the namespaced skill directory, not global settings, account credentials, `AGENTS.md`, or `CLAUDE.md`.

For Claude Code, use `--host claude` instead. The installation paths are:

| Host | Project-local destination | Explicit invocation |
| --- | --- | --- |
| Codex | `.agents/skills/aca-connect/SKILL.md` | `$aca-connect` |
| Claude Code | `.claude/skills/aca-connect/SKILL.md` | `/aca-connect` |

Start a new session in that workspace, let the host apply its normal workspace-trust rules, and invoke the skill with your target. Automatic selection remains enabled where supported by the host.

Without Node.js, copy the entire `skills/aca-connect` directory to the corresponding destination yourself. Keep `references`, `assets`, and `agents` inside it; copying only `SKILL.md` loses the record contract. Existing host policy can affect discovery.

For another Agent Skills-compatible host, use its documented local skill directory. For a host without skill discovery, provide `SKILL.md` and the supporting files explicitly. This is a manual workflow, not a claim of native integration.

## Required tools depend on the target

The host must be able to read the skill and write local connection artifacts. Actual integration may need research, terminal execution, a browser, an API client, network reachability, or physical pairing. An installed skill does not supply missing tools or permissions. Use the model and tools already configured for your agent.

## Check a connection record

From the ACA checkout:

```sh
npm ci --ignore-scripts
npm run validate:record -- /path/to/connection.json
```

The checker uses Ajv with JSON Schema draft 2020-12 and date-time validation. Exit codes are `0` for a structurally consistent record, `1` for a rejected record, and `2` for usage, input, or file errors. It checks records up to 1 MiB and never fetches evidence, resolves credentials, executes entry points, or proves a real-world result.

Node/npm and validation dependencies are optional for using the instruction bundle. Another conforming validator can check the schema; see the record guide for the additional cross-field checks.

## Update or remove

Before updating, inspect and back up the existing `aca-connect` folder if you customized it. The helper intentionally has no overwrite mode. Remove or move only that skill folder, then install the new copy and restart the host session. If copying fails midway, inspect the newly created folder before retrying; the helper does not claim atomic installation.

To uninstall, remove the installed `aca-connect` directory and restart the host session. This removes guidance only. It does not stop adapters, revoke platform access, or delete local connection records; manage those separately through the saved lifecycle instructions.

## Host verification

See [the M1 validation report](validation/m1.md) for the exact checks performed. File-copy tests are not proof that a host discovered or applied the skill; discovery is not proof that an agent connected a target.

Official host references checked on 2026-10-31: [OpenAI skill documentation](https://learn.chatgpt.com/docs/build-skills), [Claude Code skills](https://code.claude.com/docs/en/skills).
