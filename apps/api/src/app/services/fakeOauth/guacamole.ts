import axios from 'axios';
import qs from 'qs';
import { getCreateConnPayload } from './constants';
import { ChromePod } from '@prisma/client';

const guacamoleApiUrl = `http://enclaveid-guacamole-guacamole.default.svc.cluster.local/api`;

export async function getGuacAuthToken() {
  const {
    data: { authToken },
  } = await axios.post(
    `${guacamoleApiUrl}/tokens`,
    qs.stringify({
      username: process.env.GUACAMOLE_USERNAME,
      password: process.env.GUACAMOLE_PASSWORD,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  return authToken;
}

export async function createGuacConnection(
  authToken: string,
  initViewport: { vh: number; vw: number },
  chromePod: ChromePod,
) {
  const payload = getCreateConnPayload(
    chromePod,
    initViewport.vh,
    initViewport.vw,
  );

  return await axios.post(
    `${guacamoleApiUrl}/session/data/postgresql/connections`,
    payload,
    {
      headers: {
        'Guacamole-Token': authToken,
        'Content-Type': 'application/json',
      },
    },
  );
}
