import { AlertColor } from '@mui/material';
import { JSONContent } from '@tiptap/react';
import { Fragment, useEffect, useState } from 'react';
import { SnackbarMessage, OptionsObject as SnackbarOptions, SnackbarKey } from "notistack";

export interface AlertStateType {
  visible: boolean;
  severity: AlertColor;
  message: string;
}

export interface IExpValidator {
  location: string;
  msg?: string;
  param: string;
  value?: string;
}

export type IHotelCategories = "featuredHotels" | "topRatedHotels" | "latestHotels";

export interface IHotelData {
  slug: string;
  name: string;
  city: string;
  state: string;
  country: string;
  coordinates: {
    long: number;
    lat: number;
  };
  hotelImages: {
    link: string;
    ref: string;
  }[];
  ratingsAverage: number;
  rooms: string[];
}

export interface IHotelDataOverview {
  category: string;
  data: IHotelData[];
};

export interface IFullHotelData {
  slug: string;
  name: string;
  city: string;
  state: string;
  country: string;
  coordinates: {
    long: number;
    lat: number;
  };
  hotelImages: {
    link: string;
    ref: string;
  }[];
  address: string,
  description: JSONContent,
  email: string,
  facilities: {
    label: string,
    icon: string,
  }[],
  isFeatured: boolean,
  phone: string,
  reviews: string[],
  ratingsAverage: number,
  ratingsQuantity: number,
  rooms: IRoomData[];
};

export interface IRoomData {
  name: string;
  roomId: string;
  hotelSlug: string;
  price: number;
  capacity: number;
  images: {
    link: string;
    ref: string;
  }[];
  description: JSONContent;
  quantity: number;
}

export interface IUserData {
  bookings: string[];
  email: string;
  name: string;
  reviews: string[];
  uuid: string;
  wishlist: string[];
  profileImage: string;
  phone: string;
}

export interface IBookingData {
  bookingId: string;
  hotelSlug: string;
  userUUID: string;
  guest: {
    adults: number;
    children: number;
  };
  amount: number;
  razorpay_payment_id: string;
  room: {
    roomName?: string | undefined;
    roomId?: string | undefined;
    quantity?: number | undefined;
  };
  checkIn: string;
  checkOut: string;
  userName: string;
  hotelName: string;
}

export const Rupee = () => <span >&#8377;</span>;

export const MaterialIcon = ({ iconName }: { iconName: string; }) => {
  return <span className="material-symbols-outlined">{iconName}</span>;
};

export type UserRole = 'partner' | 'user';

export const inValidPasswordMsg =
  'Password must be at least 8 characters long and contain at least one number, one uppercase letter, one lowercase letter and special character';

export const ReadMore = ({
  text,
  maxLength = 100
}: {
  text: string;
  maxLength?: number;
}) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <Fragment>
      {isReadMore ? text.slice(0, maxLength) : text}
      <span onClick={toggleReadMore} className="readMore">
        {isReadMore && '...read more'}
      </span>
    </Fragment>
  );
};

export const generateUID = (first: string, second: string) => {
  let firstPart: string | number = (Math.random() * 46656) | 0;
  let secondPart: string | number = (Math.random() * 46656) | 0;
  firstPart = (
    first.replace(" ", "-").slice(0, 3) + firstPart.toString(36)
  ).slice(-3);
  secondPart = (second.slice(0, 3) + secondPart.toString(36)).slice(-3);
  const result = firstPart + secondPart;
  return result.toString().toLowerCase().trim();
};

export type SnackbarType = (message: SnackbarMessage, options?: SnackbarOptions | undefined) => SnackbarKey;

export const hotelFacilities = [
  {
    label: "wifi",
    icon: "wifi",
  },
  {
    label: "parking",
    icon: "local_parking",
  },
  {
    label: "breakfast",
    icon: "breakfast_dining",
  },
  {
    label: "air conditioning",
    icon: "mode_fan",
  },
  {
    label: "swimming pool",
    icon: "pool",
  },
  {
    label: "gym",
    icon: "fitness_center",
  },
  {
    label: "spa",
    icon: "spa",
  },
  {
    label: "restaurant",
    icon: "restaurant",
  },
  {
    label: "bar lounge",
    icon: "nightlife",
  },
  {
    label: "room service",
    icon: "room_service",
  },
  {
    label: "laundry",
    icon: "laundry",
  },
  {
    label: "front desk",
    icon: "local_convenience_store",
  },
  {
    label: "security",
    icon: "security",
  },
  {
    label: "shuttle service",
    icon: "commute",
  },
  {
    label: "airport shuttle",
    icon: "airport_shuttle",
  },
  {
    label: "pets allowed",
    icon: "pets",
  },
  {
    label: "wheelchair accessible",
    icon: "accessible",
  },
  {
    label: "local tours",
    icon: "tour",
  }
];

export const formatDate = (date: string) => {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  return `${day}-${month}-${year}`;
};

export const useImageCarousel = (images: { link: string; ref: string; }[], interval: number) => {

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const removeInterval = setInterval(() => {
      if (index === images.length - 1) {
        setIndex(0);
      }
      else {
        setIndex(index + 1);
      }
    }, interval);
    return () => clearInterval(removeInterval);
  }, [index]);

  return images[index];
};

