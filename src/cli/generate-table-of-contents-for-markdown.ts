#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fsExtra from 'fs-extra';
import { GenerateTableOfContentsForMarkdownOptions, generateTableOfContentsForMarkdown } from '../generate-table-of-contents-for-markdown.js';

const args = yargs(hideBin(process.argv))
  .option('config-file-path', {
    type: 'string',
    description: 'Path to the JSON configuration file',
    demandOption: true
  })
  .parseSync();

const config: GenerateTableOfContentsForMarkdownOptions = fsExtra.readJsonSync(args.configFilePath);
generateTableOfContentsForMarkdown(config);


