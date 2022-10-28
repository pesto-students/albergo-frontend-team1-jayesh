import Image from 'next/image';
import { FormEvent, useEffect, useState } from 'react';
import Toast, { IToast } from '../../Components/Toast/Toast';
import styles from '../../styles/Partner/signup.module.scss';
import { partnerSignupForm } from '../../Utils/auth/signup';

const Signup = () => {
  const [formInp, setFormInp] = useState({
    hotelName: '',
    hotelEmail: '',
    hotelPassword: '',
    hotelConfirmPassword: '',
    hotelPhone: '',
    hotelAddress: '',
    hotelZip: ''
  });

  const [locationState, setLocationState] = useState({
    lat: 0,
    lon: 0
  });

  const [signupToast, setSignupToast] = useState<IToast>({
    message: '',
    type: 'info',
    visible: false
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setLocationState({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      function (error) {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0
      }
    );
  }, []);

  const disableBtn = () => {
    if (
      formInp.hotelName &&
      formInp.hotelEmail &&
      formInp.hotelPassword &&
      formInp.hotelConfirmPassword &&
      formInp.hotelPhone &&
      formInp.hotelAddress &&
      formInp.hotelZip
    ) {
      return false;
    } else {
      return true;
    }
  };

  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    partnerSignupForm(
      {
        name: formInp.hotelName,
        hotelEmail: formInp.hotelEmail,
        hotelPassword: formInp.hotelPassword,
        hotelConfirmPassword: formInp.hotelConfirmPassword,
        hotelPhone: formInp.hotelPhone,
        hotelAddress: formInp.hotelAddress,
        hotelZip: formInp.hotelZip,
        latitude: locationState?.lat,
        longitude: locationState?.lon
      },
      setSignupToast
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h4>Partner Signup</h4>
        <p>Please allow location permission</p>
        <use></use>
        <form onSubmit={formSubmit}>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <input
              type="text"
              name="name"
              id="name"
              value={formInp.hotelName}
              onChange={(e) =>
                setFormInp((prevFormInp) => ({
                  ...prevFormInp,
                  hotelName: e.target.value
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
              value={formInp.hotelEmail}
              onChange={(e) =>
                setFormInp((prevFormInp) => ({
                  ...prevFormInp,
                  hotelEmail: e.target.value
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
              value={formInp.hotelPassword}
              onChange={(e) =>
                setFormInp((prevFormInp) => ({
                  ...prevFormInp,
                  hotelPassword: e.target.value
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
              value={formInp.hotelConfirmPassword}
              onChange={(e) =>
                setFormInp((prevFormInp) => ({
                  ...prevFormInp,
                  hotelConfirmPassword: e.target.value
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
              value={formInp.hotelPhone}
              onChange={(e) =>
                setFormInp((prevFormInp) => ({
                  ...prevFormInp,
                  hotelPhone: e.target.value
                }))
              }
              placeholder="Phone"
              required
            />
          </div>
          <div className={`${styles.formGroup} ${styles.halfWidth}`}>
            <input
              type="text"
              name="zip"
              id="zip"
              value={formInp.hotelZip}
              onChange={(e) =>
                setFormInp((prevFormInp) => ({
                  ...prevFormInp,
                  hotelZip: e.target.value
                }))
              }
              placeholder="Zip"
              required
            />
          </div>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <textarea
              name="address"
              id="address"
              value={formInp.hotelAddress}
              onChange={(e) =>
                setFormInp((prevFormInp) => ({
                  ...prevFormInp,
                  hotelAddress: e.target.value
                }))
              }
              placeholder="Address"
              rows={4}
              required
            />
          </div>
          <div className={`${styles.formGroup} ${styles.btnGroup}`}>
            <button type="reset">Reset</button>
            <button type="submit" disabled={disableBtn()}>
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
      <Toast setToastState={setSignupToast} toastState={signupToast} />
    </div>
  );
};

export default Signup;
