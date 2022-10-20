import Image from 'next/image';
import { Fragment, useRef, useState } from 'react';
import LoginContainer from '../Components/Login/loginContainer';
import Toast, { IToast } from '../Components/Toast/Toast';
import styles from '../styles/Login/login.module.scss';
import { signupForm } from '../Utils/auth/signup';

const Signup = () => {
  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const confirmPasswordInput = useRef<HTMLInputElement>(null);

  const [toastState, setToastState] = useState<IToast>({
    message: '',
    type: 'info',
    visible: false
  });

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nameInput.current?.value;
    const email = emailInput.current?.value;
    const password = passwordInput.current?.value;
    const confirmPassword = confirmPasswordInput.current?.value;
    if (name && email && password && confirmPassword) {
      signupForm({ name, email, password, confirmPassword }, setToastState);
    }
  };

  return (
    <Fragment>
      <LoginContainer title="signup">
        <form onSubmit={submitForm} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" ref={nameInput} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" ref={emailInput} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              ref={passwordInput}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              ref={confirmPasswordInput}
            />
          </div>
          <button type="submit">Signup</button>
          <div className={styles.dividerWithText}>
            <hr />
            <small>or continue with</small>
            <hr />
          </div>
          <div className={styles.altAuthBtnContainer}>
            <button>
              <div className={styles.icon}>
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
              <div className={styles.icon}>
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
              <div className={styles.icon}>
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
      </LoginContainer>
      <Toast toastState={toastState} setToastState={setToastState} />
    </Fragment>
  );
};

export default Signup;
