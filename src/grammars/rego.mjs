import fs from 'node:fs';

/** @type {import('shiki').LanguageRegistration} */
const rego = JSON.parse(
  fs.readFileSync(new URL('./rego.tmLanguage.json', import.meta.url), 'utf8')
);

export default rego;
