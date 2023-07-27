import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { generateTableOfContentsForMarkdown, GenerateTableOfContentsForMarkdownOptions, OutputOptions } from '../generate-table-of-contents-for-markdown'; // Import function and types from your actual module
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
  })
  .option('output.file-path', {
    describe: 'Path of the output file',
    type: 'string',
    demandOption: true,
  })
  .option('output.write-mode', {
    describe: 'Write mode for the output',
    choices: ['overwrite', 'append', 'replace-placeholder'],
    demandOption: true,
  })
  .option('output.placeholder-start', {
    describe: 'Start of the placeholder text (only needed for replace-placeholder mode)',
    type: 'string',
  })
  .option('output.placeholder-end', {
    describe: 'End of the placeholder text (only needed for replace-placeholder mode)',
    type: 'string',
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
