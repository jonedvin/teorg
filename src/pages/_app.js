import { useEffect } from 'react';

import '../styles/globals.css';

import { initializeLiff, forceLogin } from '../lib/liff';


export default function MyApp({ Component, pageProps }) {

  // Init LIFF and login
  useEffect(() => {
    (async () => {
      await initializeLiff();
      // forceLogin();
    })();
  }, []);

  return <Component {...pageProps} />;
}
