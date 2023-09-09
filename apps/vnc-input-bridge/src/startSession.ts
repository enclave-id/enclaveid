import { Page } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import PrefsPlugin from 'puppeteer-extra-plugin-user-preferences';
import { WebSocket } from 'ws';
import { exec } from 'node:child_process';
import { submitTakeoutRequest } from './submitTakeoutRequest';

const displayNumber = ':1';

puppeteer.use(StealthPlugin());
puppeteer.use(PrefsPlugin());

function killVncServer() {
  exec(`vncserver -kill ${displayNumber}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error output: ${stderr}`);
      return;
    }
    console.log(`VNC server stopped on display ${displayNumber}`);
  });
}

function finish(ws: WebSocket) {
  ws.send(
    Buffer.from(
      JSON.stringify({
        type: 'finished',
      })
    ),
    (err) => {
      if (!err) {
        killVncServer();
      }
    }
  );
}

async function updateBoundingBoxes(ws: WebSocket, page: Page) {
  const elements = await page.$$('input[type="email"], input[type="password"]');

  const boundingBoxes = await Promise.all(
    elements.map(async (element) => {
      return element?.boundingBox();
    })
  );

  boundingBoxes
    .filter((el) => el)
    .forEach((bb) => {
      ws.send(
        Buffer.from(
          JSON.stringify({
            type: 'boundingBox',
            data: bb,
          })
        )
      );
    });

  await page.setRequestInterception(true);

  page.on('request', (request) => {
    if (request.resourceType() === 'document') {
      if (request.url() == 'https://takeout.google.com') {
        finish(ws);
      }
    }
    request.continue();
  });

  page.on('framenavigated', async (frame) => {
    await updateBoundingBoxes(ws, frame.page());
  });
}

export async function startSession(
  ws: WebSocket,
  viewport: { vh: number; vw: number }
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
      isMobile: true,
    },
  });

  const page = await browser.newPage();

  await page.goto('https://takeout.google.com');

  await updateBoundingBoxes(ws, page);

  return browser;
}
