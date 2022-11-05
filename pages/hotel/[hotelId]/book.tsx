import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../../Components/Layout/Layout';
import styles from '../../../styles/Hotel/book.module.scss';
import { MaterialIcon, Rupee } from '../../../Utils/Helper';

const roomArr = [
  {
    id: 1,
    name: 'Standard Room',
    price: 2000,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl.',
    photos: [
      'https://images.unsplash.com/photo-1609949279531-cf48d64bed89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      'https://images.unsplash.com/photo-1608198399988-341f712c3711?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1601565415267-724db0e9fbdf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1460&q=80'
    ],
    capacity: 2
  },
  {
    id: 2,
    name: 'Deluxe Room',
    price: 2500,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl.',
    photos: [
      'https://images.unsplash.com/photo-1609949279531-cf48d64bed89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      'https://images.unsplash.com/photo-1608198399988-341f712c3711?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1601565415267-724db0e9fbdf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1460&q=80'
    ],
    capacity: 4
  },
  {
    id: 3,
    name: 'Suite Room',
    price: 3000,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl.',
    photos: [
      'https://images.unsplash.com/photo-1609949279531-cf48d64bed89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      'https://images.unsplash.com/photo-1608198399988-341f712c3711?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1601565415267-724db0e9fbdf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1460&q=80'
    ],
    capacity: 6
  }
];

const RoomItem = ({
  room
}: {
  room: {
    id: number;
    name: string;
    price: number;
    description: string;
    photos: string[];
    capacity: number;
  };
}) => {
  const router = useRouter();
  const { hotelId } = router.query;

  const [roomImageState, setRoomImageState] = useState({
    list: room.photos,
    activeIndex: 0
  });

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setRoomImageState((prevRoomImageState) => {
        const nextIndex =
          prevRoomImageState.activeIndex + 1 === prevRoomImageState.list.length
            ? 0
            : prevRoomImageState.activeIndex + 1;
        return {
          ...prevRoomImageState,
          activeIndex: nextIndex
        };
      });
    }, 3500);

    return () => {
      clearInterval(imageInterval);
    };
  }, []);

  return (
    <div className={styles.tableRow}>
      <div className={styles.tableRowItem}>
        <h5>{room.name}</h5>
        <div className={styles.imageContainer}>
          <button
            className={`${styles.controls} ${styles.controlLeft}`}
            onClick={() =>
              setRoomImageState((prevRoomImageState) => ({
                ...prevRoomImageState,
                activeIndex:
                  prevRoomImageState.activeIndex === 0
                    ? 0
                    : prevRoomImageState.activeIndex - 1
              }))
            }
          >
            <MaterialIcon iconName="chevron_left" />
          </button>
          <Image
            src={roomImageState.list[roomImageState.activeIndex]}
            layout="fill"
            objectFit="cover"
            alt="roomImage"
          />
          <button
            className={`${styles.controls} ${styles.controlRight}`}
            onClick={() =>
              setRoomImageState((prevRoomImageState) => ({
                ...prevRoomImageState,
                activeIndex:
                  prevRoomImageState.activeIndex + 1 ===
                    prevRoomImageState.list.length
                    ? 0
                    : prevRoomImageState.activeIndex + 1
              }))
            }
          >
            <MaterialIcon iconName="chevron_right" />
          </button>
        </div>
      </div>
      <div className={styles.tableRowItem}>
        <p>{room.description}</p>
        <p>capacity : {room.capacity}</p>
      </div>
      <div className={styles.tableRowItem}>
        <h5>
          <Rupee /> {room.price}.00
        </h5>
        <small>inclusive of all taxes</small>
      </div>
      <div className={styles.tableRowItem}>
        <button
          className="btn"
          onClick={() => {
            router.push(
              {
                pathname: `/hotel/${hotelId}/bookDetails`,
                query: {
                  roomId: room.id
                }
              },
              `/hotel/${hotelId}/bookDetails`
            );
          }}
        >
          Select
        </button>
      </div>
    </div>
  );
};

const HotelSlugBook = ({ hotelData }: { hotelData: any }) => {
  const router = useRouter();
  const { hotelId } = router.query;

  return (
    <Layout>
      <Link href={`/hotel/${hotelId}`}>
        <a className={styles.hotelLink}>
          <h3>{hotelData.name}</h3>
        </a>
      </Link>
      <div className={styles.container}>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div className={styles.tableHeaderItem}>
              <p>Room</p>
            </div>
            <div className={styles.tableHeaderItem}>
              <p>Description</p>
            </div>
            <div className={styles.tableHeaderItem}>
              <p>Price / Night</p>
            </div>
            <div className={styles.tableHeaderItem}>
              <p>Book</p>
            </div>
          </div>
          {roomArr.map((room, index) => (
            <RoomItem key={index} room={room} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HotelSlugBook;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const slug = ctx.params?.hotelId;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/hotel/${slug}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      return {
        notFound: true
      };
    }

    const res = await response.json();

    return {
      props: {
        hotelData: res.data
      }
    };
  } catch (error) {
    console.log(error);

    return {
      notFound: true
    };
  }
};
