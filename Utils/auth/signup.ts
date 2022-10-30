import { Dispatch, SetStateAction } from 'react';
import { IToast } from '../../Components/Toast/Toast';
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
  lat: number;
  long: number;
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
    body: JSON.stringify({ ...formObj, role })
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

export { signupForm };
