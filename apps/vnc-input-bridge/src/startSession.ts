import { Page } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import PrefsPlugin from 'puppeteer-extra-plugin-user-preferences';
import { WebSocket } from 'ws';

puppeteer.use(StealthPlugin());
puppeteer.use(PrefsPlugin());

async function updateBoundingBoxes(page: Page, ws: WebSocket) {
  const elements = await page.$$('input[type="email"], input[type="password"]');

  const boundingBoxes = await Promise.all(
    elements.map(async (element) => {
      return element?.boundingBox();
    })
  );

  boundingBoxes
    .filter((el) => el)
    .forEach((bb) => {
      const bufferLike = Buffer.from(JSON.stringify(bb));
      ws?.send(bufferLike);
    });

  const client = await page.target().createCDPSession();
  await client.send('Page.enable');

  client.on('Page.frameStartedLoading', (event) => {
    console.log(event);
  });

  page.on('framenavigated', async (frame) => {
    await updateBoundingBoxes(frame.page(), ws);
  });
}

export async function startSession(ws: WebSocket, vh: number, vw: number) {
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
    defaultViewport: {
      height: vh,
      width: vw,
      isMobile: true,
    },
  });

  const page = await browser.newPage();

  await page.goto('https://takeout.google.com');

  await updateBoundingBoxes(page, ws);

  return browser;
}
