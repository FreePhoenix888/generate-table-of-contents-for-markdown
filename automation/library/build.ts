import { execa } from 'execa';

build()

async function build() { 
  await execa('tsc', {stdio: 'inherit', verbose: true});
};
