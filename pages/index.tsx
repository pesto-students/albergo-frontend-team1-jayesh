import type { GetStaticProps, NextPage } from 'next';
import { Fragment, useEffect, useState } from 'react';
import Banner from '../Components/Home/Banner/Banner';
import SectionPartnerTypeOne from '../Components/Home/Sections/SectionPartnerTypeOne';
import SectionTypeOne from '../Components/Home/Sections/SectionTypeOne';
import Layout from '../Components/Layout/Layout';
import Loading from '../Components/Loading/Loading';
import { getHomePageResults } from '../Utils/db';

interface IHomeProps {
  data?: {
    featuredHotels: {
      [key: string]: string;
    }[];
    topRatedHotels: {
      [key: string]: string;
    }[];
    latestHotels: {
      [key: string]: string;
    }[];
  };
}

const Home: NextPage<IHomeProps> = ({ data }) => {

  const [pageState, setPageState] = useState({
    data: data,
    loadingState: {
      state: true,
      message: "Please wait for a few moments",
      timeout: false
    }
  });

  useEffect(() => {
    if (!data || !pageState.loadingState.timeout) {
      Promise.resolve(getHomePageResults()).then(res => {
        if (!res) {
          setPageState(prevState => ({ ...prevState, loadingState: { ...prevState.loadingState, timeout: true, message: "Please try again later" } }));
          return;
        }
        setPageState(prevState => ({ data: res, loadingState: { ...prevState.loadingState, state: false } }));
      });
    }
  }, [data]);

  if (data || pageState.data) {
    return (
      <Fragment>
        <Banner />
        <Layout>
          {pageState.data?.latestHotels && (
            <SectionTypeOne
              title="Latest on the Hotel listing"
              viewMoreLink
              dataArr={pageState.data?.latestHotels}
            />
          )}
          {pageState.data?.topRatedHotels && (
            <SectionTypeOne
              title="Top Rated Properties"
              viewMoreLink
              dataArr={pageState.data?.topRatedHotels}
            />
          )
          }
          <SectionPartnerTypeOne title={'Partner with us'} />
          {pageState.data?.featuredHotels && (
            <SectionTypeOne
              title="Featured Properties on our Listing"
              flexWrap
              dataArr={pageState.data?.featuredHotels}
            />
          )}
        </Layout>
      </Fragment>
    );
  }

  return <Loading message={pageState.loadingState.message} />;
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {

  const res = await Promise.resolve(getHomePageResults());

  let revalidateObj = {
    revalidate: 7200
  };

  if (!res) revalidateObj = { ...revalidateObj, revalidate: 300 };

  return {
    props: {
      data: res
    },
    ...revalidateObj
  };

};
