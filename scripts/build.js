/* eslint-disable @typescript-eslint/no-var-requires */
const esbuild = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');

const args = process.argv.slice(2);

esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  target: ['node10.4'],
  outfile: 'lib/index.js',
  plugins: [nodeExternalsPlugin()],
  watch: args.includes('--watch'),
});
