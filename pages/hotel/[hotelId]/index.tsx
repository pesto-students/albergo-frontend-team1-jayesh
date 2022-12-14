import { JSONContent } from '@tiptap/react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import TiptapEditor from '../../../Components/Editorjs/Editor';
import Layout from '../../../Components/Layout/Layout';
import styles from '../../../styles/Hotel/hotelHome.module.scss';
import { makeReq } from '../../../Utils/db';
import { IFullHotelData, MaterialIcon, Rupee, useImageCarousel } from '../../../Utils/Helper';

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

const safetyChecks = [
  'daily cleaning',
  'fire extinguishers',
  'disinfections and sterilizations',
  'smoke detectors'
];

interface IHotelSLugHome {
  data: IFullHotelData;
}

interface IRoom {
  name: string;
  roomId: string;
  hotelSlug: string;
  price: number;
  capacity: number;
  images: {
    link: string;
    ref: string;
  }[];
  description: JSONContent;
}

const getRoomDataOverview = (rooms: IRoom[]) => {
  const roomDataOverview = rooms.map((room) => {
    return {
      name: room.name,
      price: room.price,
    };
  });

  // get lowest and highest price
  const lowestPrice = Math.min(...roomDataOverview.map((room) => room.price));
  const highestPrice = Math.max(...roomDataOverview.map((room) => room.price));

  const roomDataOverviewWithPriceRange = {
    roomOverviewArr: roomDataOverview,
    lowestPrice,
    highestPrice: lowestPrice === highestPrice ? undefined : highestPrice
  };

  return roomDataOverviewWithPriceRange;
};

const HotelSlugHome: NextPage<IHotelSLugHome> = ({ data }) => {

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

  const currImage = useImageCarousel(data.hotelImages, 3000);

  const ListModal = ({
    listArr,
    type
  }: {
    listArr:
    | {
      icon: string;
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
                <MaterialIcon iconName={listItem.icon} />
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

  const roomDataOverview = getRoomDataOverview(data.rooms);

  return (
    <Fragment>
      <Head>
        <title>Albergo - {data.name}</title>
      </Head>
      <div className={styles.galleryContainer}>
        <div className={styles.gelleryHero}>
          {data.hotelImages.length > 0 ? (
            <Image
              src={currImage.link}
              layout="fill"
              objectFit="cover"
              alt={`${data.name}-image`}
            />
          ) : (
            <div className={styles.noImage}>
              <p>No Image</p>
            </div>
          )}
        </div>
        <div className={styles.imagesContainer}>
          {data.hotelImages.slice(0, 4)
            .map((imageSrc, index) => (
              <div className={styles.image} key={index}>
                <Image
                  src={imageSrc.link}
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
                <h3>{data.name}</h3>
                <p>
                  {data.city}, {data.state}, {data.country}
                </p>
                <small>{data.address}</small>
                <p>
                  {Array(data.ratingsAverage === 0 ? 1 : data.ratingsAverage)
                    .fill(0)
                    .map((_, index) => (
                      <MaterialIcon iconName="star" key={index} />
                    ))}
                  {" "}ratings
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
                          title: `Albergo - ${data.name}`,
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
              {data.facilities.slice(0, 4).map((obj, index) => (
                <div className={styles.feature} key={index}>
                  <MaterialIcon iconName={obj.icon} />
                  <small>{obj.label}</small>
                </div>
              ))}
            </div>
            <h5>Hotel Description</h5>
            <TiptapEditor editable={false} initialData={data.description} />
            <div className={styles.facilitiesSection}>
              <h5>Offered Facilities</h5>
              <div className={styles.facilitiesContainer}>
                {data.facilities
                  .slice(0, Math.floor(data.facilities.length / 2))
                  .map((facility, index) => (
                    <div className={styles.amenity} key={index}>
                      <MaterialIcon iconName={facility.icon} />
                      <p>{facility.label}</p>
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
                      <ListModal listArr={data.facilities} type="facilities" />
                    )
                  }))
                }
              >
                Show all {data.facilities.length} Facilities
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
              <Rupee /> {roomDataOverview.lowestPrice} {roomDataOverview.highestPrice !== undefined ?
                (
                  <Fragment>
                    - <Rupee /> {roomDataOverview.highestPrice}
                  </Fragment>
                ) : null}
            </h5>
            <hr />
            {roomDataOverview.roomOverviewArr.map((room, index) => (
              <p key={index}>
                {room.name} room: <Rupee /> {room.price}
              </p>
            ))}
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
              <a href={`mailto:${data.email}`}>
                <MaterialIcon iconName="mail" />
                Property inquiry
              </a>
              <a href={`tel:${data.phone}`}>
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

  if (!slug) {
    return {
      notFound: true
    };
  }

  const resObj = await makeReq(`${process.env.NEXT_PUBLIC_API_URL}/api/hotel/${slug}`, "GET");

  if (!resObj || !resObj.response || !resObj.response!.ok) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      data: resObj.res.data
    }
  };
};
