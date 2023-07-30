import fsExtra from 'fs-extra';
import debug from 'debug';

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

export type GenerateTableOfContentsForMarkdownOptions = {
  /**
   * Output options
   */
  output?: OutputOptions;
} & (
  {
      /**
   * Path of the markdown file
   */
  markdownFilePath: string;
  } | {
    /**
     * Markdown content
     */
    markdown: string;
  }
)

/**
 * Generates a table of contents for a markdown file
 */
export async function generateTableOfContentsForMarkdown(options: GenerateTableOfContentsForMarkdownOptions): Promise<string> {
  const log = debug('generate-table-of-contents-for-markdown');
  log({options})

  const markdown = 'markdown' in options ? options.markdown : fsExtra.readFileSync(options.markdownFilePath, 'utf-8');
  log({markdown})

  const headers = markdown.match(/(#+) (.*)/g);
  log({headers})

  if (!headers) {
    throw new Error(`No headers found in the provided markdown file.`);
  }

  let tableOfContents = ``;

  headers.forEach(header => {
    log({header})
    const level = header.split(' ')[0].length - 1;
    log({level})
    const title = header.split(' ').slice(1).join(' ');
    log({title})
    const link = title.replace(/ /g, '-').toLowerCase();
    log({link})
    tableOfContents += `${'  '.repeat(level)}- [${title}](#${link})\n`;
    log({tableOfContents})
  });

  if(options.output) {
    if(options.output.writeMode === 'replace-placeholder') {
      const placeholderStart = options.output.placeholder.start;
      log({placeholderStart})
      const placeholderEnd = options.output.placeholder.end;
      log({placeholderEnd})
      const placeholderRegex = new RegExp(`${placeholderStart}[\\S\\s]*${placeholderEnd}`, 'g');
      log({placeholderRegex})
      const filePath = options.output.filePath;
      log({filePath})
      const newFileContents = markdown.replace(placeholderRegex, `${placeholderStart}\n${tableOfContents}\n${placeholderEnd}`);
      log({newFileContents})
      fsExtra.writeFileSync(filePath, newFileContents)
    } else if(options.output.writeMode === 'append') {
      fsExtra.appendFileSync(options.output.filePath, tableOfContents)
    } else if(options.output.writeMode === 'overwrite') {
      fsExtra.writeFileSync(options.output.filePath, tableOfContents)
    }
  }

  return tableOfContents;
}
