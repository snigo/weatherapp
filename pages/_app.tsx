import Head from 'next/head';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { useStore } from '../store';

import 'swiper/swiper.scss';
import '../sass/main.scss';
import { loadPersistentStore } from '../store/actions';

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);
  useEffect(() => {
    const cachedStore = localStorage.getItem('store');
    if (cachedStore) {
      store.dispatch(loadPersistentStore(JSON.parse(cachedStore)));
    }
  }, []);
  return (
    <Provider store={store}>
      <Head>
        <link rel="manifest" href="manifest.json" />
      </Head>
      <div className="shell">
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
