#!/usr/bin/env node
import yargs from 'yargs';
import { generateTableOfContentsForMarkdown } from '../generate-table-of-contents-for-markdown.js';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
  .usage(`$0 [Options]`, `Generates a table of contents for a markdown file`)
  .option('markdown-file-path', {
    description: 'Path of the markdown file',
    type: 'string',
    demandOption: true
  })
  .option('root-header-level', {
    description: 'Header level of the root header. Example: If you want generated headers to have 2 hashes, then specify 2 here',
    type: 'number',
    default: 1,
  })
  .help()
  .parseSync();

generateTableOfContentsForMarkdown({
  markdownFilePath: argv.markdownFilePath,
  rootHeaderLevel: argv.rootHeaderLevel,
}).then(console.log)
