export function validateArgs (argv: Record<string, any>) {
    if (
      argv['output.write-mode'] === 'replace-placeholder' &&
      (!argv['output.placeholder.start'] || !argv['output.placeholder.end'])
    ) {
      throw new Error(
        'Please provide both "output.placeholder.start" and "output.placeholder.end" when write mode is "replace-placeholder"'
      );
    } else if (
      argv['output.write-mode'] !== 'replace-placeholder' &&
      (argv['output.placeholder.start'] !==
        '<!-- TABLE_OF_CONTENTS_START -->' ||
        argv['output.placeholder.end'] !== '<!-- TABLE_OF_CONTENTS_END -->')
    ) {
      throw new Error(
        'Do not provide "output.placeholder.start" or "output.placeholder.end" when write mode is not "replace-placeholder"'
      );
    }
    return true;
}