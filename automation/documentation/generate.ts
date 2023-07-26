import { execa } from 'execa';
import fsExtra from 'fs-extra';
import { glob } from 'glob';

generate()

async function generate() {
  const { stdout: username } = await execa('git', ['config', '--global', 'user.name'], {reject: false, stdio: 'inherit', verbose: true});
  if (!username) {
    await execa('git', ['config', '--global', 'user.name', 'FreePhoenix888'], {stdio: 'inherit', verbose: true});
  }
  const { stdout: email } = await execa('git', ['config', '--global', 'user.email'], {reject: false, stdio: 'inherit', verbose: true});
  if (!email) {
    await execa('git', ['config', '--global', 'user.email', 'freephoenix888@gmail.com'], {stdio: 'inherit', verbose: true});
  }

  const files = await glob('./dist/cli/*.js');
  const fileExecutePermissions = '755';
  for (const file of files) {
    await fsExtra.chmod(file, fileExecutePermissions);
  }

  const readmeFilePath = 'README.md';
  let readmeContents = await fsExtra.readFile(readmeFilePath, 'utf8');

  const cliFilePaths = await glob('./dist/cli/*.js');
  
  const cliHelp = await execa('npx', ['@freephoenix888/generate-help-of-cli-apps-in-markdown-format', '--cli-app-file-paths', ...cliFilePaths, '--root-header-level', '2']);
  readmeContents = readmeContents.replace(/(?<start><!-- CLI_HELP_START -->)[\S\s]*(?<end><!-- CLI_HELP_END -->)/g, `$<start>\n${cliHelp.stdout}\n$<end>`);

  const cliUsageWays = await execa('npx', ['@freephoenix888/generate-usage-ways-of-npm-cli-apps-in-markdown-format', '--root-header-level', '2']);
  readmeContents = readmeContents.replace(/(?<start><!-- CLI_USAGE_WAYS_START -->)[\S\s]*(?<end><!-- CLI_USAGE_WAYS_END -->)/g, `$<start>\n${cliUsageWays.stdout}\n$<end>`);

  const { stdout: tableOfContents } = await execa('node', [`./dist/cli/generate-table-of-contents-for-markdown.js`,`--markdown-file-path`, readmeFilePath], {stdio: 'inherit', verbose: true});
  readmeContents = readmeContents.replace(/(?<start><!-- ACTUAL_TABLE_OF_CONTENTS_START -->)[\S\s]*(?<end><!-- ACTUAL_TABLE_OF_CONTENTS_END -->)/g, `$<start>\n${tableOfContents}\n$<end>`);

  await fsExtra.writeFile(readmeFilePath, readmeContents);

  await execa(`git`, ['add', readmeFilePath], {stdio: 'inherit', verbose: true});
  const execResultAfterReadmeUpdate = await execa('git', ['diff', '--staged', '--quiet'], { reject: false , stdio: 'inherit', verbose: true});
  if (execResultAfterReadmeUpdate.exitCode === 0) {
    console.log("No changes to commit");
  }
  else {
    await execa('git', ['commit', '-m', 'Update README.md'], {stdio: 'inherit', verbose: true});
    await execa('git', ['push', 'origin', 'main'], {stdio: 'inherit', verbose: true});
  }

  await execa('npx', ['typedoc', './src/main.ts'], {stdio: 'inherit', verbose: true});
  await execa(`git`, ['add', './docs'], {stdio: 'inherit', verbose: true});
  const execResultAfterAddingDocsFolder = await execa('git', ['diff', '--staged', '--quiet'], { reject: false , stdio: 'inherit', verbose: true});
  if (execResultAfterAddingDocsFolder.exitCode === 0) {
    console.log("No changes to commit");
  }
  else {
    const { stdout: ghPagesBranchExists } = await execa('git', ['branch', '-r', '--list', 'origin/gh-pages'], {reject: false, stdio: 'inherit', verbose: true});

    if (!ghPagesBranchExists) {
      console.log("gh-pages branch doesn't exist. Creating...");
      await execa('git', ['checkout', '--orphan', 'gh-pages'], {stdio: 'inherit', verbose: true});
      await execa('git', ['rm', '--recursive', '--force', '.'], {stdio: 'inherit', verbose: true});
    } else {
      console.log("gh-pages branch exists. Checking out...");
      await execa('git', ['checkout', 'gh-pages'], {stdio: 'inherit', verbose: true});
    }
  
    await execa('git', ['add', 'docs'], {stdio: 'inherit', verbose: true});
    await execa('git', ['commit', '--message', 'Generate documentation'], {stdio: 'inherit', verbose: true});
    await execa('git', ['push', 'origin', 'gh-pages'], {stdio: 'inherit', verbose: true});
    await execa('git', ['checkout', 'main'], {stdio: 'inherit', verbose: true});
  }  

};