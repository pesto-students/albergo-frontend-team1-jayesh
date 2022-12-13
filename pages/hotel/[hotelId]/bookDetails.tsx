import dayjs from "dayjs";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Script from "next/script";
import { useSnackbar } from "notistack";
import React, { Fragment, useEffect, useState } from "react";
import { MUIDatePicker } from "../../../Components/DateRangePicker/DateRangePicker";
import Layout from "../../../Components/Layout/Layout";
import Toast, { IToast } from "../../../Components/Toast/Toast";
import { useAppSelector } from "../../../redux/hooks";
import styles from "../../../styles/Hotel/bookDetails.module.scss";
import { getTokenCookie, IParsedToken, parseJWT } from "../../../Utils/auth/authHelper";
import { handleResponse, makeReq } from "../../../Utils/db";
import { IFullHotelData, IRoomData, MaterialIcon, Rupee } from "../../../Utils/Helper";

interface IBookDetailsProps {
	hotel: IFullHotelData;
	room: IRoomData;
}

const BookDetails: NextPage<IBookDetailsProps> = ({ hotel, room }) => {

	const userToken = useAppSelector((state) => state.user.userEncryptedToken);

	const parsedToken = parseJWT(userToken) as IParsedToken;

	const [detailsState, setDetailsState] = useState({
		hotel: {
			name: hotel.name,
			email: hotel.email,
			phone: hotel.phone,
			slug: hotel.slug,
		},
		room: {
			type: room.name,
			price: room.price,
			images: {
				list: room.images,
				activeIndex: 0,
			},
			capacity: 3,
		},
		customerDetails: {
			name: parsedToken.name,
			email: parsedToken.email,
			phone: parsedToken.phone,
			checkInDate: dayjs(),
			checkOutDate: dayjs(),
			guest: {
				adults: 2,
				children: 0,
			},
			roomQuantity: 1,
		},
	});

	const { enqueueSnackbar } = useSnackbar();

	const router = useRouter();

	// total days using dayjs
	const totalDays =
		detailsState.customerDetails.checkOutDate.diff(
			detailsState.customerDetails.checkInDate,
			"day"
		) === 0
			? 1
			: detailsState.customerDetails.checkOutDate.diff(
				detailsState.customerDetails.checkInDate,
				"day"
			);

	useEffect(() => {
		const imageInterval = setInterval(() => {
			setDetailsState((prevState) => {
				const nextIndex =
					prevState.room.images.activeIndex + 1 ===
						prevState.room.images.list.length
						? 0
						: prevState.room.images.activeIndex + 1;
				return {
					...prevState,
					room: {
						...prevState.room,
						images: {
							...prevState.room.images,
							activeIndex: nextIndex,
						},
					},
				};
			});
		}, 3500);

		return () => {
			clearInterval(imageInterval);
		};
	}, []);

	const handleGuestCount = (typeAdult = true, increment = true) => {
		setDetailsState((prevState) => {
			const totalCapacity =
				prevState.room.capacity * prevState.customerDetails.roomQuantity;

			const guest = { ...prevState.customerDetails.guest };

			if (typeAdult) {
				if (increment) {
					guest.adults =
						guest.adults < totalCapacity ? guest.adults + 1 : guest.adults;
				} else {
					guest.adults = guest.adults > 1 ? guest.adults - 1 : guest.adults;
				}
			} else {
				if (increment) {
					guest.children =
						guest.adults <= totalCapacity
							? guest.children + guest.adults <
								totalCapacity + 2 * prevState.customerDetails.roomQuantity
								? guest.children + 1
								: guest.children
							: guest.children;
				} else {
					guest.children =
						guest.children > 0 ? guest.children - 1 : guest.children;
				}
			}

			return {
				...prevState,
				customerDetails: {
					...prevState.customerDetails,
					guest,
				},
			};
		});
	};

	const checkInSelectHandler = (newValue: dayjs.Dayjs | null) => {
		if (newValue && newValue.isAfter(dayjs())) {
			setDetailsState((prevState) => ({
				...prevState,
				customerDetails: {
					...prevState.customerDetails,
					checkInDate: newValue,
				},
			}));
		} else {
			enqueueSnackbar("Please select a valid date", {
				variant: "error",
			});
		}
	};

	const checkOutSelectHandler = (newValue: dayjs.Dayjs | null) => {
		if (newValue && newValue.isAfter(dayjs())) {
			setDetailsState((prevState) => ({
				...prevState,
				customerDetails: {
					...prevState.customerDetails,
					checkOutDate: newValue,
				},
			}));
		} else {
			enqueueSnackbar("Please select a valid date", {
				variant: "error",
			});
		}
	};

	const roomDecreaseHandler = () => {
		setDetailsState((prevState) => ({
			...prevState,
			customerDetails: {
				...prevState.customerDetails,
				guest: {
					adults: 2,
					children: 0,
				},
				roomQuantity:
					prevState.customerDetails.roomQuantity === 1
						? 1
						: prevState.customerDetails.roomQuantity - 1,
			},
		}));
	};

	const roomIncreaseHandler = () => {
		setDetailsState((prevState) => ({
			...prevState,
			customerDetails: {
				...prevState.customerDetails,
				guest: {
					adults: 2,
					children: 0,
				},
				roomQuantity: prevState.customerDetails.roomQuantity < room.quantity ? prevState.customerDetails.roomQuantity + 1 : prevState.customerDetails.roomQuantity,
			},
		}));
	};

	const paymentHandler = async () => {
		try {
			const createOrderResObj = await makeReq("/api/booking/createOrder", "POST", {
				amount:
					detailsState.room.price *
					totalDays *
					detailsState.customerDetails.roomQuantity,
			});

			const createOrderRes = handleResponse(createOrderResObj, enqueueSnackbar);

			const options = {
				key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
				amount: createOrderRes?.amount,
				currency: createOrderRes?.currency,
				name: `Albergo - ${detailsState.hotel.name}`,
				description: `${detailsState.room.type} for ${totalDays} days`,
				image: window.location.origin + "/assets/images/logo/logo.png",
				order_id: createOrderRes?.id,
				handler: async function (razorpayResponse: any) {

					const verifyOrderResObj = await makeReq("/api/booking/verifyOrder", "POST", {
						razorpay_order_id: razorpayResponse.razorpay_order_id,
						razorpay_payment_id: razorpayResponse.razorpay_payment_id,
						razorpay_signature: razorpayResponse.razorpay_signature,
					});

					const verifyOrderRes = handleResponse(verifyOrderResObj, enqueueSnackbar);

					if (verifyOrderRes.signatureIsValid) {

						const createBookingResObj = await makeReq("/api/booking/createBooking", "POST", {
							hotelSlug: detailsState.hotel.slug,
							userUUID: parsedToken.uuid,
							room: {
								roomId: room.roomId,
								quantity: detailsState.customerDetails.roomQuantity,
							},
							checkIn: detailsState.customerDetails.checkInDate.format("YYYY-MM-DD"),
							checkOut: detailsState.customerDetails.checkOutDate.format("YYYY-MM-DD"),
							guest: {
								adults: detailsState.customerDetails.guest.adults,
								children: detailsState.customerDetails.guest.children,
							},
							razorpay_payment_id: razorpayResponse.razorpay_payment_id,
							amount:
								detailsState.room.price *
								totalDays *
								detailsState.customerDetails.roomQuantity,
						}, userToken!);

						const createBookingRes = handleResponse(createBookingResObj, enqueueSnackbar);

						if (createBookingRes) {
							enqueueSnackbar("Booking successful", {
								variant: "success",
							});
							router.push("/bookings");
						}
					}

				},
				prefill: {
					name: detailsState.customerDetails.name,
					email: detailsState.customerDetails.email,
				},
				theme: {
					color: "#3399cc",
				},
				modal: {
					ondismiss: function () {
						enqueueSnackbar("Payment cancelled", {
							variant: "error",
						});
					},
					backdropclose: true,
					escape: true,
					confirm_close: true,
				},
				timeout: 300,
				send_sms_hash: true,
				retry: {
					max_count: 3,
				},
				notes: {
					address: "Albergo",
				},
			};

			const rzp1 = new (window as any).Razorpay(options);
			rzp1.open();

			rzp1.on("payment.failed", function (response: any) {
				enqueueSnackbar("Payment failed", {
					variant: "error",
				});
				return;
			});
		} catch (error) {
			enqueueSnackbar("Something went wrong", {
				variant: "error",
			});
			return;
		}
	};

	return (
		<Fragment>
			<Script src="https://checkout.razorpay.com/v1/checkout.js" />
			<Layout>
				<h3>Confirm Details</h3>
				<div className={styles.container}>
					<div className={styles.details}>
						<div className={styles.detailsItem}>
							<h5>Name</h5>
							<p>{detailsState.customerDetails.name}</p>
						</div>
						<div className={styles.detailsItem}>
							<h5>Phone</h5>
							<p>{detailsState.customerDetails.phone}</p>
						</div>
						<div className={styles.detailsItem}>
							<h5>email</h5>
							<p>{detailsState.customerDetails.email}</p>
						</div>
						<div className={styles.detailsItem}>
							<h5>Hotel Name</h5>
							<p>{detailsState.hotel.name}</p>
						</div>
						<div className={styles.detailsItem}>
							<h5>Hotel Email</h5>
							<p>{detailsState.hotel.email}</p>
						</div>
						<div className={styles.detailsItem}>
							<h5>Hotel Phone</h5>
							<p>{detailsState.hotel.phone}</p>
						</div>
						<div className={styles.detailsItem}>
							<MUIDatePicker
								label="Check In"
								value={detailsState.customerDetails.checkInDate}
								setValue={checkInSelectHandler}
							/>
						</div>
						<div className={styles.detailsItem}>
							<MUIDatePicker
								label="Check Out"
								value={detailsState.customerDetails.checkOutDate}
								setValue={checkOutSelectHandler}
							/>
						</div>
						<div className={styles.detailsItem}>
							<h5>Total Days</h5>
							<p>
								{totalDays} {totalDays > 1 ? "days" : "day"}
							</p>
						</div>
						<div className={styles.detailsItem}>
							<h5>Rooms</h5>
							<div className={styles.guestCount}>
								<button
									onClick={roomDecreaseHandler}
								>
									<MaterialIcon iconName="remove" />{" "}
								</button>
								<p>{detailsState.customerDetails.roomQuantity}</p>
								<button
									onClick={roomIncreaseHandler}
								>
									<MaterialIcon iconName="add" />
								</button>
							</div>
						</div>
						<div className={styles.detailsItem}>
							<h5>Guests</h5>
							<div className={styles.guestCount}>
								<p>Adult</p>
								<button onClick={() => handleGuestCount(true, false)}>
									<MaterialIcon iconName="remove" />{" "}
								</button>
								<p>{detailsState.customerDetails.guest.adults}</p>
								<button onClick={() => handleGuestCount(true, true)}>
									<MaterialIcon iconName="add" />
								</button>
							</div>
							<div className={styles.guestCount}>
								<p>Children</p>
								<button onClick={() => handleGuestCount(false, false)}>
									<MaterialIcon iconName="remove" />{" "}
								</button>
								<p>{detailsState.customerDetails.guest.children}</p>
								<button onClick={() => handleGuestCount(false, true)}>
									<MaterialIcon iconName="add" />
								</button>
							</div>
						</div>
					</div>
					<div className={styles.roomDetails}>
						<div className={styles.roomImagesContainer}>
							<Image
								src={
									detailsState.room.images.list[
										detailsState.room.images.activeIndex
									].link
								}
								layout="fill"
								objectFit="cover"
								alt="room"
							/>
						</div>
						<div className={styles.detailsItem}>
							<h5>Room Type</h5>
							<p>{detailsState.room.type}</p>
						</div>
						<div className={styles.detailsItem}>
							<h5>Price per night</h5>
							<p>
								<Rupee /> {detailsState.room.price}
							</p>
						</div>
						<div className={styles.detailsItem}>
							<h5>Available room Quantity</h5>
							<p>{room.quantity}</p>
						</div>
						<div className={styles.detailsItem}>
							<h5>Total</h5>
							<p>
								<Rupee />
								{detailsState.room.price *
									detailsState.customerDetails.roomQuantity *
									totalDays}
							</p>
							<small>
								{detailsState.customerDetails.roomQuantity} room
								{detailsState.customerDetails.roomQuantity > 1
									? "s"
									: ""} for {totalDays} days
							</small>
							<small>Inclusive of all taxes and service charges</small>
						</div>
						<button className="btn-success" onClick={paymentHandler}>
							Pay now
							<MaterialIcon iconName="payment" />
						</button>
					</div>
				</div>
			</Layout>
		</Fragment>
	);
};

export default BookDetails;

export const getServerSideProps: GetServerSideProps = async (
	ctx: GetServerSidePropsContext
) => {

	const token = getTokenCookie(ctx);
	const userToken = parseJWT(token);

	if (!userToken) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}

	if (userToken.role !== "USER") {
		return {
			notFound: true,
		};
	}

	const slug = ctx.params?.hotelId;

	if (!slug || slug.length < 3) {
		return {
			notFound: true,
		};
	}

	const { roomId } = ctx.query as { roomId: string; };

	if (!roomId || roomId.length < 3) {
		return {
			notFound: true,
		};
	}

	const responses = await Promise.all([
		makeReq(`${process.env.NEXT_PUBLIC_API_URL}/api/hotel/${slug}`, "GET"),
		makeReq(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms/${roomId}`, "GET"),
	]);

	const resObjHotel = responses[0];
	const resObjRoom = responses[1];

	if (!resObjHotel || !resObjHotel.response!.ok) {
		return {
			notFound: true,
		};
	}

	if (!resObjRoom || !resObjRoom.response!.ok) {
		return {
			notFound: true,
		};
	}

	const hotel = resObjHotel.res?.data;
	const room = resObjRoom.res?.data;

	return {
		props: {
			hotel,
			room,
		},
	};
};
