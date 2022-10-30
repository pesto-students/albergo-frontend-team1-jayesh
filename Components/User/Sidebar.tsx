import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Components/UserProfile/sidebar.module.scss';

const UserProfileSidebar = ({
  data
}: {
  data?: {
    [key: string]: string | string[];
  };
}) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.userLogoContainer}>
        <Image
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          layout="fill"
          objectFit="cover"
          alt="user-logo"
        />
      </div>
      <button>Change profile Picture</button>
      <h5>{data?.name}</h5>
      <Link href="/user/edit">
        <a className={styles.editLink}>Edit Profile</a>
      </Link>
      <Link href="/user/edit">
        <a className={styles.editLink}>update Password</a>
      </Link>
    </div>
  );
};

export default UserProfileSidebar;
