import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import styles from '../../styles/Components/LoginContainer/LoginContainer.module.scss';
import { MaterialIcon } from '../../Utils/Helper';

const LoginContainer = ({
  title,
  children
}: {
  title: 'login' | 'signup';
  children: ReactNode;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.formContent}>
          <h2>{title}</h2>
          <p>
            Have an account
            <MaterialIcon iconName="arrow_right_alt" />
            <Link href={title === 'login' ? '/signup' : '/login'}>
              <a>{title === 'login' ? 'signup' : 'login'}</a>
            </Link>
          </p>
          {children}
        </div>
      </div>
      <div className={styles.heroSection}>
        <Image
          src="/assets/images/login/login.jpg"
          layout="fill"
          objectFit="cover"
          alt="login bg"
          priority
        />
      </div>
    </div>
  );
};

export default LoginContainer;
