import { Dispatch, SetStateAction } from 'react';
import { IToast } from '../../Components/Toast/Toast';
import store from '../../redux/store';
import { setUserEncryptedToken } from '../../redux/user/user.slice';
import {
  // checkPassword,
  // isValidateName,
  // isValidEmail,
  // isValidPassword,
  setTokenCookie
} from './authHelper';

interface IAuthSignup {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const signupPost = async (
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

  await signupPost(formObj, setToastState);
};

export { signupForm };
