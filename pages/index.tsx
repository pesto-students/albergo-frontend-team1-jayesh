import type { GetStaticProps, NextPage } from 'next';
import { Fragment, useEffect, useState } from 'react';
import Banner from '../Components/Home/Banner/Banner';
import SectionPartnerTypeOne from '../Components/Home/Sections/SectionPartnerTypeOne';
import SectionTypeOne from '../Components/Home/Sections/SectionTypeOne';
import Layout from '../Components/Layout/Layout';
import Loading from '../Components/Loading/Loading';
import { getHomePageResults } from '../Utils/db';
import { IHotelDataOverview } from '../Utils/Helper';
interface IHomeProps {
  data: IHotelDataOverview[] | null;
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
    if (!data || pageState.loadingState.timeout) {

      Promise.resolve(getHomePageResults()).then(res => {
        if (!res) {
          setPageState(prevState => ({ ...prevState, loadingState: { ...prevState.loadingState, timeout: true, message: "Please try again later" } }));
          return;
        }

        if (res.error) {
          setPageState(prevState => ({ ...prevState, loadingState: { ...prevState.loadingState, timeout: true, message: res.error ?? "Please try again later" } }));
        }

        setPageState(prevState => ({ data: res?.data, loadingState: { ...prevState.loadingState, state: false } }));
      });
    }
  }, [data]);


  if (data || pageState.data) {
    return (
      <Fragment>
        <Banner />
        <Layout>
          {pageState.data && pageState.data.map((category, index) => (
            <SectionTypeOne
              key={index}
              title={category.category}
              viewMoreLink
              dataArr={category.data}
            />
          ))}
          <SectionPartnerTypeOne title={'Partner with us'} />
        </Layout>
      </Fragment>
    );
  }

  return <Loading message={pageState.loadingState.message} />;
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {

  const res = await getHomePageResults();

  let revalidateObj = {
    revalidate: 7200
  };

  if (!res) revalidateObj = { ...revalidateObj, revalidate: 300 };

  return {
    props: {
      data: res?.data ?? null
    },
    ...revalidateObj
  };

};
