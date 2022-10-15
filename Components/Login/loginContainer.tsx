import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import loginCompStyles from '../../styles/Components/LoginContainer/LoginComp.module.scss';

const LoginContainer = ({
  title,
  children
}: {
  title: 'login' | 'signup' | 'Partner Login';
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
      <div className={loginCompStyles.container}>
        <div className={loginCompStyles.heroSection}>
          <h5>Join us</h5>
          <div className={loginCompStyles.content}>
            <h1>Start your journey with us.</h1>
            <h5>Discover the world&apos;s marvel and enlightment.</h5>
          </div>
          <div className={loginCompStyles.cardContainer}>
            <div className={loginCompStyles.card}>
              <div className={loginCompStyles.avatarContainer}>
                <Image
                  src={cardArr[currentCard].cardAvatar}
                  alt="avatar"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className={loginCompStyles.cardContent}>
                <h5>{cardArr[currentCard].cardName}</h5>
                <p>{cardArr[currentCard].cardContent}</p>
              </div>
            </div>
            <div className={loginCompStyles.dotContainer}>
              {cardArr.map((_, index) => (
                <span
                  key={index}
                  className={
                    index === currentCard ? loginCompStyles.active : undefined
                  }
                />
              ))}
            </div>
          </div>
        </div>
        <div className={loginCompStyles.formContainer}>
          <h2>{title}</h2>
          <p>
            Have an account{' '}
            <span className="material-symbols-outlined">arrow_right_alt</span>{' '}
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
