import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import styles from '../../styles/Components/LoginContainer/LoginContainer.module.scss';
import { MaterialIcon } from '../../Utils/Helper';

const LoginContainer = ({
  title,
  children
}: {
  title: 'login' | 'signup';
  children: ReactNode;
}) => {
  const [currentCard, setCurrentCard] = useState(0);
  const cardArr = [
    {
      cardAvatar:
        'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
      cardName: 'John Doe',
      cardContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      cardAvatar:
        'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
      cardName: 'Jane Doe',
      cardContent:
        'Simply unbelieveable!. I am really satisfied with my tours and business travels. This is absolutely wonderful!'
    },
    {
      cardAvatar:
        'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
      cardName: 'Dave Doe',
      cardContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }
  ];
  // use useEffect to set the interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentCard === cardArr.length - 1) {
        setCurrentCard(0);
      } else {
        setCurrentCard((prevcurrentCard) => prevcurrentCard + 1);
      }
    }, 2000);
    return () => clearInterval(interval);
  });

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.heroSection}>
          <h5>Join us</h5>
          <div className={styles.content}>
            <h1>Start your journey with us.</h1>
            <h5>Discover the world&apos;s marvel and enlightment.</h5>
          </div>
          <div className={styles.cardContainer}>
            <div className={styles.card}>
              <div className={styles.avatarContainer}>
                <Image
                  src={cardArr[currentCard].cardAvatar}
                  alt="avatar"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className={styles.cardContent}>
                <h5>{cardArr[currentCard].cardName}</h5>
                <p>{cardArr[currentCard].cardContent}</p>
              </div>
            </div>
            <div className={styles.dotContainer}>
              {cardArr.map((_, index) => (
                <span
                  key={index}
                  className={index === currentCard ? styles.active : undefined}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.formContainer}>
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
    </Layout>
  );
};

export default LoginContainer;
