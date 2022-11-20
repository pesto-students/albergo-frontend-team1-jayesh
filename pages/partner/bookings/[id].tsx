import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import Layout from '../../../Components/Layout/Layout';
import styles from '../../../styles/Partner/bookingId.module.scss';
import { MaterialIcon, Rupee } from '../../../Utils/Helper';

const BookingId = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
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
              <p>
                <Rupee /> 1000
              </p>
            </div>
            <div className={styles.detailsItem}>
              <p>Payment Method</p>
              <p>paypal</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingId;
