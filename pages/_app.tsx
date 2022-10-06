import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.scss';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import Newsletter from '../Components/Newsletter/Newsletter';
import { Fragment } from 'react';
import { AuthModalProvider } from '../context/providers/AuthModal.provider';
import { Provider } from 'react-redux';
import store from '../redux/store';
// import AuthModal from '../Components/AuthModal/AuthModal';

function MyApp({ Component, pageProps }: AppProps) {
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
        {/* <AuthModalProvider> */}
        <Navbar />
        {/* <AuthModal /> */}
        {/* </AuthModalProvider> */}
        <Component {...pageProps} />
        <Newsletter />
        <Footer />
      </Provider>
    </Fragment>
  );
}

export default MyApp;

// export default wrapper.withRedux(MyApp);
