import type { NextApiRequest, NextApiResponse } from 'next';
import {
  NEXT_PUBLIC_API_URL,
} from '../../../Utils/auth/authHelper';

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

  return new Promise<void>(async (resolve) => {
    const raw = JSON.stringify({
      searchBy: req.body
    });

    await fetch(`${NEXT_PUBLIC_API_URL}/hotel/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: raw
    })
      .then((response) => {
        if (!response.ok) {
          res.status(200).json({ data: [] });
          return;
        }
        return response.json()
      })
      .then((response) => {
        res.status(200).json({ data: response.data });
        resolve();
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ error: 'Please try again later' });
        resolve();
      });
  });
}
