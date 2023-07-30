import { glob } from 'glob';
import {generateDocumentation} from '@deep-foundation/npm-automation'
import path from 'path';
import fsExtra from 'fs-extra';

main();

async function main() {
  const cliAppFilePaths = await glob(`./dist/cli/*.js`, {absolute: true})
  for (const cliAppFilePath of cliAppFilePaths) {
    fsExtra.chmodSync(cliAppFilePath, '755');
  }
  await generateDocumentation({
    generateTableOfContentsForMarkdownOptions: {
      markdownFilePath: `./README.md`,
      output: {
        writeMode: 'replace-placeholder',
        placeholder: {
          start: `<!-- ACTUAL_TABLE_OF_CONTENTS_START -->`,
          end: `<!-- ACTUAL_TABLE_OF_CONTENTS_END -->`
        },
        filePath: `./README.md`,
      }
    }
  })
};