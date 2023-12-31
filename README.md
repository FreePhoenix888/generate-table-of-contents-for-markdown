[![npm](https://img.shields.io/npm/v/@freephoenix888/generate-table-of-contents-for-markdown.svg)](https://www.npmjs.com/package/@freephoenix888/generate-table-of-contents-for-markdown)
[![Gitpod](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/freephoenix888/generate-table-of-contents-for-markdown) 

Generates table of contents for markdown

# Table Of Contents
<!-- Do not remove these comments because they are used for automatic generation -->
<!-- ACTUAL_TABLE_OF_CONTENTS_START -->
- [Table Of Contents](#table-of-contents)
- [Quick Start](#quick-start)
- [Library](#library)

<!-- ACTUAL_TABLE_OF_CONTENTS_END -->

# Quick Start
- Add the following to your README.md
  ```markdown
  <!-- TABLE_OF_CONTENTS_START -->
  <!-- TABLE_OF_CONTENTS_END -->
  ```
- Run this javascript code
  ```javascript
  import {readFileSync, writeFileSync} from 'fs';
  import {generateUsageWaysOfNpmCliApps} from '@freephoenix888/generate-table-of-contents-for-markdown';

  const generatedUsageWays = generateTableOfContentsForMarkdown({
    markdownFilePath,
    output: {
      writeMode: 'replace-placeholder',
      placeholder: {
        start: `<!-- TABLE_OF_CONTENTS_START -->`,
        end: `<!-- TABLE_OF_CONTENTS_END -->`,
      },
      filePath: 'README.md'
    }
  });
  console.log(generatedUsageWays)
  ```


# Library
See [Documentation] for examples and API


[Documentation]: https://freephoenix888.github.io/generate-table-of-contents-for-markdown/
