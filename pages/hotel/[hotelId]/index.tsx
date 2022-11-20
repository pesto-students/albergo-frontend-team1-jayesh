import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import Layout from '../../../Components/Layout/Layout';
import styles from '../../../styles/Hotel/hotelHome.module.scss';
import { makeReq } from '../../../Utils/db';
import { MaterialIcon, ReadMore, Rupee } from '../../../Utils/Helper';

interface IModalProps {
  modalHeader: string;
  setModalState: Dispatch<
    SetStateAction<{
      modalHeader: string;
      show: boolean;
      modalContent: JSX.Element;
    }>
  >;
  children: JSX.Element;
}

const Modal = ({ modalHeader, setModalState, children }: IModalProps) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h5>{modalHeader}</h5>
          <button
            onClick={() =>
              setModalState((prevModalState) => ({
                ...prevModalState,
                show: false
              }))
            }
            className={styles.close}
          >
            <MaterialIcon iconName="close" />
          </button>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
};

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

const facilitiesArr = [
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

const HotelSlugHome = ({ hotelData }: { hotelData: any; }) => {
  const router = useRouter();
  const { hotelId } = router.query;

  const [modalState, setModalState] = useState<{
    modalHeader: string;
    show: boolean;
    modalContent: JSX.Element;
  }>({
    modalHeader: '',
    show: false,
    modalContent: <Fragment />
  });

  const [hotelImageState, setHotelImageState] = useState({
    list: hotelData.images,
    currentIndex: 0
  });

  useEffect(() => {
    const imagesInterval = setInterval(() => {
      setHotelImageState((prevState) => {
        return {
          ...prevState,
          currentIndex:
            prevState.currentIndex === prevState.list.length - 1
              ? 0
              : prevState.currentIndex + 1
        };
      });
    }, 3000);

    return () => {
      clearInterval(imagesInterval);
    };
  }, []);

  const ListModal = ({
    listArr,
    type
  }: {
    listArr:
    | {
      iconName: string;
      label: string;
    }[]
    | string[];
    type: 'facilities' | 'safetyChecks';
  }) => {
    return (
      <div className={styles.facilitiesModal}>
        {listArr.map((listItem, index) => (
          <div className={styles.facilitiesItem} key={index}>
            {type === 'facilities' && listItem instanceof Object ? (
              <Fragment>
                <MaterialIcon iconName={listItem.iconName} />
                <p>{listItem.label}</p>
              </Fragment>
            ) : (
              <Fragment>
                <MaterialIcon iconName="check" />
                <p>{listItem.toString()}</p>
              </Fragment>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Fragment>
      <Head>
        <title>Albergo - {hotelData.name}</title>
      </Head>
      <div className={styles.galleryContainer}>
        <div className={styles.gelleryHero}>
          <Image
            src={hotelImageState.list[hotelImageState.currentIndex]}
            layout="fill"
            objectFit="cover"
            alt="some"
          />
        </div>
        <div className={styles.imagesContainer}>
          {hotelImageState.list
            .slice(0, 4)
            .map((imageSrc: string, index: number) => (
              <div className={styles.image} key={index}>
                <Image
                  src={imageSrc}
                  layout="fill"
                  objectFit="cover"
                  alt="some"
                />
              </div>
            ))}
        </div>
      </div>
      <Layout>
        <div className={styles.mainContainer}>
          <div className={styles.content}>
            <div className={styles.titleSection}>
              <div className={styles.infoSection}>
                <h3>{hotelData.name}</h3>
                <p>
                  {hotelData.city}, {hotelData.state}, {hotelData.country}
                </p>
                <small>{hotelData.address}</small>
                <p>
                  {Array(hotelData.ratingsAverage)
                    .fill(0)
                    .map((_, index) => (
                      <MaterialIcon iconName="star" key={index} />
                    ))}
                </p>
              </div>
              <div className={styles.btnSection}>
                <button>
                  <MaterialIcon iconName="favorite" />
                </button>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator
                        .share({
                          title: `Albergo - ${hotelData.name}`,
                          text: 'Check out Albergo - Hotel',
                          url: window.location.href
                        })
                        .then(() => console.log('Successful share'))
                        .catch((error) => console.log('Error sharing', error));
                    }
                  }}
                >
                  <MaterialIcon iconName="share" />
                </button>
              </div>
            </div>
            <div className={styles.featureSection}>
              {arrObj.map((obj, index) => (
                <div className={styles.feature} key={index}>
                  <MaterialIcon iconName={obj.iconName} />
                  <small>{obj.label}</small>
                </div>
              ))}
            </div>
            <h5>Hotel Description</h5>
            <p>
              <ReadMore text={hotelData.description} maxLength={120} />
            </p>
            <div className={styles.facilitiesSection}>
              <h5>Offered Facilities</h5>
              <div className={styles.facilitiesContainer}>
                {facilitiesArr
                  .slice(0, Math.floor(facilitiesArr.length / 2))
                  .map((amenity, index) => (
                    <div className={styles.amenity} key={index}>
                      <MaterialIcon iconName={amenity.iconName} />
                      <p>{amenity.label}</p>
                    </div>
                  ))}
              </div>
              <button
                className="btn"
                onClick={() =>
                  setModalState((prevModalState) => ({
                    ...prevModalState,
                    show: true,
                    modalHeader: 'Offered Facilities',
                    modalContent: (
                      <ListModal listArr={facilitiesArr} type="facilities" />
                    )
                  }))
                }
              >
                Show all {facilitiesArr.length} Facilities
              </button>
            </div>
            <div className={styles.safetySection}>
              <h5>Safety and Hygiene</h5>
              <div className={styles.safetyContainer}>
                {safetyChecks
                  .slice(0, Math.floor(safetyChecks.length / 2))
                  .map((checks, index) => (
                    <div className={styles.safety} key={index}>
                      <MaterialIcon iconName="assignment_turned_in" />
                      <p>{checks}</p>
                    </div>
                  ))}
              </div>
              <button
                className="btn"
                onClick={() =>
                  setModalState((prevModalState) => ({
                    ...prevModalState,
                    show: true,
                    modalHeader: 'Safety Checks',
                    modalContent: (
                      <ListModal listArr={safetyChecks} type="safetyChecks" />
                    )
                  }))
                }
              >
                Show all {safetyChecks.length} Safety checks
              </button>
            </div>
            <div className={styles.reviewSection}>
              <h5>Reviews</h5>
              <div className={styles.reviewCardContainer}>
                {/* {Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <div className={styles.reviewCard} key={index}>
                      <div className={styles.cardHeader}>
                        <div className={styles.cardAvatar} />
                        <div className={styles.cardDetails}>
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
                  ))} */}
                <h5>No reviews yet</h5>
              </div>
            </div>
          </div>
          <div className={styles.cardSection}>
            <h5>
              <Rupee /> 1000 - <Rupee /> 2000
            </h5>
            <hr />
            <p>
              Regular room: <Rupee /> 1000
            </p>
            <p>
              Deluxe room: <Rupee /> 2000
            </p>
            <p>
              Premium room: <Rupee /> 2000
            </p>
            <button
              onClick={() => {
                router.push({
                  pathname: `/hotel/${hotelId}/book`
                });
              }}
              className="btn btn-success"
            >
              Book Now
            </button>
            <div className={styles.contactSection}>
              <a href={`mailto:${hotelData.email}`}>
                <MaterialIcon iconName="mail" />
                Property inquiry
              </a>
              <a href={`tel:${hotelData.phone}`}>
                <MaterialIcon iconName="call" />
                Contact host
              </a>
            </div>
          </div>
        </div>
      </Layout>
      {modalState.show && (
        <Modal
          modalHeader={modalState.modalHeader}
          setModalState={setModalState}
        >
          {modalState.modalContent}
        </Modal>
      )}
    </Fragment>
  );
};

export default HotelSlugHome;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const slug = ctx.params?.hotelId;

  return Promise.resolve(makeReq(`${process.env.NEXT_PUBLIC_API_URL}/hotel/${slug}`, "GET")).then(res => {
    if (!res) {
      return {
        notFound: true
      };
    }

    return {
      props: {
        hotelData: res.data
      }
    };
  }
  );
};
