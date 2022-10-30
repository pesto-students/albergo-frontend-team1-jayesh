import Image from 'next/image';
import Layout from '../../Components/Layout/Layout';
import styles from '../../styles/Partner/dashboard.module.scss';
import { MaterialIcon } from '../../Utils/Helper';

const Dashboard = () => {
  const isHotelOpen = true;

  // name, roomType, checkInDate, paymentMethod, LinkToViewInDetails

  return (
    <Layout>
      <div className={styles.main}>
        <div className={styles.sectionHeader}>
          <h5>Hotel Description</h5>
          <div className={styles.btnOptions}>
            <button>Edit</button>
          </div>
        </div>
        <div className={styles.descContainer}>
          <div className={styles.descRowOne}>
            <div className={styles.iconContainer}>
              <MaterialIcon iconName="hotel" />
            </div>
            <div className={styles.descContent}>
              <div className={styles.descHeader}>
                <h4>Al burg Hotel</h4>
                <small
                  className={`${
                    isHotelOpen ? styles.openChip : styles.closeChip
                  } ${styles.chip}
                  `}
                >
                  {isHotelOpen ? 'Open' : 'closed'}
                </small>
              </div>
              <div className={styles.descDetailContainer}>
                <div className={styles.descDetails}>
                  <p>Place : </p>
                  <p className={styles.fontDark}>London</p>
                </div>
                <div className={styles.descDetails}>
                  <p>Road : </p>
                  <p className={styles.fontDark}>Baker street</p>
                </div>
                <div className={styles.descDetails}>
                  <p className={styles.fontLight}>Mail : </p>
                  <a href="mailto:alburjhotel@london.com">
                    <p className={styles.fontDark}>alburjhotel@london.com</p>
                  </a>
                </div>
                <div className={styles.descDetails}>
                  <p className={styles.fontLight}>Phone : </p>
                  <a href="tel:+919702076050">
                    <p className={styles.fontDark}>+91 970 207 6050</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className={styles.descRowTwo}>
            <div className={styles.contentItem}>
              <p>Available Rooms</p>
              <h5>50</h5>
            </div>
            <div className={styles.contentItem}>
              <p>highlight</p>
              <h5>1km to airport</h5>
            </div>
            <div className={styles.contentItem}>
              <p>review</p>
              <small>
                <span>8.8</span> Excellent (3003 reviews)
              </small>
            </div>
            <div className={styles.contentItem}>
              <p>Check in</p>
              <h5>9:00 AM</h5>
            </div>
            <div className={styles.contentItem}>
              <p>Check out</p>
              <h5>6:00 PM</h5>
            </div>
          </div>
        </div>
        <div className={styles.sectionHeader}>
          <h5>Hotel Photos</h5>
          <div className={styles.btnOptions}>
            <button>Edit</button>
          </div>
        </div>
        <div className={styles.photosContainer}>
          {Array(15)
            .fill(0)
            .map((_, i) => (
              <div className={styles.photoCard} key={i}>
                <Image
                  src={
                    'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
                  }
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  alt="hotel"
                />
                <button>
                  <MaterialIcon iconName="delete" />
                </button>
              </div>
            ))}
        </div>
        <div className={styles.sectionHeader}>
          <h5>Available rooms</h5>
          <div className={styles.btnOptions}>
            <button>Edit Rooms</button>
            <button>View all</button>
          </div>
        </div>
        <div className={styles.roomsContainer}>
          {Array(15)
            .fill(0)
            .map((_, index) => (
              <div className={styles.roomCard} key={index}>
                <div className={styles.roomImage}></div>
                <div className={styles.roomDetails}>
                  <p>Room Name</p>
                  <small>Room Description</small>
                  <div className={styles.roomPrice}>
                    <small>Price</small>
                    <small>Discount</small>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className={styles.sectionHeader}>
          <h5>Bookings</h5>
          <div className={styles.btnOptions}>
            <button>View</button>
          </div>
        </div>
        <table className={styles.bookingsTable}>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Customer Name</th>
              <th>Room Type</th>
              <th>Check In Date</th>
              <th>Payment Method</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <tr key={index}>
                  <td>123456</td>
                  <td>John Doe</td>
                  <td>Deluxe Room</td>
                  <td>12/12/2021</td>
                  <td>Paypal</td>
                  <td>
                    <button>View</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Dashboard;
