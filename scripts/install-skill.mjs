import { cp, lstat, mkdir, readdir, realpath } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';

const source = fileURLToPath(new URL('../skills/aca-connect', import.meta.url));

async function rejectLinks(folder) {
  for (const item of await readdir(folder, { withFileTypes: true })) {
    if (item.isSymbolicLink() || (!item.isDirectory() && !item.isFile())) throw new Error('Skill source must contain only regular files and directories.');
    if (item.isDirectory()) await rejectLinks(path.join(folder, item.name));
  }
}

export async function installSkill({ host, project, dryRun = false }) {
  if (!['codex', 'claude'].includes(host) || !project) throw new Error('Choose --host codex or claude and an existing --project directory.');
  const root = await realpath(project);
  if (!(await lstat(root)).isDirectory()) throw new Error('Project must be a directory.');
  const parts = [host === 'codex' ? '.agents' : '.claude', 'skills', 'aca-connect'];
  let current = root;
  for (const part of parts) {
    current = path.join(current, part);
    try {
      const info = await lstat(current);
      if (info.isSymbolicLink() || !info.isDirectory()) throw new Error('Install path contains a link or a non-directory component.');
      if (part === 'aca-connect') throw new Error('ACA skill already exists; inspect or back it up before installing. No files were replaced.');
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
  await rejectLinks(source);
  if (dryRun) return { installed: false, dryRun: true, destination: current };
  await mkdir(path.dirname(current), { recursive: true });
  // Reserve the destination exclusively. Never merge with an existing skill.
  await mkdir(current);
  for (const item of await readdir(source)) {
    await cp(path.join(source, item), path.join(current, item), { recursive: true, force: false, errorOnExist: true });
  }
  return { installed: true, destination: current };
}

async function main() {
  try {
    const { values } = parseArgs({ options: { host: { type: 'string' }, project: { type: 'string' }, 'dry-run': { type: 'boolean', default: false } }, allowPositionals: false });
    const result = await installSkill({ host: values.host, project: values.project, dryRun: values['dry-run'] });
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(`Install failed: ${error.message}`);
    process.exitCode = 1;
  }
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) await main();
