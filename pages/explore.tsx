import { NextPage } from 'next';
import CardTypeOne from '../Components/Card/CardTypeOne';
import Layout from '../Components/Layout/Layout';
import exploreStyles from '../styles/Explore/explore.module.scss';
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
      <div className={exploreStyles.filterSection}>
        <div className={exploreStyles.tabSection}>
          {tabs.map((tab, index) => (
            <h5
              key={index}
              className={index === 0 ? exploreStyles.active : undefined}
            >
              {tab}
            </h5>
          ))}
        </div>
        <button>
          {MaterialIcon('tune')}
        </button>
        <button>
          {MaterialIcon('sort')}
        </button>
      </div>
      <div className={exploreStyles.filtersContainer}></div>
      <div className={exploreStyles.cardContainer}>
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
