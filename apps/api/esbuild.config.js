// General usage
const { build } = require('esbuild')

build({
  outdir: 'dist/apps/api',
  sourcemap: true,
  outExtension: { '.js': '.js' },
}).catch(() => process.exit(1))



