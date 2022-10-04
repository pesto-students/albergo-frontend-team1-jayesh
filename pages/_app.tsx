import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { Fragment } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import Newsletter from '../Components/Newsletter/Newsletter';
import Head from 'next/head';
import AuthModal from '../Components/AuthModal/AuthModal';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Newsletter />
      <Footer />
      {/* <AuthModal /> */}
    </Fragment>
  );
}

export default MyApp;
