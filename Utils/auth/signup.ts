import { Dispatch, SetStateAction } from 'react';
import { IToast } from '../../Components/Toast/Toast';
import store from '../../redux/store';
import { setUserEncryptedToken } from '../../redux/user/user.slice';
import {
  checkPassword,
  isValidEmail,
  isValidPassword,
  setTokenCookie
} from './authHelper';

interface IAuthSignup {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const signupMiddleware = async (
  formObj: IAuthSignup,
  setToastState: Dispatch<SetStateAction<IToast>>
) => {
  const { name, email, password } = formObj;

  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      email,
      password
    })
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) throw new Error(res.error);

      if (res?.data?.status === 'fail') {
        setToastState({
          message: res.data.message,
          type: 'error',
          visible: true
        });
      }

      if (res?.data?.status === 'success') {
        const token = res?.data?.token;
        setTokenCookie(token);
        store.dispatch(setUserEncryptedToken(token));
        setToastState({
          message: 'Signup successful',
          type: 'success',
          visible: true
        });
      }
    })
    .catch((err) => {
      // error handling
      setToastState({
        message: err.message,
        type: 'error',
        visible: true
      });
    });

  console.log(response);
  return response;
};

const signupForm = async (
  formObj: IAuthSignup,
  setToastState: Dispatch<SetStateAction<IToast>>
) => {
  // const { name, email, password, confirmPassword } = formObj;

  // // check if email and password are valid
  // if (
  //   !isValidateName(name) ||
  //   !isValidEmail(email) ||
  //   !isValidPassword(password) ||
  //   !checkPassword(password, confirmPassword)
  // ) {
  //   setToastState({
  //     message: 'Invalid credentials',
  //     type: 'error',
  //     visible: true
  //   });
  //   return;
  // }

  await signupMiddleware(formObj, setToastState);
};

export interface IPartnerSignupForm {
  name: string;
  hotelEmail: string;
  hotelPassword: string;
  hotelConfirmPassword: string;
  hotelPhone: string;
  hotelAddress: string;
  hotelZip: string;
  latitude?: number;
  longitude?: number;
}

interface IPartnerSignupExtension extends IPartnerSignupForm {
  hotelCity: string;
  hotelState: string;
  hotelCountry: string;
}

const partnerSignupMiddleware = async (formObj: IPartnerSignupForm) => {
  const response = await fetch('/api/auth/partner/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formObj)
  })
    .then((response) => response.json())
    .catch((err) => {
      // error handling
      console.log('error', err);
    });

  console.log(response);
  return response;
};

const partnerSignupForm = async (
  formObj: IPartnerSignupForm,
  setToastState: Dispatch<SetStateAction<IToast>>
) => {
  setToastState({
    message: 'Loading...',
    type: 'info',
    visible: true
  });

  const ipAddr = await fetch('https://api.ipify.org/?format=json').then((res) =>
    res.json()
  );

  const location = await fetch(
    `http://ip-api.com/json/${ipAddr?.ip}?fields=573951`
  ).then((res) => res.json());

  if (location?.status === 'fail') {
    setToastState({
      message: location?.message ?? 'Location not found',
      type: 'error',
      visible: true
    });
    return;
  }

  const queryObj: IPartnerSignupExtension = {
    ...formObj,
    hotelCountry: location?.country,
    hotelState: location?.regionName,
    hotelCity: location?.city
  };

  if (!queryObj.latitude) queryObj.latitude = location?.lat;
  if (!queryObj.longitude) queryObj.longitude = location?.lon;

  for (const objKey in queryObj) {
    if (Object.prototype.hasOwnProperty.call(queryObj, objKey)) {
      const objEl = queryObj[objKey as keyof IPartnerSignupForm];
      const objElLength = objEl?.toString().trim().length;

      if (!objEl) {
        setToastState({
          message: 'Invalid credentials',
          type: 'error',
          visible: true
        });
        return;
      }

      if (objKey === 'hotelPhone' && objElLength && objElLength < 10) {
        setToastState({
          message: 'Invalid phone number',
          type: 'error',
          visible: true
        });
        return;
      }

      if (objKey === 'hotelZip' && objElLength !== 6) {
        setToastState({
          message: 'Invalid zip code',
          type: 'error',
          visible: true
        });
        return;
      }

      if (objKey === 'hotelPassword') {
        if (!isValidPassword(objEl.toString())) {
          setToastState({
            message: 'Invalid password',
            type: 'error',
            visible: true
          });
          return;
        }
      }

      if (objKey === 'hotelConfirmPassword') {
        if (
          !checkPassword(
            objEl.toString().trim(),
            queryObj.hotelPassword.toString().trim()
          )
        ) {
          setToastState({
            message: 'Invalid password',
            type: 'error',
            visible: true
          });
          return;
        }
      }

      if (objKey === 'hotelEmail') {
        if (!isValidEmail(objEl.toString().trim())) {
          setToastState({
            message: 'Invalid credentials',
            type: 'error',
            visible: true
          });
          return;
        }
      }

      if (objKey === 'hotelName') {
        if (objElLength && objElLength < 3) {
          setToastState({
            message: 'Invalid name',
            type: 'error',
            visible: true
          });
          return;
        }
      }

      if (objKey === 'hotelAddress') {
        if (objElLength && objElLength < 10) {
          setToastState({
            message: 'Invalid hotel address',
            type: 'error',
            visible: true
          });
          return;
        }
      }
    }
  }

  const response = await partnerSignupMiddleware(formObj);
  console.log(response);
};

export { signupForm, partnerSignupForm };
