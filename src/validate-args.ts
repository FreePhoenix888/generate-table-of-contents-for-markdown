import { OutputOptions } from './generate-table-of-contents-for-markdown';

export function validateArgs(argv: Record<string, any>) {
  const output = argv.output as OutputOptions;
  if(output) {
    if (
      output.writeMode === 'replace-placeholder' &&
      (!('placeholderStart' in output) || !('placeholderEnd' in output))
    ) {
      throw new Error(
        'Please provide both "output.placeholderStart" and "output.placeholderEnd" when write mode is "replace-placeholder"'
      );
    } else if (
      output.writeMode !== 'replace-placeholder' &&
      ('placeholderStart' in output || 'placeholderEnd' in output)
    ) {
      throw new Error(
        'Do not provide "output.placeholderStart" or "output.placeholderEnd" when write mode is not "replace-placeholder"'
      );
    }
  }

  return true;
}
