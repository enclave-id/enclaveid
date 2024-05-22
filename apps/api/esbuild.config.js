// General usage
const { build } = require('esbuild')
const esbuildPluginPino = require('esbuild-plugin-pino')

const path = require('path');
const fs = require('fs');

const distPath = path.join(__dirname, '..', '..', 'dist', 'apps', 'api');

build({
  outdir: 'dist/apps/api',
  sourcemap: true,
  outExtension: { '.js': '.js' },
  plugins: [esbuildPluginPino({ transports: ['pino-pretty'] })],
}).catch(() => process.exit(1)).finally(() => {

  fs.mkdirSync(distPath + '/lib');
  fs.renameSync(distPath + '/thread-stream-worker.js', distPath + '/lib/worker.js');
  fs.renameSync(distPath + '/thread-stream-worker.js.map', distPath + '/lib/worker.js.map');
  fs.renameSync(distPath + '/pino-pretty.js', distPath + '/pino-pretty-transport.js');
  fs.renameSync(distPath + '/pino-pretty.js.map', distPath + '/pino-pretty-transport.js.map');

});



