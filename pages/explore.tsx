import { GetStaticProps, NextPage } from 'next';
import CardTypeOne from '../Components/Card/CardTypeOne';
import Layout from '../Components/Layout/Layout';
import Loading from '../Components/Loading/Loading';
import styles from '../styles/Explore/explore.module.scss';
import { MaterialIcon } from '../Utils/Helper';

interface IExploreProps {
  data?: {
    featuredHotels: unknown[];
    topRatedHotels: unknown[];
  };
}

const Explore: NextPage = ({ data }: IExploreProps) => {
  if (data) {
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
              <h5
                key={index}
                className={index === 0 ? styles.active : undefined}
              >
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
          {data?.featuredHotels.map((itemData, index) => (
            <CardTypeOne key={index} itemData={itemData} />
          ))}
        </div>
      </Layout>
    );
  }

  return <Loading />;
};

export default Explore;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });

    const data = await res.json();

    return {
      props: {
        props: {
          data
        },
        revalidate: 30
      }
    };
  } catch (error) {
    return {
      props: {}
    };
  }
};
