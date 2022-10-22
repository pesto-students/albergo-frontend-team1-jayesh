import Link from 'next/link';
import React from 'react';
import styles from '../../../styles/Homescreen/SectionTypeOne.module.scss';
import CardTypeOne from '../../Card/CardTypeOne';

const SectionTypeOne = ({
  title,
  viewMoreLink = false,
  showOnMapLink = false,
  flexWrap = false,
  numberOfCards = 4
}: {
  title: string;
  viewMoreLink?: boolean;
  showOnMapLink?: boolean;
  flexWrap?: boolean;
  numberOfCards?: number;
}) => {
  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <div className={styles.subTop}>
        <hr className={styles.divider} />
        {viewMoreLink && (
          <Link href="">
            <a className={styles.moreLink}>View more</a>
          </Link>
        )}
        {showOnMapLink && (
          <Link href="">
            <a className={styles.moreLink}>Show on map</a>
          </Link>
        )}
      </div>
      <div className={styles.cardContainer}>
        {Array(numberOfCards)
          .fill(0)
          .map((_, index) => (
            <CardTypeOne key={index} wide={flexWrap} />
          ))}
      </div>
    </div>
  );
};

export default SectionTypeOne;
