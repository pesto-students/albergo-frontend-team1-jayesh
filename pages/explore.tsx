import { NextPage } from 'next';
import CardTypeOne from '../Components/Card/CardTypeOne';
import Layout from '../Components/Layout/Layout';
import styles from '../styles/Explore/explore.module.scss';
import { MaterialIcon } from '../Utils/Helper';

const Explore: NextPage = () => {
  const tabs = [
    'dormitory',
    'houses',
    'villas',
    'homestays',
    'hostels',
    'more'
  ];

  return (
    <Layout>
      <div className={styles.filterSection}>
        <div className={styles.tabSection}>
          {tabs.map((tab, index) => (
            <h5 key={index} className={index === 0 ? styles.active : undefined}>
              {tab}
            </h5>
          ))}
        </div>
        <button>
          <MaterialIcon iconName="tune" />
        </button>
        <button>
          <MaterialIcon iconName="sort" />
        </button>
      </div>
      <div className={styles.filtersContainer}></div>
      <div className={styles.cardContainer}>
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <CardTypeOne key={index} />
          ))}
      </div>
    </Layout>
  );
};

export default Explore;
