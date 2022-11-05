import { NextRouter, Router } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { IToast } from '../../Components/Toast/Toast';
import { toggleNavModal } from '../../redux/navModal/modal.slice';
import store from '../../redux/store';
import { setUserEncryptedToken } from '../../redux/user/user.slice';
import { setTokenCookie } from './authHelper';

interface ILoginFormObj {
  email: string;
  password: string;
}

const loginForm = async (
  formObj: ILoginFormObj,
  setToastState: Dispatch<SetStateAction<IToast>>,
  router: NextRouter
) => {
  setToastState({
    message: 'Loading...',
    type: 'info',
    visible: true
  });

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formObj)
    });

    if (response.status !== 200) {
      const res = await response.json();
      throw new Error(res.message ?? res.error ?? 'Something went wrong');
    }

    if (response.status === 200) {
      const res = await response.json();
      if (res?.data?.status === 'fail') {
        throw new Error(res.data.message);
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
        store.dispatch(toggleNavModal());
        router.push('/');
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      setToastState({
        message: error.message ?? 'Something went wrong',
        type: 'error',
        visible: true
      });
    }
  }
  return;
};

export { loginForm };
