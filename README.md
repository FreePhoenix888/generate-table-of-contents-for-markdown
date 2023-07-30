[![npm](https://img.shields.io/npm/v/@freephoenix888/generate-table-of-contents-for-markdown.svg)](https://www.npmjs.com/package/@freephoenix888/generate-table-of-contents-for-markdown)
[![Gitpod](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/freephoenix888/generate-table-of-contents-for-markdown) 

Generates table of contents for markdown

# Table Of Contents
<!-- Do not remove these comments because they are used for automatic generation -->
<!-- ACTUAL_TABLE_OF_CONTENTS_START -->
- [Table Of Contents](#table-of-contents)
- [Quick Start](#quick-start)
- [Table Of Contents](#table-of-contents)
- [What can it be used for?](#what-can-it-be-used-for?)
- [Library](#library)

<!-- ACTUAL_TABLE_OF_CONTENTS_END -->

# Quick Start
- Add the following to your README.md
  ```markdown
  # Table Of Contents
  <!-- TABLE_OF_CONTENTS_START -->
  <!-- TABLE_OF_CONTENTS_END -->
  ```
- Run this javascript code
  ```javascript
  import {readFileSync, writeFileSync} from 'fs';
  import {generateUsageWaysOfNpmCliApps} from '@freephoenix888/generate-table-of-contents-for-markdown';

  const markdownFilePath = 'README.md';

  const generatedUsageWays = generateTableOfContentsForMarkdown({
    markdownFilePath,
  });
  const readme = readFileSync(markdownFilePath, 'utf8');
  const pattern = /(<!-- TABLE_OF_CONTENTS_START -->)[\S\s]*(<!-- TABLE_OF_CONTENTS_END -->)/;
  const replacement = '$1\n' + generatedUsageWays + '\n$2';
  const newReadme = readme.replace(pattern, replacement);
  writeFileSync(markdownFilePath, newReadme);
  ```

# What can it be used for?
You can use it to generate table of contents for your markdown files. For example for readme.MD files


# Library
See [Documentation] for examples and API


[Documentation]: https://freephoenix888.github.io/generate-table-of-contents-for-markdown/