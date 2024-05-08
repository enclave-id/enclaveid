import axios from 'axios';
import qs from 'qs';
import { getCreateConnPayload } from './constants';

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
  connName: string,
  connPassword: string,
  initViewport: { vh: number; vw: number },
) {
  const { vh, vw } = initViewport;

  return await axios.post(
    `${guacamoleApiUrl}/session/data/postgresql/connections`,
    getCreateConnPayload(connName, connPassword, vh, vw),
    {
      headers: {
        'Guacamole-Token': authToken,
        'Content-Type': 'application/json',
      },
    },
  );
}
