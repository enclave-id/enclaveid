import { startPuppeteerSession } from './services/puppeteer';

console.log('[chrome-controller] Started');

startPuppeteerSession(false, { vh: 1080, vw: 1920 });

setInterval(() => {
  // Keep the event loop busy
}, 10 * 1000);
