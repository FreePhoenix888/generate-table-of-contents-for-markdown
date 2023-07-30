import fsExtra from 'fs-extra';

export interface BaseOutputOptions {
  /**
   * Path of the file to write the table of contents to
   */
  filePath: string;
}

export interface WriteModeOptions {
  /**
   * Write mode for the output
   */
  writeMode: 'overwrite' | 'append' | 'replace-placeholder';
}

export interface OutputOptionsWithoutPlaceholder extends BaseOutputOptions, WriteModeOptions {
  writeMode: 'overwrite' | 'append';
}

export interface Placeholder {
  /**
   * Start of the placeholder text
   */
  start: string;
  /**
   * End of the placeholder text
   */
  end: string;
}

export interface OutputOptionsWithPlaceholder extends BaseOutputOptions, WriteModeOptions {
  writeMode: 'replace-placeholder';
  placeholder: Placeholder;
}

export type OutputOptions = OutputOptionsWithoutPlaceholder | OutputOptionsWithPlaceholder;

export interface GenerateTableOfContentsForMarkdownOptions {
  /**
   * Path of the markdown file
   */
  markdownFilePath: string;
  /**
   * Header level of the root header. Example: If you want generated headers to have 2 hashes, then specify 2 here
   * 
   * @defaultValue
   * 1
   */
  rootHeaderLevel?: number;
  /**
   * Output options
   */
  output?: OutputOptions;
}

/**
 * Generates a table of contents for a markdown file
 */
export async function generateTableOfContentsForMarkdown(options: GenerateTableOfContentsForMarkdownOptions): Promise<string> {
  const {
    markdownFilePath,
    rootHeaderLevel = 1
  } = options;

  const markdownFile = fsExtra.readFileSync(markdownFilePath, 'utf-8');

  const headers = markdownFile.match(/(#+) (.*)/g);

  if (!headers) {
    throw new Error(`No headers found in the provided markdown file.`);
  }

  let tableOfContents = ``;

  headers.forEach(header => {
    const level = header.split(' ')[0].length - 1;
    const title = header.split(' ').slice(1).join(' ');
    const link = title.replace(/ /g, '-').toLowerCase();
    tableOfContents += `${'  '.repeat(level)}- [${title}](#${link})\n`;
  });

  if(options.output) {
    if(options.output.writeMode === 'replace-placeholder') {
      const placeholderStart = options.output.placeholder.start;
      const placeholderEnd = options.output.placeholder.end;
      const placeholderRegex = new RegExp(`${placeholderStart}[\S\s]*${placeholderEnd}`, 'g');
      const filePath = options.output.filePath;
      tableOfContents = tableOfContents.replace(placeholderRegex, `${placeholderStart}\n${tableOfContents}\n${placeholderEnd}`);
      const fileContents = fsExtra.readFileSync(filePath, 'utf-8');
      const newFileContents = fileContents.replace(placeholderRegex, `${placeholderStart}\n${tableOfContents}\n${placeholderEnd}`);
      fsExtra.writeFileSync(filePath, newFileContents)
    } else  {
      const fileContents = fsExtra.readFileSync(options.output.filePath, 'utf-8');
      if(options.output.writeMode === 'append') {
        fsExtra.appendFileSync(options.output.filePath, `${fileContents}\n${tableOfContents}`)
      } else if(options.output.writeMode === 'overwrite') {
        fsExtra.writeFileSync(options.output.filePath, tableOfContents)
      }
    }
  }

  return tableOfContents;
}
