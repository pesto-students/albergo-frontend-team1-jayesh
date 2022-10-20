import { NextPage } from 'next';
import CardTypeOne from '../Components/Card/CardTypeOne';
import Layout from '../Components/Layout/Layout';
import styles from '../styles/Search/search.module.scss';

const ExploreHome: NextPage = () => {
  return (
    <Layout>
      <div className={styles.filterSection}></div>
      <div className={styles.container}>
        <div className={styles.contentSection}>
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <CardTypeOne key={index} />
            ))}
        </div>
        <div className={styles.mapSection}></div>
      </div>
    </Layout>
  );
};

export default ExploreHome;
