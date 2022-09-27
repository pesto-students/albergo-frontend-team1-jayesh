import { Fragment } from 'react';
import Layout from '../../Components/Layout/Layout';
import hotelHomeStyles from '../../styles/Hotel/home.module.scss';

const HotelSlugHome = () => {
  const rupee = <span>&#8377;</span>;

  const arrObj = [
    {
      label: 'bedroom',
      iconName: 'bed'
    },
    {
      label: 'bathrooms',
      iconName: 'bathtub'
    },
    {
      label: 'parking',
      iconName: 'directions_car'
    },
    {
      label: 'pets allowed',
      iconName: 'pets'
    }
  ];

  return (
    <Fragment>
      <div className={hotelHomeStyles.galleryContainer}>
        <div className={hotelHomeStyles.gelleryHero}></div>
        <div className={hotelHomeStyles.imagesContainer}></div>
      </div>
      <Layout>
        <div className={hotelHomeStyles.mainContainer}>
          <div className={hotelHomeStyles.content}>
            <div className={hotelHomeStyles.titleSection}>
              <div className={hotelHomeStyles.infoSection}>
                <h3>Sunny Hillside</h3>
                <p>100 Smart Street, LA, USA</p>
              </div>
              <div className={hotelHomeStyles.btnSection}>
                <button>
                  <span className="material-symbols-outlined">favorite</span>
                </button>
                <button>
                  <span className="material-symbols-outlined">share</span>
                </button>
              </div>
            </div>
            <div className={hotelHomeStyles.featureSection}>
              {arrObj.map((obj, index) => (
                <div className={hotelHomeStyles.feature} key={index}>
                  <span className="material-symbols-outlined">
                    {obj.iconName}
                  </span>
                  <small>{obj.label}</small>
                </div>
              ))}
            </div>
            <h5>Hotel Description</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
              quos dolor sed, porro expedita earum possimus, voluptates rem,
              tempore iusto obcaecati. Maiores eaque, incidunt dolore fugiat
              aspernatur explicabo laborum eos?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
              quos dolor sed, porro expedita earum possimus, voluptates rem,
              tempore iusto obcaecati. Maiores eaque, incidunt dolore fugiat
              aspernatur explicabo laborum eos?
            </p>
            <div className={hotelHomeStyles.amenitiesSection}></div>
            <div className={hotelHomeStyles.safetySection}></div>
            <div className={hotelHomeStyles.locationSection}></div>
            <div className={hotelHomeStyles.nearbySection}></div>
            <div className={hotelHomeStyles.reviewSection}></div>
          </div>
          <div className={hotelHomeStyles.cardSection}>
            <h5>
              {rupee} 1000 - {rupee} 2000
            </h5>
            <hr />
            <p>Regular room: {rupee} 1000</p>
            <p>Deluxe room: {rupee} 2000</p>
            <p>Premium room: {rupee} 2000</p>
            <button>Reserve Now</button>
            <div className={hotelHomeStyles.contactSection}>
              <small>
                <span className="material-symbols-outlined">apartment</span>
                Property inquiry
              </small>
              <small>
                <span className="material-symbols-outlined">call</span>
                contact host
              </small>
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default HotelSlugHome;
