import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useSnackbar } from 'notistack';
import { FormEvent, useEffect, useState } from 'react';
import styles from '../../styles/Partner/signup.module.scss';
import { getTokenCookie, parseJWT } from '../../Utils/auth/authHelper';
import { signupForm } from '../../Utils/auth/signup';

const Signup = () => {

  const [formInp, setFormInp] = useState({
    name: 'goldfinch hotel delhi ncr',
    email: 'goldfinchDemo@mail.com',
    password: 'GoldfinchDemo@123',
    confirmPassword: 'GoldfinchDemo@123',
    phone: '9893474821',
    address: 'Plot No. 1, Sector 18, Dwarka, New Delhi, Delhi 110075',
    city: '',
    state: '',
    country: '',
    lat: 0,
    long: 0
  });

  const { enqueueSnackbar } = useSnackbar();

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
          enqueueSnackbar('Location permission denied', {
            variant: "error"
          });
          // setSignupToast({
          //   message: 'Location permission denied',
          //   type: 'error',
          //   visible: true
          // });
        }
        const ipAddr = await fetch('https://api.ipify.org/?format=json').then(
          (res) => res.json()
        );

        const location = await fetch(
          `http://ip-api.com/json/${ipAddr?.ip}?fields=573951`
        ).then((res) => res.json());

        if (location?.status === 'fail') {
          enqueueSnackbar(location?.message ?? 'Location not found', {
            variant: "error"
          });
          // setSignupToast({
          //   message: location?.message ?? 'Location not found',
          //   type: 'error',
          //   visible: true
          // });
          return;
        }

        setFormInp((prevFormInp) => ({
          ...prevFormInp,
          country: location?.country,
          state: location?.regionName,
          city: location?.city
        }));
      });
  }, []);

  const disableBtn = () => {
    if (
      formInp.name &&
      formInp.email &&
      formInp.password &&
      formInp.confirmPassword &&
      formInp.phone &&
      formInp.address
    )
      return false;
    else return true;
  };

  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signupForm(formInp, 'partner', enqueueSnackbar);
  };

  const resetForm = () => {
    setFormInp((prevFormInp) => ({
      ...prevFormInp,
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      address: ''
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h4>Partner Signup</h4>
        <p>Please allow location permission</p>
        <form onSubmit={formSubmit}>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <input
              type="text"
              name="name"
              id="name"
              value={formInp.name}
              onChange={(e) =>
                setFormInp((prevFormInp) => ({
                  ...prevFormInp,
                  name: e.target.value
                }))
              }
              placeholder="Hotel Name"
              required
            />
          </div>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <input
              type="email"
              name="email"
              id="email"
              value={formInp.email}
              onChange={(e) =>
                setFormInp((prevFormInp) => ({
                  ...prevFormInp,
                  email: e.target.value
                }))
              }
              placeholder="Email"
              required
            />
          </div>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
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
              placeholder="Password"
              required
              min={8}
              max={16}
            />
          </div>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
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
              placeholder="Confirm Password"
              required
            />
          </div>
          <div className={`${styles.formGroup} ${styles.halfWidth}`}>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formInp.phone}
              onChange={(e) =>
                setFormInp((prevFormInp) => ({
                  ...prevFormInp,
                  phone: e.target.value
                }))
              }
              placeholder="Phone"
              required
            />
          </div>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <textarea
              name="address"
              id="address"
              value={formInp.address}
              onChange={(e) =>
                setFormInp((prevFormInp) => ({
                  ...prevFormInp,
                  address: e.target.value
                }))
              }
              placeholder="Address"
              rows={4}
              required
            />
          </div>
          <div className={`${styles.formGroup} ${styles.btnGroup}`}>
            <button type="reset" onClick={resetForm} className="btn" >
              Reset
            </button>
            <button type="submit" disabled={disableBtn()} className="btn btn-primary" >
              submit
            </button>
          </div>
        </form>
      </div>
      <div className={styles.imgContainer}>
        <Image
          src={'/assets/images/partner/signup/partner-signup.jpg'}
          layout="fill"
          objectFit="cover"
          alt="hero image"
          priority
        />
      </div>
      {/* <MUIToast alertState={alertState} setAlertState={setAlertState} /> */}
      {/* <Toast setToastState={setSignupToast} toastState={signupToast} /> */}
    </div>
  );
};

export default Signup;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const token = getTokenCookie(ctx);
  const userToken = parseJWT(token);

  if (userToken && userToken.role === 'HOTEL') {
    return {
      redirect: {
        destination: '/partner/dashboard',
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
};
