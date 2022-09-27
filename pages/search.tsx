import { NextPage } from 'next';
import CardTypeOne from '../Components/Card/CardTypeOne';
import Layout from '../Components/Layout/Layout';
import searchStyles from '../styles/Search/search.module.scss';

const ExploreHome: NextPage = () => {
  return (
    <Layout>
      <div className={searchStyles.filterSection}></div>
      <div className={searchStyles.container}>
        <div className={searchStyles.contentSection}>
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <CardTypeOne key={index} />
            ))}
        </div>
        <div className={searchStyles.mapSection}></div>
      </div>
    </Layout>
  );
};

export default ExploreHome;
