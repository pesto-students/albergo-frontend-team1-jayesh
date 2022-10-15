import type { NextApiRequest, NextApiResponse } from 'next';
import { API_URL } from '../../../../Utils/auth/authHelper';

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

  //   //   get the email and password from the request body
  //   const { email, password } = req.body;

  //   //   check if email and password are valid
  //   if (!email || !password) {
  //     return res.status(400).json({ message: 'Invalid email or password' });
  //   }

  return new Promise<void>(async (resolve) => {
    const raw = JSON.stringify(req.body);

    await fetch(`${API_URL}/partner/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: raw
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((response) => {
        res.status(200).json({ data: response });
        resolve();
      })
      .catch((error) => {
        res.status(200).json({ error: error.message });
        resolve();
      });
  });
}
