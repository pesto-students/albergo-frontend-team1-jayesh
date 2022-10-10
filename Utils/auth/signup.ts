interface IAuthSignup {
  email: string;
  password: string;
  confirmPassword: string;
}

const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  //   return re.test(email);
  return true;
};

const validatePassword = (password: string) => {
  //   const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  //   return re.test(password);
  return true;
};

const checkPassword = (password: string, confirmPassword: string) => {
  return password === confirmPassword;
};

const signupForm = async (data: IAuthSignup) => {
  const { email, password, confirmPassword } = data;

  if (!validateEmail(email)) {
    // throw new Error('Invalid email');
    console.error({ error: 'Invalid email' });
  }

  if (!validatePassword(password)) {
    // throw new Error('Invalid password');
    console.error({ error: 'Invalid password' });
  }

  if (!checkPassword(password, confirmPassword)) {
    // throw new Error('Passwords do not match');
    console.error({ error: 'Passwords do not match' });
  }

  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  }).then((response) => response.json());
  console.log(response);
  return response;
};

export default signupForm;
