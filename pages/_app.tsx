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
import { destroyTokenCookie, getTokenCookie, parseJWT, validateJWT } from '../Utils/auth/authHelper';
import { removeEncryptedToken, setUserEncryptedToken } from '../redux/user/user.slice';
import NavModal from '../Components/NavModal/NavModal';

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const token = getTokenCookie();
    if (validateJWT(parseJWT(token))) {
      store.dispatch(setUserEncryptedToken(token));
    }
    else {
      store.dispatch(removeEncryptedToken())
      destroyTokenCookie()
    }
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
        <NavModal />
      </Provider>
    </Fragment>
  );
};

export default MyApp;
