import { execa } from 'execa';
import fsExtra from 'fs-extra';
import { glob } from 'glob';
import {generateTableOfContentsForMarkdown} from '../../src/generate-table-of-contents-for-markdown.js'

generate()

async function generate() {
  const { stdout: username } = await execa('git', ['config', '--global', 'user.name'], {reject: false,  verbose: true});
  if (!username) {
    await execa('git', ['config', '--global', 'user.name', 'FreePhoenix888'], { verbose: true});
  }
  const { stdout: email } = await execa('git', ['config', '--global', 'user.email'], {reject: false,  verbose: true});
  if (!email) {
    await execa('git', ['config', '--global', 'user.email', 'freephoenix888@gmail.com'], { verbose: true});
  }

  const files = await glob('./dist/cli/*.js');
  const fileExecutePermissions = '755';
  for (const file of files) {
    await fsExtra.chmod(file, fileExecutePermissions);
  }

  const readmeFilePath = 'README.md';
  let readmeContents = await fsExtra.readFile(readmeFilePath, 'utf8');
 
  const tableOfContents = await generateTableOfContentsForMarkdown({
    markdownFilePath: readmeFilePath,
    rootHeaderLevel: 2,
  })
  readmeContents = readmeContents.replace(/(?<start><!-- ACTUAL_TABLE_OF_CONTENTS_START -->)[\S\s]*(?<end><!-- ACTUAL_TABLE_OF_CONTENTS_END -->)/g, `$<start>\n${tableOfContents}\n$<end>`);

  await fsExtra.writeFile(readmeFilePath, readmeContents);

  await execa(`git`, ['add', readmeFilePath], { verbose: true});
  const execResultAfterReadmeUpdate = await execa('git', ['diff', '--staged', '--quiet'], { reject: false ,  verbose: true});
  if (execResultAfterReadmeUpdate.exitCode === 0) {
    console.log("No changes to commit");
  }
  else {
    await execa('git', ['commit', '-m', 'Update README.md'], { verbose: true});
    await execa('git', ['push', 'origin', 'main'], { verbose: true});
  }

  // Generate the docs first
  await execa('npx', ['typedoc', './src/main.ts'], { verbose: true});

  // Stage and commit the docs in the main branch
  await execa('git', ['add', 'docs'], { verbose: true});
  await execa('git', ['commit', '-m', 'Update documentation'], { verbose: true});

  await execa('git', ['fetch', 'origin'], { verbose: true});
  // Check if the gh-pages branch exists
  const { stdout: ghPagesBranchExists } = await execa('git', ['branch', '-r', '--list', 'origin/gh-pages'], {reject: false,  verbose: true});

  if (!ghPagesBranchExists) {
    // If it doesn't exist, create it as an orphan branch
    await execa('git', ['checkout', '--orphan', 'gh-pages'], { verbose: true});
  } else {
    // If it does exist, just checkout to it
    await execa('git', ['checkout', 'gh-pages'], { verbose: true});
  }

  // Checkout the docs from the main branch to the gh-pages branch
  await execa('git', ['checkout', 'main', '--', 'docs'], { verbose: true});

  // Commit and push the changes
  await execa('git', ['commit', '-m', 'Update documentation'], { verbose: true});
  await execa('git', ['push', 'origin', 'gh-pages'], { verbose: true});

  // Switch back to the main branch
  await execa('git', ['checkout', 'main'], { verbose: true});
  

};