import { KnownDevices } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import PrefsPlugin from 'puppeteer-extra-plugin-user-preferences';
import { WebSocket } from 'ws';

puppeteer.use(StealthPlugin());
puppeteer.use(PrefsPlugin());

export async function startSession(ws: WebSocket) {
  // Launch the browser
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser',
    headless: false,
    args: [
      '--start-fullscreen',
      '--kiosk',
      '--disable-infobars',
      '--disable-session-crashed-bubble',
      '--noerrdialogs',
    ],
    ignoreDefaultArgs: ['--enable-automation'],
  });

  // Create a page
  const page = await browser.newPage();
  await page.emulate(KnownDevices['iPhone SE']);

  // Go to your site
  await page.goto('https://accounts.google.com');

  await page.waitForSelector('input[type="email"]');
  await page.waitForSelector('input[type="password"]');

  const elements = await page.$$('input[type="email"], input[type="password"]');

  const boundingBoxes = await Promise.all(
    elements.map(async (element) => {
      return element.boundingBox();
    })
  );

  boundingBoxes
    .filter((el) => el)
    .forEach((bb) => {
      const bufferLike = Buffer.from(JSON.stringify(bb));
      ws?.send(bufferLike);
    });

  return browser;
}
