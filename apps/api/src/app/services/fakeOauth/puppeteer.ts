import { Page } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import PrefsPlugin from 'puppeteer-extra-plugin-user-preferences';
import { eventEmitter } from './viewportEvents';

puppeteer.use(StealthPlugin());
puppeteer.use(PrefsPlugin());

async function updateBoundingBoxes(page: Page) {
  const elements = await page.$$('input[type="email"], input[type="password"]');

  const inputOverlays = await Promise.all(
    elements
      .map(async (element) => {
        if (!element) return;

        return {
          inputId: await element.evaluate(
            (el) => el.id || el.name || el.className,
          ),
          boundingBox: await element.boundingBox(),
        };
      })
      .filter((el) => el),
  );

  eventEmitter.emit('inputOverlays', inputOverlays);
}

async function handleNextPage(page: Page, isMobile: boolean) {
  await page.setRequestInterception(true);

  page.on('request', (request) => {
    if (request.resourceType() === 'document') {
      if (request.url() == 'https://takeout.google.com') {
        eventEmitter.emit('finishedLogin');
      }
    }
    request.continue();
  });

  page.on('framenavigated', async (frame) => {
    const page = frame.page();
    await handleNextPage(page, isMobile);

    // If isMobile we need to create input overlays
    // so that the keyboard pulls up
    if (isMobile) await updateBoundingBoxes(page);
  });
}

export async function startPuppeteerSession(
  isMobile: boolean,
  viewport: { vh: number; vw: number },
) {
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
      height: viewport.vh,
      width: viewport.vw,
      isMobile: isMobile,
    },
  });

  const page = await browser.newPage();

  await page.goto('https://takeout.google.com');

  await handleNextPage(page, isMobile);

  return browser;
}
