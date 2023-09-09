import express from 'express';
import { WebSocket, WebSocketServer } from 'ws';
import { startSession } from './startSession';
import { Browser } from 'puppeteer';
import cors from 'cors';

const state: {
  ws: WebSocket;
  browser: Browser;
} = {
  ws: null,
  browser: null,
};

const wss = new WebSocketServer({ port: 8081 });
wss.on('connection', (socket) => {
  console.log('WS connected');
  state.ws = socket;
  state.ws.on('error', console.error);

  // Add event listener for consent
  state.ws.onmessage = (event) => {
    console.log(event.data.toString());
  };
});

const app = express();

app.use(cors());

app.get('/start', async (req, res) => {
  state.browser = await startSession(state.ws, {
    vh: parseInt(req.query.vh as string),
    vw: parseInt(req.query.vw as string),
  });
  res.status(200).send('Session started');
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/start`);
});
server.on('error', console.error);
