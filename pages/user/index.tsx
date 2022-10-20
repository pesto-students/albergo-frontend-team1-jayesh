import styles from '../../styles/User/home.module.scss';
import Layout from '../../Components/Layout/Layout';
import Image from 'next/image';

const UserHome = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <div className={styles.userLogoContainer}>
            <Image
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              layout="fill"
              objectFit="cover"
              alt="user-logo"
            />
          </div>
          <button>Change profile Picture</button>
          <h4>About</h4>
          <small>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Reprehenderit molestiae inventore dignissimos impedit consequatur
            tenetur doloribus ut iure labore ratione veritatis beatae, tempora
            ducimus? Laboriosam officia quos repellendus sit vitae!
          </small>
          <h5>Jane Doe</h5>
          <p>
            <span className="material-symbols-outlined">check</span>
            Email verification
          </p>
          <p>
            <span className="material-symbols-outlined">check</span>
            Mobile verification
          </p>
        </div>
        <div className={styles.content}>
          <h3>Hello, Jane Doe</h3>
          <small>Joined in Aug, 2021</small>
          <button>Edit Profile</button>
          <h5>
            <span className="material-symbols-outlined">star</span> 0 Reviews
          </h5>
          <hr />
          <h5>Hotels reviewd by you</h5>
          <div className={styles.cardContainer}>
            {Array(10)
              .fill(0)
              .map((cardInfo, index) => (
                <div className={styles.hotelCard} key={index}>
                  <div className={styles.hotelImageContainer}>
                    <Image
                      src="https://images.unsplash.com/photo-1664914497213-7aafb1bf9cdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=402&q=80"
                      layout="fill"
                      objectFit="cover"
                      alt="hotel-logo"
                    />
                  </div>
                  <div className={styles.hotelDetails}>
                    <h5>Hotel Name</h5>
                    <small>Location</small>
                    <p>
                      <span className="material-symbols-outlined">star</span>
                      4.5
                    </p>
                    <small>
                      Review : Lorem ipsum, dolor sit amet consectetur
                      adipisicing elit. Quos eum praesentium quisquam saepe
                      assumenda unde totam adipisci optio consequuntur,
                      repudiandae eaque odit iste! Tempora est possimus magni
                      quo iusto laborum.
                    </small>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserHome;
