import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import TiptapEditor from '../../../Components/Editorjs/Editor';
import Layout from '../../../Components/Layout/Layout';
import styles from '../../../styles/Hotel/book.module.scss';
import { makeReq } from '../../../Utils/db';
import { IHotelData, IRoomData, MaterialIcon, Rupee, useImageCarousel } from '../../../Utils/Helper';

const RoomItem: FC<{ room: IRoomData; }> = ({ room }) => {
	const router = useRouter();
	const { hotelId } = router.query;

	const currRoomImage = useImageCarousel(room.images, 3000);

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
					<Image
						src={currRoomImage.link}
						layout="fill"
						objectFit="cover"
						alt="roomImage"
					/>
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

	if (!resObj || !resObj.response || !resObj.response.ok) {
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