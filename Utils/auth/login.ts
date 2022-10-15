import { Dispatch, SetStateAction } from 'react';
import { IToast } from '../../Components/Toast/Toast';
import store from '../../redux/store';
import { setUserEncryptedToken } from '../../redux/user/user.slice';
import {
  // isValidEmail,
  // isValidPassword,
  setTokenCookie
} from './authHelper';

interface ILoginFormObj {
  email: string;
  password: string;
}

const loginMiddleware = async (
  formObj: ILoginFormObj,
  setToastState: Dispatch<SetStateAction<IToast>>
) => {
  const { email, password } = formObj;

  await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
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
          message: 'Login successful',
          type: 'success',
          visible: true
        });
      }
    })
    .catch((err: Error) => {
      // error handling
      setToastState({
        message: err.message,
        type: 'error',
        visible: true
      });
    });
  return;
};

const loginForm = async (
  formObj: ILoginFormObj,
  setToastState: Dispatch<SetStateAction<IToast>>
) => {
  // const { email, password } = formObj;

  // if (!isValidEmail(email) || !isValidPassword(password)) {
  //   setToastState({
  //     message: 'Invalid email or password',
  //     type: 'error',
  //     visible: true
  //   });
  //   return;
  // }

  await loginMiddleware(formObj, setToastState);
  return;
};

const partnerLoginMiddleware = async (formObj: ILoginFormObj) => {
  const response = await fetch('/api/auth/partner/login', {
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

const partnerLoginForm = async (formObj: ILoginFormObj) => {
  const response = await partnerLoginMiddleware(formObj);
  console.log(response);
};

export { loginForm, partnerLoginForm };
