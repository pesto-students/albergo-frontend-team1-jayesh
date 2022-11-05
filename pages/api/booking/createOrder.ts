// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import Razorpay from 'razorpay';

type Data = {
  message: string;
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
  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({ message: 'Amount is required' });
  }

  if (isNaN(amount)) {
    return res.status(400).json({ message: 'Amount must be a number' });
  }

  const rzpInstance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });

  const options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency: 'INR'
  };

  return rzpInstance.orders.create(options, (err: any, order: any) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    return res.status(200).json(order);
  });
}
