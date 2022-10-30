import type { NextApiRequest, NextApiResponse } from 'next';
import {
  API_URL,
  isValidEmail,
  isValidPassword
} from '../../../Utils/auth/authHelper';
import { inValidPasswordMsg } from '../../../Utils/Helper';

interface IResponseData {
  message?: string;
  data?: unknown;
  error?: unknown;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseData>
) {
  //   only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  //   get the email and password from the request body
  const { email, password } = req.body;

  //   check if email and password are valid
  if (!email || !password) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Invalid email' });
  }

  if (!isValidPassword(password)) {
    return res.status(400).json({ message: inValidPasswordMsg });
  }

  return new Promise<void>(async (resolve) => {
    const raw = JSON.stringify({
      email,
      password
    });

    await fetch(`${API_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: raw
    })
      .then((response) => response.json())
      .then((response) => {
        res.status(200).json({ data: response });
        resolve();
      })
      .catch((err) => {
        console.log(err);
        res.status(200).json({ error: 'Please try again later' });
        resolve();
      });
  });
}
