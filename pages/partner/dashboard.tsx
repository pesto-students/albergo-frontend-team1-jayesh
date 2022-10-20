import Layout from '../../Components/Layout/Layout';
import dashboardStyles from '../../styles/Partner/dashboard.module.scss';
import { MaterialIcon } from '../../Utils/Helper';

const Dashboard = () => {
  const isHotelOpen = true;

  // name, roomType, checkInDate, paymentMethod, LinkToViewInDetails

  return (
    <Layout>
      <div className={dashboardStyles.main}>
        <div className={dashboardStyles.sectionHeader}>
          <h5>Available rooms</h5>
          <div className={dashboardStyles.btnOptions}>
            <button>Edit Rooms</button>
            <button>View all</button>
          </div>
        </div>
        <div className={dashboardStyles.roomsContainer}>
          {Array(15)
            .fill(0)
            .map((_, index) => (
              <div className={dashboardStyles.roomCard} key={index}>
                <div className={dashboardStyles.roomImage}></div>
                <div className={dashboardStyles.roomDetails}>
                  <p>Room Name</p>
                  <small>Room Description</small>
                  <div className={dashboardStyles.roomPrice}>
                    <small>Price</small>
                    <small>Discount</small>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className={dashboardStyles.sectionHeader}>
          <h5>Hotel Description</h5>
          <div className={dashboardStyles.btnOptions}>
            <button>Edit</button>
          </div>
        </div>
        <div className={dashboardStyles.descContainer}>
          <div className={dashboardStyles.descRowOne}>
            <div className={dashboardStyles.iconContainer}>
              {MaterialIcon('hotel')}
            </div>
            <div className={dashboardStyles.descContent}>
              <div className={dashboardStyles.descHeader}>
                <h4>Al burg Hotel</h4>
                <small
                  className={`${
                    isHotelOpen
                      ? dashboardStyles.openChip
                      : dashboardStyles.closeChip
                  } ${dashboardStyles.chip}
                  `}
                >
                  {isHotelOpen ? 'Open' : 'closed'}
                </small>
              </div>
              <div className={dashboardStyles.descDetailContainer}>
                <div className={dashboardStyles.descDetails}>
                  <p>Place : </p>
                  <p className={dashboardStyles.fontDark}>London</p>
                </div>
                <div className={dashboardStyles.descDetails}>
                  <p>Road : </p>
                  <p className={dashboardStyles.fontDark}>Baker street</p>
                </div>
                <div className={dashboardStyles.descDetails}>
                  <p className={dashboardStyles.fontLight}>Mail : </p>
                  <a href="mailto:alburjhotel@london.com">
                    <p className={dashboardStyles.fontDark}>
                      alburjhotel@london.com
                    </p>
                  </a>
                </div>
                <div className={dashboardStyles.descDetails}>
                  <p className={dashboardStyles.fontLight}>Phone : </p>
                  <a href="tel:+919702076050">
                    <p className={dashboardStyles.fontDark}>+91 970 207 6050</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className={dashboardStyles.descRowTwo}>
            <div className={dashboardStyles.contentItem}>
              <p>Available Rooms</p>
              <h5>50</h5>
            </div>
            <div className={dashboardStyles.contentItem}>
              <p>highlight</p>
              <h5>1km to airport</h5>
            </div>
            <div className={dashboardStyles.contentItem}>
              <p>review</p>
              <small>
                <span>8.8</span> Excellent (3003 reviews)
              </small>
            </div>
            <div className={dashboardStyles.contentItem}>
              <p>Check in</p>
              <h5>9:00 AM</h5>
            </div>
            <div className={dashboardStyles.contentItem}>
              <p>Check out</p>
              <h5>6:00 PM</h5>
            </div>
          </div>
        </div>
        <div className={dashboardStyles.sectionHeader}>
          <h5>Bookings</h5>
          <div className={dashboardStyles.btnOptions}>
            <button>View</button>
          </div>
        </div>
        <table className={dashboardStyles.bookingsTable}>
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
