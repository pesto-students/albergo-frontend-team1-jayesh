import { isValidEmail, isValidPassword, parseJWT } from './authHelper';

interface ILoginFormObj {
  email: string;
  password: string;
}

const loginPost = async (formObj: ILoginFormObj) => {
  const { email, password } = formObj;

  const response = await fetch('/api/auth/login', {
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
      if (res?.data?.status === 'fail') console.log(res?.data?.message);
      if (res?.data?.status === 'success') {
        const token = res?.data?.token;
      }
      return res;
    })
    .catch((err) => {
      // error handling
      console.log('error', err);
    });
  return response;
};

const loginForm = async (formObj: ILoginFormObj) => {
  const { email, password } = formObj;

  // check if email and password are valid
  if (
    !email ||
    !password ||
    !isValidEmail(email) ||
    !isValidPassword(password)
  ) {
    console.error({ error: 'Invalid email or password' });
  }

  await loginPost(formObj);
};

export { loginForm };
