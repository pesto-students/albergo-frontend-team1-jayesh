import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import LoginContainer from '../Components/Login/loginContainer';
import Toast, { IToast } from '../Components/Toast/Toast';
import styles from '../styles/Login/login.module.scss';
import { loginForm } from '../Utils/auth/login';

const Login = () => {
  const router = useRouter();
  const [formState, setFormState] = useState({
    email: '',
    password: ''
  });

  const [toastState, setToastState] = useState<IToast>({
    message: '',
    type: 'info',
    visible: false
  });

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = formState.email;
    const password = formState.password;
    loginForm({ email, password }, setToastState, router);
  };

  const disableBtn = () => {
    if (formState.email === '' || formState.password === '') {
      return true;
    }
    return false;
  };

  return (
    <Fragment>
      <LoginContainer title="login">
        <form onSubmit={submitForm} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formState.email}
              onChange={(e) =>
                setFormState((prevFormState) => ({
                  ...prevFormState,
                  email: e.target.value
                }))
              }
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formState.password}
              onChange={(e) =>
                setFormState((prevFormState) => ({
                  ...prevFormState,
                  password: e.target.value
                }))
              }
            />
          </div>
          <Link href="">
            <a>
              <p>Forgot password?</p>
            </a>
          </Link>
          <div className={styles.altAuthBtnContainer}>
            <button type="submit" disabled={disableBtn()}>
              Login
            </button>
            <div className={styles.dividerWithText}>
              <hr />
              <small>or continue with</small>
              <hr />
            </div>
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
          </div>
        </form>
      </LoginContainer>
      <Toast toastState={toastState} setToastState={setToastState} />
    </Fragment>
  );
};

export default Login;
