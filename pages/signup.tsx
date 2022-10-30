import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import LoginContainer from '../Components/Login/loginContainer';
import Toast, { IToast } from '../Components/Toast/Toast';
import styles from '../styles/Login/login.module.scss';
import { signupForm } from '../Utils/auth/signup';

const Signup = () => {
  const router = useRouter()
  const [formInp, setFormInp] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    lat: 0,
    long: 0,
    city: "",
    state: "",
    country: "",
  })

  const [signupToast, setSignupToast] = useState<IToast>({
    message: '',
    type: 'info',
    visible: false
  });

  useEffect(() => {
    // ask for location permission
    navigator.permissions
      .query({ name: 'geolocation' })
      .then(async (result) => {
        if (result.state === 'granted') {
          // if permission granted, get location
          navigator.geolocation.getCurrentPosition((position) => {
            setFormInp((prevFormInp) => ({
              ...prevFormInp,
              lat: position.coords.latitude,
              long: position.coords.longitude
            }));
          });
        } else if (result.state === 'prompt') {
          // if permission not granted, ask for permission
          navigator.geolocation.getCurrentPosition((position) => {
            setFormInp((prevFormInp) => ({
              ...prevFormInp,
              lat: position.coords.latitude,
              long: position.coords.longitude
            }));
          });
        } else if (result.state === 'denied') {
          // if permission denied, show toast
          setSignupToast({
            message: 'Location permission denied',
            type: 'error',
            visible: true
          });

          const ipAddr = await fetch('https://api.ipify.org/?format=json').then(
            (res) => res.json()
          );

          const location = await fetch(
            `http://ip-api.com/json/${ipAddr?.ip}?fields=573951`
          ).then((res) => res.json());

          if (location?.status === 'fail') {
            setSignupToast({
              message: location?.message ?? 'Location not found',
              type: 'error',
              visible: true
            });
            return;
          }

          setFormInp((prevFormInp) => ({
            ...prevFormInp,
            country: location?.country,
            state: location?.regionName,
            city: location?.city,
            lat: location?.lat,
            long: location?.lon
          }));
        }
      });
  }, []);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signupForm(formInp, "user", setSignupToast, router);
  };

  const disableBtn = () => {
    if (
      formInp.name &&
      formInp.phone &&
      formInp.password &&
      formInp.confirmPassword &&
      formInp.email
    )
      return false;
    else return true;
  };

  return (
    <Fragment>
      <LoginContainer title="signup">
        <form onSubmit={submitForm} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" value={formInp.name}
              onChange={(e) =>
                setFormInp((prevFormInp) => ({
                  ...prevFormInp,
                  name: e.target.value
                }))
              }
              required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone</label>
            <input type="tel" name="phone" id="phone" value={formInp.phone}
              onChange={(e) =>
                setFormInp((prevFormInp) => ({
                  ...prevFormInp,
                  phone: e.target.value
                }))
              }
              required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" value={formInp.email}
              onChange={(e) =>
                setFormInp((prevFormInp) => ({
                  ...prevFormInp,
                  email: e.target.value
                }))
              }
              required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formInp.password}
              onChange={(e) =>
                setFormInp((prevFormInp) => ({
                  ...prevFormInp,
                  password: e.target.value
                }))
              }
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formInp.confirmPassword}
              onChange={(e) =>
                setFormInp((prevFormInp) => ({
                  ...prevFormInp,
                  confirmPassword: e.target.value
                }))
              }
              required
            />
          </div>
          <div className={styles.altAuthBtnContainer}>
            <button type="submit" disabled={disableBtn()} >Login</button>
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
      <Toast toastState={signupToast} setToastState={setSignupToast} />
    </Fragment>
  );
};

export default Signup;
