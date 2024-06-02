import { startProxy } from './services/proxy';
import { startPuppeteerSession } from './services/puppeteer';

console.log('[chrome-controller] Started');

startProxy().then(() => {
  startPuppeteerSession(false, { vh: 1080, vw: 1920 });
});

setInterval(() => {
  // Keep the event loop busy
}, 10 * 1000);
