// Path: pages\_app.js

import '../styles/globals.css';
import { AccessTokenProvider } from '../context/accessTokenContext';

function MyApp({ Component, pageProps }) {
  return (
    <AccessTokenProvider>
      <Component {...pageProps} />
    </AccessTokenProvider>
  );
}

export default MyApp;
