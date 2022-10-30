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
  hotelName: string;
  hotelEmail: string;
  hotelPassword: string;
  hotelConfirmPassword: string;
  hotelPhone: string;
  hotelAddress: string;
  hotelZip: string;
  latitude?: number;
  longitude?: number;
  hotelCity: string;
  hotelState: string;
  hotelCountry: string;
}

const partnerSignupForm = async (
  formObj: IPartnerSignupForm,
  setToastState: Dispatch<SetStateAction<IToast>>
) => {
  setToastState({
    message: 'Loading...',
    type: 'info',
    visible: true
  });

  await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formObj, role: 'partner' })
  })
    .then((response) => {
      if (response.status !== 200) {
        return response.json().then((res) => {
          setToastState({
            message: res.message ?? res.error ?? 'Something went wrong',
            type: 'error',
            visible: true
          });
        });
      }
      if (response.status === 200) {
        return response.json().then((res) => {
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
        });
      }
    })
    .catch((err) => {
      setToastState({
        message: err.message ?? err.error ?? 'Something went wrong',
        type: 'error',
        visible: true
      });
      return;
    });
};

export { signupForm, partnerSignupForm };
