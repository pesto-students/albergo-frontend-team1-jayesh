import styles from '../../styles/User/home.module.scss';
import Layout from '../../Components/Layout/Layout';
import Image from 'next/image';
import { generateUID, IUserData } from '../../Utils/Helper';
import Link from 'next/link';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { getTokenCookie, parseJWT } from '../../Utils/auth/authHelper';
import { Fragment, useRef, useState } from 'react';
import { handleResponse, makeReq } from '../../Utils/db';
import { createRef, uploadFile } from '../../Utils/firebase/firebase';
import { useSnackbar } from 'notistack';
import { useAppSelector } from '../../redux/hooks';

interface IUserHomeProps {
  data: IUserData;
}

const UserHome: NextPage<IUserHomeProps> = ({ data }) => {

  const [profileImage, setProfileImage] = useState(data?.profileImage ?? "https://images.unsplash.com/photo-1438761681033-6461ffad8d80");

  const profileInpRef = useRef<HTMLInputElement>(null);

  const { enqueueSnackbar } = useSnackbar();

  const userToken = useAppSelector(state => state.user.userEncryptedToken);

  const changeProfile = () => {
    profileInpRef.current?.click();
  };

  const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    try {
      const firebaseImageFileRef = createRef(`users/${data.uuid}/profile}`);
      const firebaseImageURL = await uploadFile(firebaseImageFileRef, file);

      const resObj = await makeReq("/api/user/changeProfilePic", "POST", {
        uuid: data.uuid,
        profileImage: firebaseImageURL,
      }, userToken!);

      const res = handleResponse(resObj, enqueueSnackbar);

      if (res) {
        setProfileImage(firebaseImageURL);
        enqueueSnackbar("Profile picture changed successfully", { variant: "success" });
      }
      return;
    } catch (error) {
      const err = error as Error;
      enqueueSnackbar(err.message ?? "Error : Please try again later", { variant: "error" });
      return;
    }
  };

  return (
    <Layout>
      <section className={styles.section}>
        <div className={styles.sidebar}>
          <div className={styles.profileImageContainer}>
            <div className={styles.userLogoContainer}>
              <Image src={profileImage} layout="fill" objectFit="cover" alt="user-logo" />
            </div>
            <input
              accept='image/*'
              type="file"
              style={{ display: "none" }}
              ref={profileInpRef}
              onChange={onInputChange}
            />
            <button className='btn' onClick={changeProfile} >Change profile image</button>
          </div>
          <Link href={"/bookings"} >
            <a>
              <h5>See all bookings</h5>
            </a>
          </Link>
        </div>
        <div className={styles.content}>
          <h2>Hello, {data.name}</h2>
          <small>Joined in 2022</small>
          <hr />
          <div className={styles.reviewsContainer}>
            {data.reviews.length > 0 ? (
              <Fragment>
              </Fragment>
            ) : (
              <h5>No reviews yet</h5>
            )}
          </div>
        </div>
      </section>
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
