interface ILoginFormObj {
  email: string;
  password: string;
}

const isValidEmail = (email: string) => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

const isValidPassword = (password: string) => {
  //   const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return password.trim().length > 0 ? true : false;
  //   return re.test(String(password));
};

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
    throw new Error('Invalid email or password');
  }

  const response = await loginPost(formObj);
  console.log(response);
};

export { loginForm };
