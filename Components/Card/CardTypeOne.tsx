import Image from 'next/image';
import { FC, Fragment, useEffect, useState } from 'react';
import styles from '../../styles/Components/Card/CardTypeOne.module.scss';
import { IHotelData, MaterialIcon, useImageCarousel } from '../../Utils/Helper';

interface ICardTypeOneProps {
  itemData: IHotelData;
  onClickFn: () => void;
  wide?: boolean;
}

const CardTypeOne: FC<ICardTypeOneProps> = ({
  wide = false,
  itemData,
  onClickFn
}) => {
  const currImage = useImageCarousel(itemData.hotelImages, 3000);

  return (
    <div
      className={styles.card}
      onClick={() => onClickFn()}
      id={`card-${itemData.slug}`}
    >
      <div className={styles.imageContainer}>
        {itemData.hotelImages.length > 1 ? (
          <Image
            src={currImage.link}
            layout="fill"
            objectFit="cover"
            alt={`${itemData.name}-image`}
          />
        ) : null}
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardTopRow}>
          <p>{itemData?.name}</p>
          <p>
            {itemData?.ratingsAverage}  <MaterialIcon iconName="star" />
          </p>
        </div>
        <small>
          {itemData?.city}<br />{itemData?.state}, {itemData?.country}
        </small>
        {wide && (
          <Fragment>
            <p>&#8377; 1000 - 3000</p>
            <div className={styles.facilitiesContainer}>
              {/* <Bed />
              <Bathtub />
              <TimeToLeave />
              <Pets />
              <Wifi /> */}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default CardTypeOne;
