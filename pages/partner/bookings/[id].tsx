import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import Layout from '../../../Components/Layout/Layout';
import styles from '../../../styles/Partner/bookingId.module.scss';
import { MaterialIcon } from '../../../Utils/Helper';

const BookingId = () => {
  const rupee = <span>&#8377;</span>;

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.profilePic}>
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
              layout="fill"
              objectFit="cover"
              alt="profile picture"
            />
          </div>
          <div className={styles.info}>
            <h4>John Doe</h4>
            <p>
              Booked <span>Deluxe room</span> from <span>25 Aug 2022</span> till{' '}
              <span>31 Aug 2022</span>
            </p>
          </div>
        </div>
        <div className={styles.detailsContainer}>
          <div className={styles.detailsHeader}>
            <h4>Booking Details</h4>
            <p>
              Booking ID: <span>123456789</span>
            </p>
          </div>
          <div className={styles.details}>
            <div className={styles.detailsItem}>
              <p>Customer Name</p>
              <p>John Doe</p>
            </div>
            <div className={styles.detailsItem}>
              <p>
                <MaterialIcon iconName="email" /> Customer Email
              </p>
              <p>
                <a href="mailto:john@doe.com">john@doe.com</a>
              </p>
            </div>
            <div className={styles.detailsItem}>
              <p>
                <MaterialIcon iconName="phone" /> Customer Phone
              </p>
              <p>
                <a href="tel:+123456789">+123456789</a>
              </p>
            </div>
            <div className={styles.detailsItem}>
              <p>Room Type</p>
              <p>Deluxe room</p>
            </div>
            <div className={styles.detailsItem}>
              <p>Check In</p>
              <p>25 Aug 2022</p>
            </div>
            <div className={styles.detailsItem}>
              <p>Check Out</p>
              <p>31 Aug 2022</p>
            </div>
            <div className={styles.detailsItem}>
              <p>Number of Guests</p>
              <p>2</p>
            </div>
            <div className={styles.detailsItem}>
              <p>Number of Rooms</p>
              <p>1</p>
            </div>
            <div className={styles.detailsItem}>
              <p>Number of Nights</p>
              <p>6</p>
            </div>
            <div className={styles.detailsItem}>
              <p>Booking Date</p>
              <p>25 Aug 2021</p>
            </div>
            <div className={styles.detailsItem}>
              <p>Booking Status</p>
              <p>Confirmed</p>
            </div>
            <div className={styles.detailsItem}>
              <p>Booking Amount</p>
              <p>{rupee} 1000</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingId;

//export const getServerSideProps: GetServerSideProps = async (
//  context: GetServerSidePropsContext
//) => {
//  const reqQuery = context.query;
//  console.log(reqQuery);
//  return {
//    props: {}
//  };
//};
