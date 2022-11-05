import type { NextApiRequest, NextApiResponse } from 'next';
import {
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

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hotel/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: raw
      });

      if (!response.ok) {
        res.status(400).json({
          data: []
        });
        resolve()
      }

      if (response.ok) {
        const responseData = await response.json();

        res.status(200).json({ data: responseData.data })
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: 'Please try again later' });
      resolve();
    }
  });
}
