import dayjs from 'dayjs';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Link from 'next/link';
import Layout from '../../Components/Layout/Layout';
import styles from '../../styles/Partner/bookingId.module.scss';
import { getTokenCookie, parseJWT } from '../../Utils/auth/authHelper';
import { makeReq } from '../../Utils/db';
import { IBookingData, IUserData, MaterialIcon, Rupee } from '../../Utils/Helper';

interface IBookingIdProps {
  data: {
    bookingDoc: IBookingData;
    userDoc: IUserData;
  };

}

const BookingId: NextPage<IBookingIdProps> = ({ data }) => {

  const dateToFormattedString = (date: string) => {
    return dayjs(date).format("ddd, DD MMM YYYY");
  };

  const numberOfDays = (checkIn: string, checkOut: string) => {
    const checkInDate = dayjs(checkIn);
    const checkOutDate = dayjs(checkOut);
    return checkOutDate.diff(checkInDate, "day");
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.info}>
            <h4>{data.userDoc.name}</h4>
            <p>
              Booked <span>{data.bookingDoc.room.roomName}</span> from <span>{dateToFormattedString(data.bookingDoc.checkIn)}</span> till <span>{dateToFormattedString(data.bookingDoc.checkOut)}</span>
            </p>
          </div>
        </div>
        <div className={styles.detailsContainer}>
          <div className={styles.detailsHeader}>
            <h4>Booking Details</h4>
            <p>
              Booking ID: <span>{data.bookingDoc.bookingId}</span>
            </p>
          </div>
          <div className={styles.details}>
            <div className={styles.detailsItem}>
              <p>Customer Name</p>
              <p>{data.userDoc.name}</p>
            </div>
            <div className={styles.detailsItem}>
              <p>
                <MaterialIcon iconName="email" /> Customer Email
              </p>
              <p>
                <a href={`mailto:${data.userDoc.email}`}>{data.userDoc.email}</a>
              </p>
            </div>
            <div className={styles.detailsItem}>
              <p>
                <MaterialIcon iconName="phone" /> Customer Phone
              </p>
              <p>
                <a href={`tel:${data.userDoc.phone}`}>{data.userDoc.phone}</a>
              </p>
            </div>
            <div className={styles.detailsItem}>
              <p>Hotel name</p>
              <Link href={`/hotel/${data.bookingDoc.hotelSlug}`}>
                <a>
                  <p>{data.bookingDoc.hotelName}</p>
                </a>
              </Link>
            </div>
            <div className={styles.detailsItem}>
              <p>Room Type</p>
              <p>{data.bookingDoc.room.roomName}</p>
            </div>
            <div className={styles.detailsItem}>
              <p>Check In</p>
              <p>{dateToFormattedString(data.bookingDoc.checkIn)}</p>
            </div>
            <div className={styles.detailsItem}>
              <p>Check Out</p>
              <p>{dateToFormattedString(data.bookingDoc.checkOut)}</p>
            </div>
            <div className={styles.detailsItem}>
              <p>Number of Guests</p>
              <p>{data.bookingDoc.guest.adults + data.bookingDoc.guest.children}</p>
            </div>
            <div className={styles.detailsItem}>
              <p>Number of Rooms</p>
              <p>{data.bookingDoc.room.quantity}</p>
            </div>
            <div className={styles.detailsItem}>
              <p>Number of Days</p>
              <p>{numberOfDays(data.bookingDoc.checkIn, data.bookingDoc.checkOut)}</p>
            </div>
            <div className={styles.detailsItem}>
              <p>Amount</p>
              <p>
                <Rupee /> {data.bookingDoc.amount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingId;

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {

  const token = getTokenCookie(ctx);
  const userToken = parseJWT(token);

  if (!userToken) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const bookingId = ctx.params?.id;

  console.log(bookingId);

  if (!bookingId) {
    return {
      notFound: true,
    };
  }

  const resObj = await makeReq(`${process.env.NEXT_PUBLIC_API_URL}/api/booking/${bookingId}`, "GET", undefined, token);

  if (!resObj || resObj.error || (resObj.response && !resObj.response.ok)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: resObj.res?.data
    }
  };
};