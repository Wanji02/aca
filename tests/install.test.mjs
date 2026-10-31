import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, readdir, mkdir, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { installSkill } from '../scripts/install-skill.mjs';

async function workspace(t) {
  const root = await mkdtemp(path.join(tmpdir(), 'aca-install-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  return root;
}

for (const [host, folder] of [['codex', '.agents'], ['claude', '.claude']]) {
  test(`${host} project layout contains a complete self-contained skill`, async t => {
    const root = await workspace(t);
    const project = path.join(root, 'project with spaces');
    await mkdir(project);
    const result = await installSkill({ host, project });
    assert.equal(result.destination, path.join(project, folder, 'skills/aca-connect'));
    for (const filename of ['SKILL.md', 'agents/openai.yaml', 'references/connection.schema.json', 'references/record-guide.md', 'assets/connection.template.json']) {
      assert.deepEqual(await readFile(path.join(result.destination, filename)), await readFile(new URL(`../skills/aca-connect/${filename}`, import.meta.url)));
    }
  });
}
test('dry run creates no files', async t => {
  const project = await workspace(t);
  const result = await installSkill({ host: 'codex', project, dryRun: true });
  assert.equal(result.installed, false);
  assert.deepEqual(await readdir(project), []);
});
test('existing skill is never overwritten', async t => {
  const project = await workspace(t);
  const result = await installSkill({ host: 'codex', project });
  await writeFile(path.join(result.destination, 'SKILL.md'), 'User customization');
  await assert.rejects(installSkill({ host: 'codex', project }), /already exists/);
  assert.equal(await readFile(path.join(result.destination, 'SKILL.md'), 'utf8'), 'User customization');
});
test('unrelated project files remain unchanged', async t => {
  const project = await workspace(t);
  await writeFile(path.join(project, 'AGENTS.md'), 'Existing instructions');
  await installSkill({ host: 'codex', project });
  assert.equal(await readFile(path.join(project, 'AGENTS.md'), 'utf8'), 'Existing instructions');
});
test('unsupported host is rejected before writing', async t => {
  const project = await workspace(t);
  await assert.rejects(installSkill({ host: 'unknown', project }));
  assert.deepEqual(await readdir(project), []);
});
test('linked host directory cannot redirect installation outside the project', async t => {
  const root = await workspace(t);
  const project = path.join(root, 'project'), outside = path.join(root, 'outside');
  await mkdir(project); await mkdir(outside);
  await symlink(outside, path.join(project, '.agents'), process.platform === 'win32' ? 'junction' : 'dir');
  await assert.rejects(installSkill({ host: 'codex', project }), /link/);
  assert.deepEqual(await readdir(outside), []);
});
