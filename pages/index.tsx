import type { NextPage } from 'next';
import { Fragment } from 'react';
import Banner from '../Components/Home/Banner/Banner';
import BlogSection from '../Components/Home/Sections/BlogSection';
import SectionPartnerTypeOne from '../Components/Home/Sections/SectionPartnerTypeOne';
import SectionPartnerTypeTwo from '../Components/Home/Sections/SectionPartnerTypeTwo';
import SectionTypeOne from '../Components/Home/Sections/SectionTypeOne';
import Layout from '../Components/Layout/Layout';

const Home: NextPage = () => {
  return (
    <Fragment>
      <Banner />
      <Layout>
        <SectionTypeOne title="Latest on the Hotel listing" viewMoreLink />
        <SectionTypeOne title="Nearby Listed Properties" showOnMapLink />
        <SectionTypeOne title="Top Rated Properties" viewMoreLink />
        <SectionPartnerTypeOne title={'Partner with us'} />
        <SectionTypeOne
          title="Featured Properties on our Listing"
          numberOfCards={6}
          flexWrap
        />
        <SectionPartnerTypeOne title={'Partner with us'} />
        <BlogSection title="Property Rental Guides &amp; Tips" />
        <SectionPartnerTypeTwo />
      </Layout>
    </Fragment>
  );
};

export default Home;
