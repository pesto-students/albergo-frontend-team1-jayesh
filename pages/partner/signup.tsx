import Image from 'next/image';
import { Fragment, useEffect, useRef, useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import styles from '../../styles/Partner/signup.module.scss';
import { partnerSignupForm } from '../../Utils/auth/signup';
import { MaterialIcon } from '../../Utils/Helper';

const Signup = () => {
  const [formTab, setFormTab] = useState(0);

  const hotelNameInp = useRef<HTMLInputElement>(null);
  const hotelEmailInp = useRef<HTMLInputElement>(null);
  const hotelPasswordInp = useRef<HTMLInputElement>(null);
  const hotelConfirmPasswordInp = useRef<HTMLInputElement>(null);
  const hotelPhoneInp = useRef<HTMLInputElement>(null);
  const hotelAddressInp = useRef<HTMLTextAreaElement>(null);
  const hotelCityInp = useRef<HTMLInputElement>(null);
  const hotelStateInp = useRef<HTMLInputElement>(null);
  const hotelCountryInp = useRef<HTMLInputElement>(null);

  // location state
  const [locationState, setLocationState] = useState({
    lat: 0,
    lng: 0
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setLocationState({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      function (error) {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  }, []);

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hotelName = hotelNameInp.current?.value;
    const hotelEmail = hotelEmailInp.current?.value;
    const hotelPassword = hotelPasswordInp.current?.value;
    const hotelConfirmPassword = hotelConfirmPasswordInp.current?.value;
    const hotelPhone = hotelPhoneInp.current?.value;
    const hotelAddress = hotelAddressInp.current?.value;
    const hotelCity = hotelCityInp.current?.value;
    const hotelState = hotelStateInp.current?.value;
    const hotelCountry = hotelCountryInp.current?.value;

    if (
      hotelName &&
      hotelEmail &&
      hotelPassword &&
      hotelConfirmPassword &&
      hotelPhone &&
      hotelAddress &&
      hotelCity &&
      hotelState &&
      hotelCountry
    ) {
      partnerSignupForm({
        hotelName,
        hotelEmail,
        hotelPassword,
        hotelConfirmPassword,
        hotelPhone,
        hotelAddress,
        hotelCity,
        hotelState,
        hotelCountry,
        latitude: locationState.lat,
        longitude: locationState.lng
      });
    }
  };

  const TabOne = () => {
    return (
      <Fragment>
        <div className={styles.formGroup}>
          <label htmlFor="name">Hotel Name</label>
          <input type="text" name="name" id="name" ref={hotelNameInp} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Hotel Email</label>
          <input type="email" name="email" id="email" ref={hotelEmailInp} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            ref={hotelPasswordInp}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            ref={hotelConfirmPasswordInp}
          />
        </div>
      </Fragment>
    );
  };

  const TabTwo = () => {
    return (
      <Fragment>
        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone</label>
          <input type="tel" name="phone" id="phone" ref={hotelPhoneInp} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="address">Address</label>
          <textarea name="address" id="address" ref={hotelAddressInp} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="city">City</label>
          <input type="text" name="city" id="city" ref={hotelCityInp} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="state">State</label>
          <input type="text" name="state" id="state" ref={hotelStateInp} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            id="country"
            ref={hotelCountryInp}
          />
        </div>
      </Fragment>
    );
  };

  const renderTabs = () => {
    switch (formTab) {
      case 0:
        return TabOne();
      case 1:
        return TabTwo();
      default:
        return TabOne();
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.heroSection}>
          <Image
            src="https://images.unsplash.com/photo-1665731372684-1efcb1307d5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            layout="fill"
            objectFit="cover"
            alt="hero image"
          />
        </div>
        <div className={styles.formContainer}>
          <div className={styles.form}>
            <h1>Partner Signup</h1>
            <form onSubmit={formSubmitHandler}>
              {renderTabs()}
              <div className={styles.btnGroup}>
                <button
                  onClick={() => setFormTab(0)}
                  className={formTab === 0 ? styles.hiddenBtn : undefined}
                >
                  <MaterialIcon iconName="arrow_back" />
                  Previous
                </button>
                <button
                  onClick={() => setFormTab(1)}
                  className={formTab === 1 ? styles.hiddenBtn : undefined}
                >
                  Next
                  <MaterialIcon iconName="arrow_forward" />
                </button>
                {formTab === 1 && <button>Submit</button>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
