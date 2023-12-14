// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';

import PingPong from './components/PingPong';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './services/apolloClient';

export function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <PingPong />
    </ApolloProvider>
  );
}

export default App;
