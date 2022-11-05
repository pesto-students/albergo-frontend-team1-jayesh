import { GetServerSidePropsContext } from 'next';
import { NextRouter } from 'next/router';
import nookies from 'nookies';
import store from '../../redux/store';
import { removeEncryptedToken } from '../../redux/user/user.slice';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const JWT_TOKEN_NAME = process.env.NEXT_PUBLIC_JWT_TOKEN_NAME ?? 'token';

const isValidateName = (name: string) => {
  name = name.toLowerCase().trim();
  const re = /^[a-zA-Z ]+$/;
  return re.test(String(name));
};

const isValidEmail = (email: string) => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

const isValidPassword = (password: string) => {
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d$&+,:;=?@#|'<>.^*()%!-]{8,}$/;
  return re.test(String(password));
};

const checkPassword = (password: string, confirmPassword: string) => {
  return password === confirmPassword;
};

interface IParsedToken {
  id?: string;
  slug?: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
  role: 'User' | 'Hotel';
}

const parseJWT = (token: string | null) => {
  return token === null
    ? null
    : (JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString()
    ) as IParsedToken) ?? null;
};

export const validateJWT = (token: IParsedToken | null) => {
  if (!token) return false
  const tokenexp = new Date(0);
  tokenexp.setUTCSeconds(token.exp);
  if (Date.now() <= +tokenexp) {
    return true
  }
  return false
}

const setTokenCookie = (token: string) => {
  nookies.set(null, JWT_TOKEN_NAME, token, {
    path: '/',
    maxAge: 30 * 24 * 60 * 60,
    sameSite: true,
    secure: process.env.NODE_ENV === 'production'
  });
  localStorage.setItem(JWT_TOKEN_NAME, token);
  return;
};

const getTokenCookie = (ctx?: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx ?? null);
  // if cookies[JWT_TOKEN_NAME] is undefined then check localStorage
  if (!ctx) {
    return (
      cookies[JWT_TOKEN_NAME] ?? localStorage.getItem(JWT_TOKEN_NAME) ?? null
    );
  }

  return cookies[JWT_TOKEN_NAME] ?? null;
};

const destroyTokenCookie = () => {
  nookies.destroy(null, JWT_TOKEN_NAME, {
    path: '/'
  });
  return;
};

const logout = (router: NextRouter) => {
  destroyTokenCookie();
  localStorage.removeItem(JWT_TOKEN_NAME);
  store.dispatch(removeEncryptedToken());
  router.push('/');
};

export {
  isValidateName,
  isValidEmail,
  isValidPassword,
  checkPassword,
  NEXT_PUBLIC_API_URL,
  parseJWT,
  setTokenCookie,
  getTokenCookie,
  destroyTokenCookie,
  logout
};
