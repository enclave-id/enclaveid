import express from 'express';
import { WebSocket, WebSocketServer } from 'ws';
import { startSession } from './startSession';
import { Browser } from 'puppeteer';
import cors from 'cors';

let ws: WebSocket = null;
let browser: Browser = null;

const wss = new WebSocketServer({ port: 8081 });
wss.on('connection', (socket) => {
  console.log('WS connected');
  ws = socket;
  ws.on('error', console.error);
});

wss.on('close', () => {
  if (browser) browser.close();
});

const app = express();

app.use(cors());

app.get('/start', async (req, res) => {
  browser = await startSession(ws);
  res.status(200).send('Session started');
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/start`);
});
server.on('error', console.error);
