// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

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

  interface Booking {
    hotel: {
      name: string;
      email: string;
      phone: string;
      slug: string | string[] | undefined;
    };
    room: {
      type: string;
      price: number;
      images: {
        list: string[];
        activeIndex: number;
      };
      capacity: number;
    };
    customerDetails: {
      name: string;
      email: string;
      phone: string;
      checkInDate: Date;
      checkOutDate: Date;
      guest: {
        adults: number;
        children: number;
      };
      roomQuantity: number;
    };
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    amount: number;
  }

  // validate request body

  const booking: Booking = req.body;

  // validate booking

  if (
    !booking.hotel.name ||
    !booking.hotel.email ||
    !booking.hotel.phone ||
    !booking.hotel.slug ||
    !booking.room.type ||
    !booking.room.price ||
    !booking.room.images ||
    !booking.room.capacity ||
    !booking.customerDetails.name ||
    !booking.customerDetails.email ||
    !booking.customerDetails.phone ||
    !booking.customerDetails.checkInDate ||
    !booking.customerDetails.checkOutDate ||
    !booking.customerDetails.guest ||
    !booking.customerDetails.roomQuantity ||
    !booking.razorpay_order_id ||
    !booking.razorpay_payment_id ||
    !booking.razorpay_signature ||
    !booking.amount
  ) {
    return res.status(400).json({ message: 'Invalid request body' });
  }

  return new Promise<void>(async (resolve) => {
    const raw = JSON.stringify(booking);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: raw
        }
      );

      if (response.ok) {
        const data = await response.json();
        res.status(200).json({ message: data.message });
        resolve();
      }

      if (!response.ok) {
        const data = await response.json();
        res.status(400).json({ message: data.message });
        resolve();
      }
    } catch (error) {
      res.status(200).json({ message: 'Please try again later' });
      resolve();
    }
  });
}
