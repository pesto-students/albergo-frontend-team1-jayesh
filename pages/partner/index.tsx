import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import BlogSection from '../../Components/Home/Sections/BlogSection';
import Layout from '../../Components/Layout/Layout';
import styles from '../../styles/Partner/home.module.scss';
import { getTokenCookie, parseJWT } from '../../Utils/auth/authHelper';

const HotelPartnerHome = () => {
  return (
    <Fragment>
      <div className={styles.heroSection}>
        <Image
          src="https://images.unsplash.com/photo-1664521081309-57c84a924012?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          layout="fill"
          objectFit="cover"
          alt="hero image"
          priority
        />
        <div className={styles.heroText}>
          <h2>Become a partner with us</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            condimentum, nunc ut aliquam lacinia, nunc nisl aliquam nisl, quis
            aliquam nisl nisl sit amet lorem. Sed euismod, nunc ut aliquam
            lacinia, nunc nisl aliquam nisl, quis aliquam nisl nisl sit amet
            lorem.
          </p>
          <Link href="/partner/signup">
            <a>Let&apos;s Get Started</a>
          </Link>
        </div>
      </div>
      <Layout>
        <div className={styles.content}>
          <div className={styles.imgContainer}>
            <Image
              src="https://images.unsplash.com/photo-1664592451215-60c2c472afbb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
              layout="fill"
              objectFit="contain"
              alt="image"
            />
          </div>
          <div className={styles.textContainer}>
            <h2>Why Partner with us?</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              condimentum, nunc ut aliquam lacinia, nunc nisl aliquam nisl, quis
              aliquam nisl nisl sit amet lorem. Sed euismod, nunc ut aliquam
              lacinia, nunc nisl aliquam nisl, quis aliquam nisl nisl sit amet
              lorem.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              condimentum, nunc ut aliquam lacinia, nunc nisl aliquam nisl, quis
              aliquam nisl nisl sit amet lorem. Sed euismod, nunc ut aliquam
              lacinia, nunc nisl aliquam nisl, quis aliquam nisl nisl sit amet
              lorem.
            </p>
          </div>
        </div>
        <BlogSection title="Hosting tips &amp; guides" />
      </Layout>
    </Fragment>
  );
};

export default HotelPartnerHome;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const token = getTokenCookie(ctx);
  const userToken = parseJWT(token);

  if (userToken && userToken.role === 'Hotel') {
    return {
      redirect: {
        destination: '/partner/dashboard',
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
};
