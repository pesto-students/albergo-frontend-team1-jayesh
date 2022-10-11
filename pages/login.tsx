import Image from 'next/image';
import { useState } from 'react';
import LoginContainer from '../Components/Login/loginContainer';
import loginStyles from '../styles/Login/login.module.scss';
import { loginForm } from '../Utils/auth/login';

const Login = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: ''
  });

  return (
    <LoginContainer title="login">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loginForm(formState);
        }}
        className={loginStyles.form}
      >
        <div className={loginStyles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formState.email}
            onChange={(e) => {
              setFormState((prevFormState) => ({
                ...prevFormState,
                email: e.target.value
              }));
            }}
          />
        </div>
        <div className={loginStyles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formState.password}
            onChange={(e) => {
              setFormState((prevFormState) => ({
                ...prevFormState,
                password: e.target.value
              }));
            }}
          />
        </div>
        <button type="submit">Login</button>
        <div className={loginStyles.dividerWithText}>
          <hr />
          <small>or continue with</small>
          <hr />
        </div>
        <div className={loginStyles.altAuthBtnContainer}>
          <button>
            <div className={loginStyles.icon}>
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
            <div className={loginStyles.icon}>
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
            <div className={loginStyles.icon}>
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
  );
};

export default Login;
