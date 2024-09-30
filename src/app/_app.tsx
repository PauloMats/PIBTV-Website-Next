// pages/_app.tsx

import { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
