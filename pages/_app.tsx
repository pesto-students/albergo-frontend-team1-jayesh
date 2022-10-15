import type { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { Fragment } from 'react';
import { Provider } from 'react-redux';
import '../styles/globals.scss';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import Newsletter from '../Components/Newsletter/Newsletter';
import store from '../redux/store';
import App from 'next/app';
import { ITokenProp } from '../Utils/Helper';

const MyApp = ({ Component, pageProps, token }: AppProps & ITokenProp) => {
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
        <Navbar token={token} />
        <Component {...pageProps} />
        <Newsletter />
        <Footer />
      </Provider>
    </Fragment>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appCtx = appContext.ctx;
  const cookie = appCtx.req?.headers.cookie;
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps, token: cookie ?? null };
};

export default MyApp;
