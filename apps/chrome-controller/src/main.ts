import axios from 'axios';
import { createConnPayload } from './constants';

// /api/session/data/postgresql/connections


axios.post(
  'http://localhost:3000/api/session/data/postgresql/connections',
  createConnPayload,
);

setInterval(() => {
  console.log('Just waiiting and logging');
}, 10 * 1000);
