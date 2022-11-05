import dayjs from "dayjs";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Script from "next/script";
import React, { Fragment, useEffect, useState } from "react";
import { MUIDatePicker } from "../../../Components/DateRangePicker/DateRangePicker";
import Layout from "../../../Components/Layout/Layout";
import Toast, { IToast } from "../../../Components/Toast/Toast";
import styles from "../../../styles/Hotel/bookDetails.module.scss";
import { MaterialIcon, Rupee } from "../../../Utils/Helper";

const BookDetails = ({ hotelData }: { hotelData: any }) => {
  const router = useRouter();
  const { hotelId } = router.query;
  const [detailsState, setDetailsState] = useState({
    hotel: {
      name: hotelData.name,
      email: hotelData.email,
      phone: hotelData.phone,
      slug: hotelId,
    },
    room: {
      type: "Room Type",
      price: 2500,
      images: {
        list: [
          "https://images.unsplash.com/photo-1609949279531-cf48d64bed89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
          "https://images.unsplash.com/photo-1608198399988-341f712c3711?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
          "https://images.unsplash.com/photo-1601565415267-724db0e9fbdf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1460&q=80",
        ],
        activeIndex: 0,
      },
      capacity: 3,
    },
    customerDetails: {
      name: "John Doe",
      email: "john@mail.com",
      phone: "1234567890",
      checkInDate: dayjs(),
      checkOutDate: dayjs(),
      guest: {
        adults: 2,
        children: 0,
      },
      roomQuantity: 1,
    },
  });

  const [toastState, setToastState] = useState<IToast>({
    message: "",
    type: "success",
    visible: false,
  });

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

  const paymentHandler = async () => {
    try {
      const response = await fetch("/api/booking/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount:
            detailsState.room.price *
            totalDays *
            detailsState.customerDetails.roomQuantity,
        }),
      });

      const res = await response.json();
      if (!response.ok) {
        setToastState({
          message: res.message,
          type: "error",
          visible: true,
        });
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: res?.amount,
        currency: res?.currency,
        name: `Albergo - ${detailsState.hotel.name}`,
        description: `${detailsState.room.type} for ${totalDays} days`,
        image: window.location.origin + "/assets/images/logo/logo.png",
        order_id: res?.id,
        handler: async function (razorpayResponse: any) {
          const response = await fetch("/api/booking/verifyOrder", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_order_id: razorpayResponse.razorpay_order_id,
              razorpay_payment_id: razorpayResponse.razorpay_payment_id,
              razorpay_signature: razorpayResponse.razorpay_signature,
            }),
          });

          const res = await response.json();
          if (!response.ok) {
            setToastState({
              message: res.message,
              type: "error",
              visible: true,
            });
            return;
          }

          const { signatureIsValid } = res;
          if (signatureIsValid) {
            try {
              const dbResponse = await fetch("/api/booking/createBooking", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ...detailsState,
                  razorpay_order_id: razorpayResponse.razorpay_order_id,
                  razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                  razorpay_signature: razorpayResponse.razorpay_signature,
                  amount:
                    detailsState.room.price *
                    totalDays *
                    detailsState.customerDetails.roomQuantity,
                }),
              });

              const dbRes = await dbResponse.json();

              if (!dbResponse.ok) {
                setToastState({
                  message: dbRes.message,
                  type: "error",
                  visible: true,
                });
                return;
              }

              setToastState({
                message: "Payment successful",
                type: "success",
                visible: true,
              });

              // router.push('/hotel/booking/success');
              return;
            } catch (error) {
              setToastState({
                message: "Something went wrong",
                type: "error",
                visible: true,
              });
            }
          } else {
            setToastState({
              message: "Payment stage 2 of 3 failed due to invalid signature",
              type: "error",
              visible: true,
            });
            return;
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
            setToastState({
              message: "Payment cancelled",
              type: "error",
              visible: true,
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
        setToastState({
          message: response.error.description ?? "Payment failed",
          type: "error",
          visible: true,
        });
        return;
      });
    } catch (error) {
      console.log(error);
      setToastState({
        message: "Something went wrong",
        type: "error",
        visible: true,
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
                setValue={(newValue) => {
                  if (newValue && newValue.isAfter(dayjs())) {
                    setDetailsState((prevState) => ({
                      ...prevState,
                      customerDetails: {
                        ...prevState.customerDetails,
                        checkInDate: newValue,
                      },
                    }));
                  } else {
                    setToastState({
                      visible: true,
                      message: "Please select a valid date",
                      type: "error",
                    });
                  }
                }}
              />
            </div>
            <div className={styles.detailsItem}>
              <MUIDatePicker
                label="Check Out"
                value={detailsState.customerDetails.checkOutDate}
                setValue={(newValue) => {
                  if (newValue && newValue.isAfter(dayjs())) {
                    setDetailsState((prevState) => ({
                      ...prevState,
                      customerDetails: {
                        ...prevState.customerDetails,
                        checkOutDate: newValue,
                      },
                    }));
                  } else {
                    setToastState({
                      visible: true,
                      message: "Please select a valid date",
                      type: "error",
                    });
                  }
                }}
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
                  onClick={() =>
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
                    }))
                  }
                >
                  <MaterialIcon iconName="remove" />{" "}
                </button>
                <p>{detailsState.customerDetails.roomQuantity}</p>
                <button
                  onClick={() =>
                    setDetailsState((prevState) => ({
                      ...prevState,
                      customerDetails: {
                        ...prevState.customerDetails,
                        guest: {
                          adults: 2,
                          children: 0,
                        },
                        roomQuantity:
                          prevState.customerDetails.roomQuantity + 1,
                      },
                    }))
                  }
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
                  ]
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
                  : ""} for{" "}
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
      <Toast setToastState={setToastState} toastState={toastState} />
    </Fragment>
  );
};

export default BookDetails;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const slug = ctx.params?.hotelId;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/hotel/${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return {
        notFound: true,
      };
    }

    const res = await response.json();

    // const userResponse = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_URL}/api/user/me`,

    return {
      props: {
        hotelData: res.data,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      notFound: true,
    };
  }
};
