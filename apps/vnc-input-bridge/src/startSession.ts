import puppeteer from 'puppeteer';
import { WebSocket } from 'ws';

export async function startSession(ws: WebSocket) {
  // Launch the browser
  const browser = await puppeteer.launch();

  // Create a page
  const page = await browser.newPage();

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

  boundingBoxes.forEach((bb) => {
    const bufferLike = Buffer.from(JSON.stringify(bb));
    ws.send(bufferLike);
  });

  // Dispose of handle
  //await element.dispose();
}
