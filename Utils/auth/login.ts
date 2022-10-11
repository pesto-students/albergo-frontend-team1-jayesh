import { isValidEmail, isValidPassword } from './authHelper';

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

  const response = await loginPost(formObj);
  console.log(response);
};

export { loginForm };
