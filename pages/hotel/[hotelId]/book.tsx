import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import TiptapEditor from '../../../Components/Editorjs/Editor';
import Layout from '../../../Components/Layout/Layout';
import styles from '../../../styles/Hotel/book.module.scss';
import { makeReq } from '../../../Utils/db';
import { IHotelData, IRoomData, MaterialIcon, Rupee } from '../../../Utils/Helper';

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

const RoomItem: FC<{ room: IRoomData; }> = ({ room }) => {
	const router = useRouter();
	const { hotelId } = router.query;

	const [roomImageState, setRoomImageState] = useState({
		list: room.images,
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

	const prevImage = () => {
		setRoomImageState((prevRoomImageState) => ({
			...prevRoomImageState,
			activeIndex:
				prevRoomImageState.activeIndex === 0
					? 0
					: prevRoomImageState.activeIndex - 1
		}));
	};

	const nextImage = () => {
		setRoomImageState((prevRoomImageState) => ({
			...prevRoomImageState,
			activeIndex:
				prevRoomImageState.activeIndex + 1 ===
					prevRoomImageState.list.length
					? 0
					: prevRoomImageState.activeIndex + 1
		}));
	};

	const selectRoom = (roomId: string) => {
		router.push(
			{
				pathname: `/hotel/${hotelId}/bookDetails`,
				query: {
					roomId,
				}
			},
			`/hotel/${hotelId}/bookDetails`
		);
	};

	return (
		<div className={styles.tableRow}>
			<div className={styles.tableRowItem}>
				<h5>{room.name}</h5>
				<div className={styles.imageContainer}>
					<button
						className={`${styles.controls} ${styles.controlLeft}`}
						onClick={prevImage}
					>
						<MaterialIcon iconName="chevron_left" />
					</button>
					<Image
						src={roomImageState.list[roomImageState.activeIndex].link}
						layout="fill"
						objectFit="cover"
						alt="roomImage"
					/>
					<button
						className={`${styles.controls} ${styles.controlRight}`}
						onClick={nextImage}
					>
						<MaterialIcon iconName="chevron_right" />
					</button>
				</div>
			</div>
			<div className={styles.tableRowItem}>
				<TiptapEditor editable={false} initialData={room.description} />
				<p>capacity : {room.capacity}</p>
				<small>Available room Quantity : {room.quantity}</small>
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
					onClick={() => selectRoom(room.roomId)}
				>
					Select
				</button>
			</div>
		</div>
	);
};

interface IHotelSLugHomeProps {
	data: {
		hotelData: IHotelData,
		rooms: IRoomData[];
	};
}

const HotelSlugBook: NextPage<IHotelSLugHomeProps> = ({ data }) => {

	const router = useRouter();
	const { hotelId } = router.query;

	return (
		<Layout>
			<Link href={`/hotel/${hotelId}`}>
				<a className={styles.hotelLink}>
					<h3>{data.hotelData.name}</h3>
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
					{data.rooms.map((room, index) => (
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

	const resObj = await makeReq(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms/hotel/${slug}`, "GET");

	if (!resObj || !resObj.response!.ok) {
		return {
			notFound: true
		};
	}

	return {
		props: {
			data: resObj.res?.data,
		},
	};
};