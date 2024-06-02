import { Page } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import PrefsPlugin from 'puppeteer-extra-plugin-user-preferences';
import UserDataDirPlugin from 'puppeteer-extra-plugin-user-data-dir';
import { ChromeUserEventEnum, toEventPayload } from '@enclaveid/shared';
import { redis } from '@enclaveid/backend';

const podName = process.env.HOSTNAME;

puppeteer.use(PrefsPlugin()).use(UserDataDirPlugin()).use(StealthPlugin());

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

  inputOverlays.forEach((inputOverlay) => {
    // TODO: Specify url for each input overlay
    redis.xadd(
      podName,
      '*',
      'event',
      toEventPayload(ChromeUserEventEnum.NEW_BOUNDING_BOX, inputOverlay),
    );
  });
}
const handledPages = new Set();
async function setupRequestHandling(page: Page, isMobile: boolean) {
  if (handledPages.has(page)) return;

  handledPages.add(page);

  await page.setRequestInterception(true);
  page.on('request', async (request) => {
    if (
      request.resourceType() === 'document' &&
      request.url().includes('https://takeout.google.com')
    ) {
      redis.xadd(
        podName,
        '*',
        'event',
        toEventPayload(ChromeUserEventEnum.LOGIN_SUCCESS),
      );

      //scrapeGoogleTakeout(page);
    }
    request.continue();
  });

  page.on('framenavigated', async (frame) => {
    if (frame === page.mainFrame()) {
      await setupRequestHandling(frame.page(), isMobile); // Call this function recursively for new main frame navigations
      if (isMobile) {
        await updateBoundingBoxes(page);
      }
    }
  });
}

export async function startPuppeteerSession(
  isMobile: boolean,
  viewport: { vh: number; vw: number },
) {
  const { vh, vw } = viewport;

  const browser = await puppeteer.launch({
    executablePath:
      process.env['CHROME_BIN'] ||
      '/chrome/linux-116.0.5793.0/chrome-linux64/chrome',
    headless: false,
    //userDataDir: '/tmp/fakeOauth',
    args: [
      '--start-fullscreen',
      '--kiosk',
      '--disable-infobars',
      '--disable-session-crashed-bubble',
      '--noerrdialogs',
      `--window-size=${vw},${vh}`,
      '--no-sandbox',
      '--proxy-server=http://localhost:8000',
    ],
    ignoreDefaultArgs: ['--enable-automation'],
    defaultViewport: {
      height: vh,
      width: vw,
      isMobile: isMobile,
    },
  });

  const page = await browser.newPage();

  await redis.xadd(
    podName,
    '*',
    'event',
    toEventPayload(ChromeUserEventEnum.CHROME_READY),
  );

  await page.goto('https://takeout.google.com');

  setupRequestHandling(page, isMobile);

  return browser;
}
