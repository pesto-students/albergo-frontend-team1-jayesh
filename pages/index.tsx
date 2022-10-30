import type { GetStaticProps, NextPage } from 'next';
import { Fragment } from 'react';
import Banner from '../Components/Home/Banner/Banner';
import BlogSection from '../Components/Home/Sections/BlogSection';
import SectionPartnerTypeOne from '../Components/Home/Sections/SectionPartnerTypeOne';
import SectionPartnerTypeTwo from '../Components/Home/Sections/SectionPartnerTypeTwo';
import SectionTypeOne from '../Components/Home/Sections/SectionTypeOne';
import Layout from '../Components/Layout/Layout';
import Loading from '../Components/Loading/Loading';

interface IHomeProps {
  data?: {
    featuredHotels: unknown[];
    topRatedHotels: unknown[];
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
            dataArr={data.featuredHotels}
          />
          {/* <SectionTypeOne title="Nearby Listed Properties" showOnMapLink dataArr={data.topRatedHotels} /> */}
          <SectionTypeOne
            title="Top Rated Properties"
            viewMoreLink
            dataArr={data.topRatedHotels}
          />
          <SectionPartnerTypeOne title={'Partner with us'} />
          <SectionTypeOne
            title="Featured Properties on our Listing"
            flexWrap
            dataArr={data.featuredHotels}
          />
          <SectionPartnerTypeOne title={'Partner with us'} />
          {/* <BlogSection title="Property Rental Guides &amp; Tips" /> */}
          <SectionPartnerTypeTwo />
        </Layout>
      </Fragment>
    );
  }

  return <Loading />;
};

export default Home;

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
