import type { GetStaticProps, NextPage } from 'next';
import { Fragment } from 'react';
import Banner from '../Components/Home/Banner/Banner';
import SectionPartnerTypeOne from '../Components/Home/Sections/SectionPartnerTypeOne';
import SectionTypeOne from '../Components/Home/Sections/SectionTypeOne';
import Layout from '../Components/Layout/Layout';
import Loading from '../Components/Loading/Loading';

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
  if (data) {
    return (
      <Fragment>
        <Banner />
        <Layout>
          <SectionTypeOne
            title="Latest on the Hotel listing"
            viewMoreLink
            dataArr={data?.latestHotels}
          />
          <SectionTypeOne
            title="Top Rated Properties"
            viewMoreLink
            dataArr={data?.topRatedHotels}
          />
          <SectionPartnerTypeOne title={'Partner with us'} />
          <SectionTypeOne
            title="Featured Properties on our Listing"
            flexWrap
            dataArr={data?.featuredHotels}
          />
        </Layout>
      </Fragment>
    );
  }

  return <Loading />;
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });

    const data = await response.json();

    return {
      props: {
        data
      },
      revalidate: 90
    };
  } catch (error) {
    return {
      props: {},
      revalidate: 90
    };
  }
};
