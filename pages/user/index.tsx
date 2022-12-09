import styles from '../../styles/User/home.module.scss';
import Layout from '../../Components/Layout/Layout';
import Image from 'next/image';
import { MaterialIcon } from '../../Utils/Helper';
import UserProfileSidebar from '../../Components/User/Sidebar';
import Link from 'next/link';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { getTokenCookie, parseJWT } from '../../Utils/auth/authHelper';
import { Fragment } from 'react';
import { makeReq } from '../../Utils/db';

interface IUserHomeProps {
  data: any;
}

const UserHome: NextPage<IUserHomeProps> = ({ data }) => {
  return (
    <Layout>
      <div className={styles.container}>
        <UserProfileSidebar data={data} />
        <div className={styles.content}>
          <h3>Hello, {data?.name}</h3>
          <small>Joined in Aug, 2021</small>
          <h5>
            <MaterialIcon iconName="star" /> 0 Reviews
          </h5>
          <hr />
          {data?.reviews.length > 0 ? (
            <Fragment>
              <h5>Hotels reviewd by you</h5>
              {/* <div className={styles.cardContainer}>
                {Array.isArray(data?.reviews) &&
                  data?.reviews.map((cardInfo, index) => (
                    <div className={styles.hotelCard} key={index}>
                      <div className={styles.hotelImageContainer}>
                        <Image
                          src="https://images.unsplash.com/photo-1664914497213-7aafb1bf9cdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=402&q=80"
                          layout="fill"
                          objectFit="cover"
                          alt="hotel-logo"
                        />
                      </div>
                      <div className={styles.hotelDetails}>
                        <h5>Hotel Name</h5>
                        <small>Location</small>
                        <p>
                          <MaterialIcon iconName="star" />
                          4.5
                        </p>
                        <small>
                          Review : Lorem ipsum, dolor sit amet consectetur
                          adipisicing elit. Quos eum praesentium quisquam
                          saepe assumenda unde totam adipisci optio
                          consequuntur, repudiandae eaque odit iste! Tempora
                          est possimus magni quo iusto laborum.
                        </small>
                      </div>
                    </div>
                  ))}
              </div> */}
            </Fragment>
          ) : (
            <div className={styles.noReviews}>
              <h5>No reviews yet</h5>
              <Link href="/explore">
                <a>click here to explore Hotels</a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UserHome;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const token = getTokenCookie(ctx);

  const userToken = parseJWT(token);

  if (!userToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  if (userToken.role === 'HOTEL') {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  const resObj = await makeReq(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, 'GET', undefined, token);

  if (!resObj || !resObj.response || !resObj.response!.ok) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  return {
    props: {
      data: resObj.res?.data,
    }
  };
};
