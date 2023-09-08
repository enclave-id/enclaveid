import { Page } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import PrefsPlugin from 'puppeteer-extra-plugin-user-preferences';
import { WebSocket } from 'ws';

puppeteer.use(StealthPlugin());
puppeteer.use(PrefsPlugin());

async function updateBoundingBoxes(page: Page, ws: WebSocket) {
  await page.waitForNavigation();

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

  page.on('framenavigated', async (frame) => {
    const newPage = frame.page();
    await updateBoundingBoxes(newPage, ws);
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

  await page.goto('https://accounts.google.com');

  await updateBoundingBoxes(page, ws);

  return browser;
}
