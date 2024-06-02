import { Server } from 'proxy-chain';

const server = new Server({
  port: 8000,
  host: 'localhost',
  verbose: true,

  // Custom user-defined function to authenticate incoming proxy requests,
  // and optionally provide the URL to chained upstream proxy.
  // The function must return an object (or promise resolving to the object) with the following signature:
  // { requestAuthentication: boolean, upstreamProxyUrl: string, failMsg?: string, customTag?: unknown }
  // If the function is not defined or is null, the server runs in simple mode.
  // Note that the function takes a single argument with the following properties:
  // * request      - An instance of http.IncomingMessage class with information about the client request
  //                  (which is either HTTP CONNECT for SSL protocol, or other HTTP request)
  // * username     - Username parsed from the Proxy-Authorization header. Might be empty string.
  // * password     - Password parsed from the Proxy-Authorization header. Might be empty string.
  // * hostname     - Hostname of the target server
  // * port         - Port of the target server
  // * isHttp       - If true, this is a HTTP request, otherwise it's a HTTP CONNECT tunnel for SSL
  //                  or other protocols
  // * connectionId - Unique ID of the HTTP connection. It can be used to obtain traffic statistics.
  prepareRequestFunction: ({
    request,
    username,
    password,
    hostname,
    port,
    isHttp,
    connectionId,
  }) => {
    return {
      upstreamProxyUrl: process.env.CHROME_HTTPS_PROXY,
    };
  },
});

// Emitted when HTTP connection is closed
server.on('connectionClosed', ({ connectionId, stats }) => {
  console.log(`Connection ${connectionId} closed`);
  console.dir(stats);
});

// Emitted when HTTP request fails
server.on('requestFailed', ({ request, error }) => {
  console.log(`Request ${request.url} failed`);
  console.error(error);
});

export function startProxy() {
  return server.listen(() => {
    console.log(`Proxy server is listening on port ${server.port}`);
  });
}
