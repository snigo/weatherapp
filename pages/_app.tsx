import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { useStore } from '../store';

import 'swiper/swiper.scss';
import '../sass/main.scss';

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);
  return (
    <Provider store={store}>
      <div className="shell">
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
