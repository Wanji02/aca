import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
import { parse } from 'yaml';
import { validateRecord } from './validate-record.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const skill = path.join(root, 'skills/aca-connect');
const skillText = await readFile(path.join(skill, 'SKILL.md'), 'utf8');
const frontmatter = skillText.match(/^---\r?\n([\s\S]*?)\r?\n---/);
assert.ok(frontmatter, 'Missing skill frontmatter.');
const meta = parse(frontmatter[1]);
assert.equal(meta.name, 'aca-connect');
assert.ok(typeof meta.description === 'string' && meta.description.length > 0 && meta.description.length <= 1024);
const ui = parse(await readFile(path.join(skill, 'agents/openai.yaml'), 'utf8'));
assert.ok(ui.interface.default_prompt.includes('$aca-connect'));

async function walk(dir) {
  const all = [];
  for (const item of await readdir(dir, { withFileTypes: true })) {
    if (['node_modules', '.git', 'runtime', 'connections', '.agents', '.claude'].includes(item.name)) continue;
    const filename = path.join(dir, item.name);
    if (item.isDirectory()) all.push(...await walk(filename));
    else if (item.isFile()) all.push(filename);
    else throw new Error('Unexpected non-regular package entry.');
  }
  return all;
}

const files = await walk(root);
for (const filename of files) {
  const text = await readFile(filename, 'utf8');
  assert.ok(!/[\u3400-\u9fff]/u.test(text), `Non-English package content: ${path.relative(root, filename)}`);
  if (filename.endsWith('.json')) JSON.parse(text);
  if (!filename.endsWith('.md')) continue;
  for (const [, link] of text.matchAll(/\]\(([^)]+)\)/g)) {
    if (/^[a-z][a-z0-9+.-]*:/i.test(link) || link.startsWith('#')) continue;
    const target = path.resolve(path.dirname(filename), decodeURIComponent(link.split('#')[0]));
    assert.ok(files.includes(target), `Missing linked file in ${path.relative(root, filename)}: ${link}`);
    if (filename.startsWith(skill + path.sep)) assert.ok(target.startsWith(skill + path.sep), 'Installed skill has a repository-relative dependency.');
  }
}
const template = JSON.parse(await readFile(path.join(skill, 'assets/connection.template.json'), 'utf8'));
assert.deepEqual(validateRecord(template), { valid: true, errors: [] });
const publicTemplate = JSON.parse(await readFile(path.join(root, 'templates/connection.json'), 'utf8'));
assert.deepEqual(publicTemplate, template, 'Repository convenience template differs from the bundled skill template.');
console.log(JSON.stringify({ packageFiles: files.length, skillFrontmatter: true, selfContainedSkillLinks: true, templateValid: true, englishContent: true }));
