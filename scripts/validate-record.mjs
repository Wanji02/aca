import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const schemaPath = fileURLToPath(new URL('../skills/aca-connect/references/connection.schema.json', import.meta.url));
const ajv = new Ajv2020({ allErrors: true, strict: true, verbose: false });
addFormats(ajv, ['date-time']);
const checkSchema = ajv.compile(JSON.parse(await readFile(schemaPath, 'utf8')));

export function validateRecord(record) {
  if (!checkSchema(record)) {
    return { valid: false, errors: checkSchema.errors.map(({ instancePath, keyword, message }) => ({ path: instancePath, keyword, message })) };
  }
  const errors = [];
  const names = new Set();
  record.capabilities.forEach((capability, index) => {
    if (names.has(capability.name)) {
      errors.push({ path: `/capabilities/${index}/name`, keyword: 'uniqueCapability', message: 'Capability names must be unique.' });
    }
    names.add(capability.name);
    if (capability.verification && capability.verification.context_revision !== record.environment.context_revision) {
      errors.push({ path: `/capabilities/${index}/verification/context_revision`, keyword: 'currentContext', message: 'Verification belongs to a different environment revision.' });
    }
  });
  return { valid: errors.length === 0, errors };
}

export async function checkFile(filename) {
  const info = await stat(filename);
  if (!info.isFile() || info.size > 1024 * 1024) throw new Error('Record must be a regular file no larger than 1 MiB.');
  let record;
  try {
    record = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(await readFile(filename)));
  } catch {
    throw new Error('Record is not valid UTF-8 JSON.');
  }
  return validateRecord(record);
}

async function main(args) {
  if (args.length !== 1 || args[0].startsWith('--')) {
    console.error('Usage: node scripts/validate-record.mjs <connection.json>');
    process.exitCode = 2;
    return;
  }
  try {
    const result = await checkFile(args[0]);
    console.log(JSON.stringify(result, null, 2));
    process.exitCode = result.valid ? 0 : 1;
  } catch {
    console.error(JSON.stringify({ valid: false, error: 'Cannot validate record: unreadable, oversized, or invalid JSON input.' }));
    process.exitCode = 2;
  }
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  await main(process.argv.slice(2));
}
