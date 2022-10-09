import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '../Components/Layout/Layout';
import signupStyles from '../styles/Signup/signup.module.scss';

const Signup = () => {
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
      <div className={signupStyles.container}>
        <div className={signupStyles.heroSection}>
          <h5>Join us</h5>
          <div className={signupStyles.content}>
            <h1>Start your journey with us.</h1>
            <h5>Discover the world&apos;s marvel and enlightment.</h5>
          </div>
          <div className={signupStyles.cardContainer}>
            <div className={signupStyles.card}>
              <div className={signupStyles.avatarContainer}>
                <Image
                  src={cardArr[currentCard].cardAvatar}
                  alt="avatar"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className={signupStyles.cardContent}>
                <h5>{cardArr[currentCard].cardName}</h5>
                <p>{cardArr[currentCard].cardContent}</p>
              </div>
            </div>
            <div className={signupStyles.dotContainer}>
              {cardArr.map((_, index) => (
                <span
                  key={index}
                  className={
                    index === currentCard ? signupStyles.active : undefined
                  }
                />
              ))}
            </div>
          </div>
        </div>
        <div className={signupStyles.formContainer}>
          <h2>Signup</h2>
          <p>
            Have an account{' '}
            <span className="material-symbols-outlined">arrow_right_alt</span>{' '}
            <Link href="/login">
              <a>Login</a>
            </Link>
          </p>

          <form>
            <div className={signupStyles.formGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" />
            </div>
            <div className={signupStyles.formGroup}>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" />
            </div>
            <div className={signupStyles.formGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
              />
            </div>
            <button type="submit">Signup</button>
            <div className={signupStyles.dividerWithText}>
              <hr />
              <small>or continue with</small>
              <hr />
            </div>
            <div className={signupStyles.altAuthBtnContainer}>
              <button>
                <div className={signupStyles.icon}>
                  <Image
                    src="/assets/icons/fbIcon.png"
                    width={15}
                    height={15}
                    alt="icon"
                  />
                </div>
                facebook
              </button>
              <button>
                <div className={signupStyles.icon}>
                  <Image
                    src="/assets/icons/googleIcon.png"
                    width={15}
                    height={15}
                    alt="icon"
                  />
                </div>
                google
              </button>
              <button>
                <div className={signupStyles.icon}>
                  <Image
                    src="/assets/icons/appleIcon.png"
                    width={15}
                    height={15}
                    alt="icon"
                  />
                </div>
                apple
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
