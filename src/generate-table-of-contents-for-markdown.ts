import fs from 'fs';

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
}

/**
 * Generates a table of contents for a markdown file
 */
export async function generateTableOfContentsForMarkdown(options: GenerateTableOfContentsForMarkdownOptions): Promise<string> {
  const {
    markdownFilePath,
    rootHeaderLevel = 1
  } = options;

  const markdownFile = fs.readFileSync(markdownFilePath, 'utf-8');

  const headers = markdownFile.match(/(#+) (.*)/g);

  if (!headers) {
    throw new Error(`No headers found in the provided markdown file.`);
  }

  let tableOfContents = `${`#`.repeat(rootHeaderLevel)} Table of Contents\n`;

  headers.forEach(header => {
    const level = header.split(' ')[0].length - 1;
    const title = header.split(' ').slice(1).join(' ');
    const link = title.replace(/ /g, '-').toLowerCase();
    tableOfContents += `${'  '.repeat(level)}- [${title}](#${link})\n`;
  });

  return tableOfContents;
}
