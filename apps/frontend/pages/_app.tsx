import { AppProps } from 'next/app';
import '../app/global.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
