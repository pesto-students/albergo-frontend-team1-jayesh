import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Fragment, useEffect } from 'react';
import { Provider } from 'react-redux';
import '../styles/globals.scss';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import Newsletter from '../Components/Newsletter/Newsletter';
import store from '../redux/store';
import '../styles/Homescreen/Banner.scss';
import { getTokenCookie } from '../Utils/auth/authHelper';
import { setUserEncryptedToken } from '../redux/user/user.slice';

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const token = getTokenCookie();
    store.dispatch(setUserEncryptedToken(token));
  }, []);

  return (
    <Fragment>
      <Provider store={store}>
        <Head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <Navbar />
        <Component {...pageProps} />
        <Newsletter />
        <Footer />
      </Provider>
    </Fragment>
  );
};

export default MyApp;
