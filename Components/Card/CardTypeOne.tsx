import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import styles from '../../styles/Components/Card/CardTypeOne.module.scss';
import { MaterialIcon } from '../../Utils/Helper';

const CardTypeOne = ({ wide = false }: { wide?: boolean }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={
            'https://images.unsplash.com/photo-1663706532601-60130a7bbb74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
          }
          layout="fill"
          objectFit="cover"
          alt="image"
        />
        <button>{MaterialIcon('favorite')}</button>
      </div>
      <div className={styles.cardContent}>
        <Link href={'/hotel/a/register'}>
          <a>
            <h5>Al burj Hotel</h5>
          </a>
        </Link>
        <p>100 Smart Street, LA, USA</p>
        {wide ? (
          <Fragment>
            <p>&#8377; 1000 - 3000</p>
            <div className={styles.amenitiesContainer}>
              {/* <Bed />
              <Bathtub />
              <TimeToLeave />
              <Pets />
              <Wifi /> */}
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className={styles.starsContainer}>
              {/* <Star />
              <Star />
              <Star /> */}
            </div>
            <p>209 reviews</p>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default CardTypeOne;
