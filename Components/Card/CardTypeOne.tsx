import Image from 'next/image';
import { Fragment } from 'react';
import cardStyles from '../../styles/Components/Card/CardTypeOne.module.scss';

const CardTypeOne = ({ wide = false }: { wide?: boolean }) => {
  return (
    <div className={cardStyles.card}>
      <div className={cardStyles.imageContainer}>
        <Image
          src={
            'https://images.unsplash.com/photo-1663706532601-60130a7bbb74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
          }
          layout="fill"
          objectFit="cover"
          alt="image"
        />
        <button>
          <span className="material-symbols-outlined">favorite</span>
        </button>
      </div>
      <div className={cardStyles.cardContent}>
        <h5>Al burj Hotel</h5>
        <p>100 Smart Street, LA, USA</p>
        {wide ? (
          <Fragment>
            <p>&#8377; 1000 - 3000</p>
            <div className={cardStyles.amenitiesContainer}>
              {/* <Bed />
              <Bathtub />
              <TimeToLeave />
              <Pets />
              <Wifi /> */}
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className={cardStyles.starsContainer}>
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
