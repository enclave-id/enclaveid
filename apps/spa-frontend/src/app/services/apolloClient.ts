import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  fromPromise,
  toPromise,
} from '@apollo/client';
import { decryptVariables, encryptVariables } from '../utils/confidentiality';
const httpLink = new HttpLink({ uri: 'http://your-graphql-endpoint/graphql' });

const encryptRequestMiddleware = new ApolloLink((operation, forward) => {
  if (operation.variables === undefined) {
    return forward(operation);
  }

  return fromPromise(
    encryptVariables(operation.variables).then(
      ({ encryptedVariables, nonce }) => {
        operation.variables = {
          encryptedVariables,
          nonce,
        };
        return toPromise(forward(operation));
      }
    )
  );
});

const decryptResponseMiddleware = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    if (response.data) {
      const { encryptedVariables, nonce } = response.data;

      if (encryptedVariables && nonce) {
        response.data = decryptVariables(encryptedVariables, nonce);
      }
    }
    return response;
  });
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    encryptRequestMiddleware,
    decryptResponseMiddleware,
    httpLink,
  ]),
  cache: new InMemoryCache(),
});
