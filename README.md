[![npm](https://img.shields.io/npm/v/@freephoenix888/generate-table-of-contents-for-markdown.svg)](https://www.npmjs.com/package/@freephoenix888/generate-table-of-contents-for-markdown)
[![Gitpod](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/freephoenix888/generate-table-of-contents-for-markdown) 

Generates table of contents for markdown

# Table Of Contents
<!-- Do not remove these comments because they are used for automatic generation -->
<!-- ACTUAL_TABLE_OF_CONTENTS_START -->
- [Table Of Contents](#table-of-contents)
- [Quick Start](#quick-start)
- [What can it be used for?](#what-can-it-be-used-for)
- [Library](#library)
  - [Cli Usage](#cli-usage)
  - [Cli Usage Ways](#cli-usage-ways)
      - [Directly running using npx](#directly-running-using-npx)
      - [Global Installation](#global-installation)
        - [Global installation and running using binary name](#global-installation-and-running-using-binary-name)
        - [Global installation and running using npx](#global-installation-and-running-using-npx)
      - [Local installation](#local-installation)
        - [Local installation and running using npx](#local-installation-and-running-using-npx)
        - [Local installation and running using npm script](#local-installation-and-running-using-npm-script)

<!-- ACTUAL_TABLE_OF_CONTENTS_END -->

# Quick Start
- Add the following to your README.md
  ```markdown
  # Table Of Contents
  <!-- TABLE_OF_CONTENTS_START -->
- [Table Of Contents](#table-of-contents)
- [Quick Start](#quick-start)
- [Table Of Contents](#table-of-contents)
- [What can it be used for?](#what-can-it-be-used-for?)
- [Library](#library)
  - [Cli Usage](#cli-usage)
  - [Cli Usage Ways](#cli-usage-ways)
      - [Directly running using npx](#directly-running-using-npx)
      - [Global Installation](#global-installation)
        - [Global installation and running using binary name](#global-installation-and-running-using-binary-name)
        - [Global installation and running using npx](#global-installation-and-running-using-npx)
      - [Local installation](#local-installation)
        - [Local installation and running using npx](#local-installation-and-running-using-npx)
        - [Local installation and running using npm script](#local-installation-and-running-using-npm-script)

<!-- TABLE_OF_CONTENTS_END -->)/;
  const replacement = '$1\n' + generatedUsageWays + '\n$2';
  const newReadme = readme.replace(pattern, replacement);
  writeFileSync(markdownFilePath, newReadme);
  ```

# What can it be used for?
You can use it to generate table of contents for your markdown files. For example for readme.MD files


# Library
See [Documentation] for examples and API


## Cli Usage
<!-- CLI_HELP_START -->

<!-- CLI_HELP_END -->

## Cli Usage Ways
<!-- Do not remove these comments because they are used for automatic generation -->
<!-- ACTUAL_CLI_USAGE_WAYS_START -->
If you are going to use this package in a project - it is recommended to install it is [Locally](#local-installation)  
If you are going to use this package for yourself - it is recommended to install it [Globally](#global-installation) or run it directly using [npx](#directly-running-using-npx)
#### Directly running using npx
```shell
npx --yes @freephoenix888/generate-table-of-contents-for-markdown
```

#### Global Installation
##### Global installation and running using binary name
```shell
npm install --global @freephoenix888/generate-table-of-contents-for-markdown
generate-table-of-contents-for-markdown
```

##### Global installation and running using npx
```shell
npm install --global @freephoenix888/generate-table-of-contents-for-markdown
npx generate-table-of-contents-for-markdown
```

#### Local installation

##### Local installation and running using npx
```shell
npm install @freephoenix888/generate-table-of-contents-for-markdown
npx generate-table-of-contents-for-markdown
```

##### Local installation and running using npm script
```shell
npm install @freephoenix888/generate-table-of-contents-for-markdown
```
Add npm script to package.json. Note that you can name  your script as you want but it must call binary file provided by the package
```json
{
  "scripts": {
    "generate-table-of-contents-for-markdown": "generate-table-of-contents-for-markdown"
  }
}
```
and run
```shell
npm run generate-table-of-contents-for-markdown
```
  <!-- ACTUAL_CLI_USAGE_WAYS_END -->
  


[Documentation]: https://freephoenix888.github.io/generate-table-of-contents-for-markdown/