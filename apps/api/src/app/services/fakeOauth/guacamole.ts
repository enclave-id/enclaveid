import axios from 'axios';
import { getCreateConnPayload } from './constants';

const guacamoleApiUrl = `http://${process.env.GUACAMOLE_HOST}/api`;

export async function getGuacAuthToken() {
  const {
    data: { authToken },
  } = await axios.post(`${guacamoleApiUrl}/tokens`, {
    username: process.env.GUACAMOLE_USERNAME,
    password: process.env.GUACAMOLE_PASSWORD,
  });

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
      },
    },
  );
}
