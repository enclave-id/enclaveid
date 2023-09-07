import express from 'express';
import { WebSocketServer } from 'ws';
import { startSession } from './startSession';

const wss = new WebSocketServer({ port: 8081 });
let ws = null;
wss.on('connection', function connection(socket) {
  console.log('WS connected');
  ws = socket;
  ws.on('error', console.error);
});

const app = express();

app.get('/start', (req, res) => {
  startSession(ws);
  res.status(200).send('Session started');
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/start`);
});
server.on('error', console.error);
