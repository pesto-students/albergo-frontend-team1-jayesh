import styles from '../../styles/User/home.module.scss';
import Layout from '../../Components/Layout/Layout';
import Image from 'next/image';
import { generateUID, IUserData, MaterialIcon } from '../../Utils/Helper';
import UserProfileSidebar from '../../Components/User/Sidebar';
import Link from 'next/link';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { getTokenCookie, parseJWT } from '../../Utils/auth/authHelper';
import { Fragment, useRef, useState } from 'react';
import { makeReq } from '../../Utils/db';
import { createRef, uploadFile } from '../../Utils/firebase/firebase';

interface IUserHomeProps {
  data: IUserData;
}

const UserHome: NextPage<IUserHomeProps> = ({ data }) => {

  const [profileState, setProfileState] = useState({
    name: {
      editable: false,
      value: data?.name,
    },
    email: {
      editable: false,
      value: data?.email,
    },
    profileImage: data?.profileImage ?? "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    reviews: data?.reviews ?? [],
  });

  const profileInpRef = useRef<HTMLInputElement>(null);

  const changeProfile = () => {
    profileInpRef.current?.click();
  };

  const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    try {
      const firebaseImageFileRef = createRef(`users/${data.uuid}/profile/${generateUID(file.name, file.size.toString())}`);
      const firebaseImageURL = await uploadFile(firebaseImageFileRef, file);
    } catch (error) {

    }

  };

  return (
    <Layout>
      <section className="section">
        <div className={styles.sidebar}>
          <div className={styles.profileContainer}>
            <div className={styles.imageContainer}>
              <Image src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80" layout="fill" objectFit="cover" alt="user-logo" />
            </div>
            <input
              accept='image/*'
              type="file"
              style={{ display: "none" }}
              ref={profileInpRef} />
            <button onClick={changeProfile} >Change profile Picture</button>
          </div>
        </div>
        <div className={styles.content}></div>
      </section>
      {/* <div className={styles.container}>
        <div className={styles.sidebar}>
          <div className={styles.userLogoContainer}>
            <Image
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              layout="fill"
              objectFit="cover"
              alt="user-logo"
            />
          </div>
          <input type="file" style={{ display: "none" }} />
          <button>Change profile Picture</button>
          <h5>{data?.name}</h5>
          <Link href="/user/edit">
            <a className={styles.editLink}>Edit Profile</a>
          </Link>
          <Link href="/user/edit">
            <a className={styles.editLink}>update Password</a>
          </Link>
        </div>
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
      {/* </Fragment>
          ) : (  */}
      {/* //       <div className={styles.noReviews}>
               <h5>No reviews yet</h5>
               <Link href="/explore">
                 <a>click here to explore Hotels</a>
               </Link>
             </div>
           )}
         </div> 
       </div> */}
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
