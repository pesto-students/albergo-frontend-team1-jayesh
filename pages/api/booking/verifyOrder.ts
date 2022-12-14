// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createHmac } from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message?: string;
  data?: unknown;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // get the data from the request body
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ message: 'Bad Request' });
  }

  const body = req.body.razorpay_order_id + '|' + req.body.razorpay_payment_id;

  const expectedSignature = createHmac(
    'sha256',
    process.env.RAZORPAY_KEY_SECRET ?? ''
  )
    .update(body.toString())
    .digest('hex');

  let response = { signatureIsValid: 'false' };

  if (expectedSignature === req.body.razorpay_signature)
    response = { signatureIsValid: 'true' };

  return res.status(200).json({ data: response });
}
