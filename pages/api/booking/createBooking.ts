// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { makeReq } from '../../../Utils/db';

interface IResponseData {
  message?: string;
  data?: unknown;
  error?: unknown;
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseData>
) {
  // only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const token = req.headers.authorization;

  return new Promise<void>(async (resolve) => {

    const resObj = await makeReq(
      `${process.env.NEXT_PUBLIC_API_URL}/api/booking/`,
      'POST',
      req.body,
      token
    );

    if (!resObj || resObj.error || !resObj.response) {
      res.status(400).json({ error: resObj.error ?? "Please try again later" });
      resolve();
      return;
    }

    res.status(resObj.response.status).json(resObj.res);
    resolve();
    return;
  });
}
