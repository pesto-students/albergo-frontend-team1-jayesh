import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';

const API_URL = process.env.API_URL;

const JWT_TOKEN_NAME = process.env.JWT_TOKEN_NAME ?? 'token';

const isValidEmail = (email: string) => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

const isValidPassword = (password: string) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return re.test(String(password));
};

const checkPassword = (password: string, confirmPassword: string) => {
  return password === confirmPassword;
};

const parseJWT = (token: string) => {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
};

const setTokenCookie = (token: string) => {
  nookies.set(null, JWT_TOKEN_NAME, token, {
    path: '/',
    maxAge: 30 * 24 * 60 * 60,
    sameSite: true,
    secure: process.env.NODE_ENV === 'production'
  });
  if (typeof window !== 'undefined') {
    localStorage.setItem(JWT_TOKEN_NAME, token);
  }
  return;
};

const getTokenCookieServer = (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);
  return cookies.JWT_TOKEN_NAME;
};

const destroyTokenCookie = () => {
  nookies.destroy(null, JWT_TOKEN_NAME, {
    path: '/'
  });
  return;
};

export {
  isValidEmail,
  isValidPassword,
  checkPassword,
  API_URL,
  parseJWT,
  setTokenCookie,
  getTokenCookieServer,
  destroyTokenCookie
};
