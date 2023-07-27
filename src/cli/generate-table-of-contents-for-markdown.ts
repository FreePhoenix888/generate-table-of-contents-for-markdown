#!/usr/bin/env node
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { generateTableOfContentsForMarkdown, GenerateTableOfContentsForMarkdownOptions, OutputOptions } from '../generate-table-of-contents-for-markdown.js'; // Import function and types from your actual module
import { validateArgs } from '../validate-args.js';

const argv = yargs(hideBin(process.argv))
  .option('markdown-file-path', {
    describe: 'Path of the markdown file',
    type: 'string',
    demandOption: true,
  })
  .option('root-header-level', {
    describe: 'Header level of the root header',
    type: 'number',
    default: 1,
    demandOption: false,
  })
  .option('output.file-path', {
    describe: 'Path of the output file',
    type: 'string',
    demandOption: false,
  })
  .option('output.write-mode', {
    describe: 'Write mode for the output',
    choices: ['overwrite', 'append', 'replace-placeholder'],
    demandOption: false,
  })
  .option('output.placeholder-start', {
    describe: 'Start of the placeholder text (only needed for replace-placeholder mode)',
    type: 'string',
    demandOption: false,
  })
  .option('output.placeholder-end', {
    describe: 'End of the placeholder text (only needed for replace-placeholder mode)',
    type: 'string',
    demandOption: false,
  })
  .check(validateArgs)
  .parseSync();

async function main() {
  const options: GenerateTableOfContentsForMarkdownOptions = {
    ...argv,
    output: argv.output as OutputOptions,
  };

  try {
    const result = await generateTableOfContentsForMarkdown(options);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
}

main();
