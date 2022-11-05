import { NextRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { IToast } from '../../Components/Toast/Toast';
import { setNavModalType } from '../../redux/navModal/modal.slice';
import store from '../../redux/store';
import { setUserEncryptedToken } from '../../redux/user/user.slice';
import { UserRole } from '../Helper';
import { setTokenCookie } from './authHelper';

export interface IUserSignupForm {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  city: string;
  state: string;
  country: string;
}

export interface IPartnerSignupForm {
  hotelName: string;
  hotelEmail: string;
  hotelPassword: string;
  hotelConfirmPassword: string;
  hotelPhone: string;
  hotelAddress: string;
  lat: number;
  long: number;
  hotelCity: string;
  hotelState: string;
  hotelCountry: string;
}

const signupForm = async (
  formObj: IPartnerSignupForm | IUserSignupForm,
  role: UserRole,
  setToastState: Dispatch<SetStateAction<IToast>>,
  router: NextRouter
) => {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...formObj, role })
    });

    if (response.status !== 200) {
      const res = await response.json();
      setToastState({
        message: res.message ?? res.error ?? 'Something went wrong',
        type: 'error',
        visible: true
      });
    }

    if (response.status === 200) {
      const res = await response.json();

      if (res?.data?.status === 'fail') {
        setToastState({
          message: res.data.message,
          type: 'error',
          visible: true
        });
      }

      if (res?.data?.status === 'success') {
        setToastState({
          message: 'Signup successful',
          type: 'success',
          visible: true
        });
        store.dispatch(setNavModalType("login"));
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

export { signupForm };
