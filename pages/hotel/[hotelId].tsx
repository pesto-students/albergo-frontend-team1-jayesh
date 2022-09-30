import Image from 'next/image';
import { Fragment } from 'react';
import Layout from '../../Components/Layout/Layout';
import hotelHomeStyles from '../../styles/Hotel/hotelHome.module.scss';
import { MaterialIcon } from '../../Utils/Helper';

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

  const amenitiesArr = [
    {
      label: 'kitchen',
      iconName: 'cooking'
    },
    {
      label: 'television',
      iconName: 'tv'
    },
    {
      label: 'Air conditioning',
      iconName: 'ac_unit'
    },
    {
      label: 'wifi',
      iconName: 'wifi'
    },
    {
      label: 'laundry',
      iconName: 'local_laundry_service'
    },
    {
      label: 'balcony',
      iconName: 'balcony'
    }
  ];

  const safetyChecks = [
    'daily cleaning',
    'fire extinguishers',
    'disinfections and sterilizations',
    'smoke detectors'
  ];

  const reviewObjArr = [
    {
      name: 'amenities',
      rating: 4.5
    },
    {
      name: 'communication',
      rating: 4.7
    },
    {
      name: 'hygiene',
      rating: 5
    },
    {
      name: 'location',
      rating: 4.9
    },
    {
      name: 'value for money',
      rating: 4
    }
  ];

  return (
    <Fragment>
      <div className={hotelHomeStyles.galleryContainer}>
        <div className={hotelHomeStyles.gelleryHero}>
          <Image
            src={
              'https://images.unsplash.com/photo-1664073412845-f44940c3c2c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
            }
            layout="fill"
            objectFit="cover"
            alt="some"
          />
        </div>
        <div className={hotelHomeStyles.imagesContainer}>
          <div className={hotelHomeStyles.image}>
            <Image
              src={
                'https://images.unsplash.com/photo-1664073412845-f44940c3c2c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
              }
              layout="fill"
              objectFit="cover"
              alt="some"
            />
          </div>
          <div className={hotelHomeStyles.image}>
            <Image
              src={
                'https://images.unsplash.com/photo-1664073412845-f44940c3c2c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
              }
              layout="fill"
              objectFit="cover"
              alt="some"
            />
          </div>
          <div className={hotelHomeStyles.image}>
            <Image
              src={
                'https://images.unsplash.com/photo-1664073412845-f44940c3c2c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
              }
              layout="fill"
              objectFit="cover"
              alt="some"
            />
          </div>
          <div className={hotelHomeStyles.image}>
            <Image
              src={
                'https://images.unsplash.com/photo-1664073412845-f44940c3c2c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
              }
              layout="fill"
              objectFit="cover"
              alt="some"
            />
          </div>
        </div>
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
                <button>{MaterialIcon('favorite')}</button>
                <button>{MaterialIcon('share')}</button>
              </div>
            </div>
            <div className={hotelHomeStyles.featureSection}>
              {arrObj.map((obj, index) => (
                <div className={hotelHomeStyles.feature} key={index}>
                  {MaterialIcon(obj.iconName)}
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
            <div className={hotelHomeStyles.amenitiesSection}>
              <h5>Offered Amenities</h5>
              <div className={hotelHomeStyles.amenitiesContainer}>
                {amenitiesArr.map((amenity, index) => (
                  <div className={hotelHomeStyles.amenity} key={index}>
                    {MaterialIcon(amenity.iconName)}
                    <p>{amenity.label}</p>
                  </div>
                ))}
              </div>
              <button>Show all 10 Amenities</button>
            </div>
            <div className={hotelHomeStyles.safetySection}>
              <h5>Safety and Hygiene</h5>
              <div className={hotelHomeStyles.safetyContainer}>
                {safetyChecks.map((checks, index) => (
                  <div className={hotelHomeStyles.safety} key={index}>
                    {MaterialIcon('assignment_turned_in')}
                    <p>{checks}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={hotelHomeStyles.locationSection}></div>
            {/* <div className={hotelHomeStyles.nearbySection}></div> */}
            <div className={hotelHomeStyles.reviewSection}>
              <h5>Reviews {MaterialIcon('star')} 5.0</h5>
              <div className={hotelHomeStyles.reviewTypeContainer}>
                {reviewObjArr.map((reviewObj, index) => (
                  <div className={hotelHomeStyles.reviewType} key={index}>
                    <p>{reviewObj.name}</p>
                    <p>-</p>
                    <p>{reviewObj.rating}</p>
                  </div>
                ))}
              </div>
              <div className={hotelHomeStyles.reviewCardContainer}>
                {Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <div className={hotelHomeStyles.reviewCard} key={index}>
                      <div className={hotelHomeStyles.cardHeader}>
                        <div className={hotelHomeStyles.cardAvatar} />
                        <div className={hotelHomeStyles.cardDetails}>
                          <h5>John Doe</h5>
                          <small>Mar 12 2022</small>
                        </div>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Quae officia accusantium impedit magnam at facere
                        ipsa voluptatibus.
                      </p>
                    </div>
                  ))}
              </div>
              <button>Show all 100 reviews</button>
            </div>
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
                {MaterialIcon('apartment')}
                Property inquiry
              </small>
              <small>
                {MaterialIcon('call')}
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
