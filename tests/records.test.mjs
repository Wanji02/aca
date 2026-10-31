import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { validateRecord, checkFile } from '../scripts/validate-record.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const template = JSON.parse(await readFile(new URL('../templates/connection.json', import.meta.url), 'utf8'));
const fixture = JSON.parse(await readFile(new URL('../examples/records/fixture-verified.json', import.meta.url), 'utf8'));
const clone = value => structuredClone(value);

test('setup template is valid without invented evidence', () => assert.equal(validateRecord(template).valid, true));
test('fixture evidence is structurally valid but explicitly not a real-target claim', () => {
  assert.equal(validateRecord(fixture).valid, true);
  assert.equal(fixture.capabilities[0].verification.scope, 'fixture');
});
test('validation does not modify a record', () => {
  const input = clone(fixture), before = clone(input);
  validateRecord(input);
  assert.deepEqual(input, before);
});

const mutations = [
  ['unsupported contract version', r => { r.record_version = '99.0.0'; }],
  ['unknown top-level field', r => { r.secret_value = 'synthetic-only'; }],
  ['unknown nested field', r => { r.target.password = 'synthetic-only'; }],
  ['status typo', r => { r.capabilities[0].status = 'success'; }],
  ['verified without evidence', r => { r.capabilities[0].verification = null; }],
  ['verified without entry point', r => { r.capabilities[0].entry_point = null; }],
  ['partial without evidence', r => { r.capabilities[0].status = 'partial'; r.capabilities[0].verification = null; }],
  ['verification without artifacts', r => { r.capabilities[0].verification.evidence_refs = []; }],
  ['invalid calendar timestamp', r => { r.capabilities[0].verification.checked_at = '2026-02-30T12:00:00Z'; }],
  ['timestamp without timezone', r => { r.capabilities[0].verification.checked_at = '2026-10-31T12:00:00'; }],
  ['stale environment binding', r => { r.environment.context_revision = 'r2'; }],
  ['duplicate capability name', r => { r.capabilities.push(clone(r.capabilities[0])); }],
  ['persistent process without stop procedure', r => { r.lifecycle.mode = 'persistent'; }],
  ['credential object in place of reference', r => { r.credential_refs = [{ name: 'example', value: 'synthetic-only' }]; }],
  ['empty target binding', r => { r.target.identity_ref = '   '; }],
  ['missing host context', r => { delete r.environment.host; }],
];
for (const [name, mutate] of mutations) test(`rejects ${name}`, () => {
  const record = clone(fixture); mutate(record);
  assert.equal(validateRecord(record).valid, false);
});

test('unknown write outcome can be retained without a success claim', () => {
  const record = clone(fixture);
  record.capabilities[0].status = 'unknown';
  record.capabilities[0].verification = null;
  record.limitations = ['Synthetic timeout; outcome not yet reconciled.'];
  assert.equal(validateRecord(record).valid, true);
});
test('persistent connection with explicit ownership is valid', () => {
  const record = clone(fixture);
  record.lifecycle = { mode: 'persistent', start: 'local-start-reference', health_check: 'local-health-reference', recover: null, stop: 'local-stop-reference', owned_resources: ['fixture-worker'] };
  assert.equal(validateRecord(record).valid, true);
});
test('capabilities are verified independently', () => {
  const record = clone(fixture);
  record.capabilities.push({ name: 'fixture.write', status: 'unsupported', entry_point: null, verification: null });
  assert.equal(validateRecord(record).valid, true);
});
test('declared negative fixture is rejected', async () => {
  const record = JSON.parse(await readFile(new URL('../examples/records/invalid-stale.json', import.meta.url), 'utf8'));
  assert.equal(validateRecord(record).valid, false);
});
test('CLI exit codes distinguish valid, invalid, and unreadable records', () => {
  const run = arg => spawnSync(process.execPath, ['scripts/validate-record.mjs', arg], { cwd: root, encoding: 'utf8' });
  assert.equal(run('templates/connection.json').status, 0);
  assert.equal(run('examples/records/invalid-stale.json').status, 1);
  assert.equal(run('examples/records/not-present.json').status, 2);
});
test('validation never executes an entry point or reads an evidence reference', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'aca-record-'));
  try {
    const record = clone(fixture);
    record.capabilities[0].entry_point = { kind: 'command', reference: 'This is intentionally not an executable command.', input_description: 'No arguments.' };
    record.capabilities[0].verification.evidence_refs = ['https://example.invalid/not-fetched'];
    await writeFile(path.join(dir, 'record.json'), JSON.stringify(record));
    assert.equal((await checkFile(path.join(dir, 'record.json'))).valid, true);
  } finally { await rm(dir, { recursive: true, force: true }); }
});
test('invalid JSON and oversized input do not echo input contents', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'aca-input-'));
  try {
    const filename = path.join(dir, 'input.json');
    await writeFile(filename, '{"private-test-marker":');
    let r = spawnSync(process.execPath, [path.join(root, 'scripts/validate-record.mjs'), filename], { encoding: 'utf8' });
    assert.equal(r.status, 2);
    assert.ok(!r.stderr.includes('private-test-marker'));
    await writeFile(filename, Buffer.from([123, 34, 120, 34, 58, 34, 255, 34, 125]));
    r = spawnSync(process.execPath, [path.join(root, 'scripts/validate-record.mjs'), filename], { encoding: 'utf8' });
    assert.equal(r.status, 2);
    await writeFile(filename, ' '.repeat(1024 * 1024 + 1));
    r = spawnSync(process.execPath, [path.join(root, 'scripts/validate-record.mjs'), filename], { encoding: 'utf8' });
    assert.equal(r.status, 2);
  } finally { await rm(dir, { recursive: true, force: true }); }
});
