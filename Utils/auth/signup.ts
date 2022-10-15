import { checkPassword, isValidEmail, isValidPassword } from './authHelper';

interface IAuthSignup {
  email: string;
  password: string;
  confirmPassword: string;
}

const signupMiddleware = async (formObj: IAuthSignup) => {
  const { email, password } = formObj;

  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })
    .then((response) => response.json())
    .catch((err) => {
      // error handling
      console.log('error', err);
    });

  console.log(response);
  return response;
};

const signupForm = async (formObj: IAuthSignup) => {
  const { email, password, confirmPassword } = formObj;

  // check if email and password are valid
  if (
    !email ||
    !password ||
    !isValidEmail(email) ||
    !isValidPassword(password) ||
    !checkPassword(password, confirmPassword)
  ) {
    console.error({ error: 'Invalid email or password' });
  }

  const response = await signupMiddleware(formObj);
  console.log(response);
};

interface IPartnerSignup {
  hotelName: string;
  hotelEmail: string;
  hotelPassword: string;
  hotelConfirmPassword: string;
  hotelPhone: string;
  hotelAddress: string;
  hotelCity: string;
  hotelState: string;
  hotelCountry: string;
  latitude: number;
  longitude: number;
}

const partnerSignupMiddleware = async (formObj: IPartnerSignup) => {
  const response = await fetch('/api/auth/partner/signup', {
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

const partnerSignupForm = async (formObj: IPartnerSignup) => {
  const response = await partnerSignupMiddleware(formObj);
  console.log(response);
};

export { signupForm, partnerSignupForm };
