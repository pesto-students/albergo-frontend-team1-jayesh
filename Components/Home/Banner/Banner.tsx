import Image from 'next/image';
import styles from '../../../styles/Homescreen/Banner.module.scss';
import { MaterialIcon } from '../../../Utils/Helper';
import DateRangePicker from '../../DateRangePicker/DateRangePicker';

const Banner = () => {
  const catergoryObj = {
    categories: ['rooms', 'flats', 'hostels', 'villas'],
    active: 2
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.tabSection}>
          <h2>find</h2>
          {catergoryObj.categories.map((catergory, index) => (
            <div
              key={index}
              className={
                catergoryObj.active === index ? styles.tabActive : undefined
              }
            >
              <h4>{catergory}</h4>
            </div>
          ))}
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Which city do you prefer?" />
          {/* <hr /> */}
          <DateRangePicker
            onChange={(date) => console.log(date)}
            placeholder={'Check in date'}
          />
          {/* <hr /> */}
          <DateRangePicker
            onChange={(date) => console.log(date)}
            placeholder={'Check out date'}
          />
          {/* <hr /> */}
          <input type="number" placeholder="Guests" />
          <button className={styles.searchBtn} type="submit">
            <MaterialIcon iconName="search" />
          </button>
        </form>
      </div>
      <div className={styles.imageContainer}>
        <Image
          src={
            'https://images.unsplash.com/photo-1663038449536-8bc1bc2c9124?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1071&q=80'
          }
          alt="banner"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
    </div>
  );
};

export default Banner;
