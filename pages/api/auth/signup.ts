// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message?: string;
  error?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // only accept POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  // get the email and password from the request body
  const { email, password } = req.body;

  // check if the email and password are valid
  if (!email || !password) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  return new Promise<void>(async (resolve) => {
    await fetch('http://localhost:8080/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then((response) => {
        if (response.ok) {
          res.status(200).json({ message: 'Success' });
        } else {
          res.status(400).json({ error: 'Invalid email or password' });
        }
        resolve();
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
        resolve();
      });
  });
}
