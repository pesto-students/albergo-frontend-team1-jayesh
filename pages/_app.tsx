import type { AppProps } from 'next/app';
import { Fragment, useEffect } from 'react';
import { Provider } from 'react-redux';
import '../styles/globals.scss';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import Newsletter from '../Components/Newsletter/Newsletter';
import store from '../redux/store';
import '../styles/Homescreen/Banner.scss';
import { getTokenCookie, parseJWT, removeToken, validateJWT } from '../Utils/auth/authHelper';
import { setUserEncryptedToken } from '../redux/user/user.slice';
import NavModal from '../Components/NavModal/NavModal';
import { SnackbarProvider } from 'notistack';

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const token = getTokenCookie();

    const isTokenValid = validateJWT(parseJWT(token));

    if (!isTokenValid) removeToken();
    else store.dispatch(setUserEncryptedToken(token));
  }, []);

  return (
    <Fragment>
      <Provider store={store}>
        <SnackbarProvider maxSnack={6} >
          <Navbar />
          <Component {...pageProps} />
          <Newsletter />
          <Footer />
          <NavModal />
        </SnackbarProvider>
      </Provider>
    </Fragment>
  );
};

export default MyApp;
