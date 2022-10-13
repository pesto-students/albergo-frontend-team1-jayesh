import Image from 'next/image';
import { useState } from 'react';
import LoginContainer from '../Components/Login/loginContainer';
import signupStyles from '../styles/Signup/signup.module.scss';
import { signupForm } from '../Utils/auth/signup';

const Signup = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  return (
    <LoginContainer title="signup">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signupForm(formState);
        }}
        className={signupStyles.form}
      >
        <div className={signupStyles.formGroup}>
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
        <div className={signupStyles.formGroup}>
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
        <div className={signupStyles.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formState.confirmPassword}
            onChange={(e) =>
              setFormState((prevFormState) => ({
                ...prevFormState,
                confirmPassword: e.target.value
              }))
            }
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
    </LoginContainer>
  );
};

export default Signup;
