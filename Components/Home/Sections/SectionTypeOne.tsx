import Link from 'next/link';
import React from 'react';
import styles from '../../../styles/Homescreen/SectionTypeOne.module.scss';
import CardTypeOne from '../../Card/CardTypeOne';

const SectionTypeOne = ({
  title,
  viewMoreLink = false,
  showOnMapLink = false,
  flexWrap = false,
  dataArr
}: {
  title: string;
  viewMoreLink?: boolean;
  showOnMapLink?: boolean;
  flexWrap?: boolean;
  dataArr: unknown[];
}) => {

  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <div className={styles.subTop}>
        <hr className={styles.divider} />
        {viewMoreLink && (
          <Link href="/explore">
            <a className={styles.moreLink}>View more</a>
          </Link>
        )}
        {showOnMapLink && (
          <Link href="/search" >
            <a className={styles.moreLink}>Show on map</a>
          </Link>
        )}
      </div>
      <div className={styles.cardContainer}>
        {dataArr.slice(0, 6).map((itemData, index) => (
          <CardTypeOne key={index} wide={flexWrap} itemData={itemData} />
        ))}
      </div>
    </div>
  );
};

export default SectionTypeOne;
