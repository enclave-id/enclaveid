/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';

// Import puppeteer
import puppeteer from 'puppeteer';

import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });
let ws = null;
wss.on('connection', function connection(socket) {
  console.log('WS connected');
  ws = socket;
  ws.on('error', console.error);
});

(async () => {
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
    ws.send(bb);
  });

  // Dispose of handle
  //await element.dispose();
})();

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to vnc-input-bridge!' });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
