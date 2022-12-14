import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import {
  MonthPicker,
  YearPicker
} from '../../Components/DateRangePicker/DateRangePicker';
import Layout from '../../Components/Layout/Layout';
import { useAppSelector } from '../../redux/hooks';
import styles from '../../styles/Partner/bookings.module.scss';
import { getTokenCookie, parseJWT } from '../../Utils/auth/authHelper';
import { handleResponse, makeReq } from '../../Utils/db';
import { formatDate, IBookingData, MaterialIcon } from '../../Utils/Helper';

interface IBookingProps {
  data: {
    totalDocs: number;
    docs: IBookingData[];
  };
}

const Bookings: NextPage<IBookingProps> = ({ data }) => {

  if (!data || !data.docs) data.docs = [];

  const [listData, setListData] = useState({
    dataArr: data.docs,
    page: 1,
    currentData: data.docs,
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  const { enqueueSnackbar } = useSnackbar();

  const pageSize = 10;

  const userToken = useAppSelector(state => state.user.userEncryptedToken);
  const parsedToken = parseJWT(userToken);

  const [searchState, setSearchState] = useState({
    bookingId: '',
    hotelName: '',
    userName: '',
    checkIn: '',
    checkOut: '',
    amount: '',
    roomName: '',
  });

  const router = useRouter();

  const filterData = (fieldName: string, value: string) => {
    const filterObj = {
      ...searchState,
      [fieldName]: value,
    };

    for (const filterKey in filterObj) {
      if (Object.prototype.hasOwnProperty.call(filterObj, filterKey)) {
        const filterKeyVal = filterObj[filterKey as keyof typeof filterObj];
        if (filterKeyVal === '') {
          delete filterObj[filterKey as keyof typeof filterObj];
        }
      }
    }

    if (Object.keys(filterObj).length === 0) {
      setListData((prevListData) => ({
        ...prevListData,
        dataArr: data.docs,
        page: 1
      }));
      return;
    }

    const filteredData = data.docs.filter((item) => {
      let isMatch = true;

      for (const filterKey in filterObj) {

        if (Object.prototype.hasOwnProperty.call(filterObj, filterKey)) {

          const filterKeyVal = filterObj[filterKey as keyof typeof filterObj];
          const itemKeyVal = item[filterKey as keyof IBookingData];

          if (!itemKeyVal.toString().toLowerCase().includes(filterKeyVal.toLowerCase())) {
            isMatch = false;
          }
        }
      }
      return isMatch;
    });

    setListData((prevListData) => ({
      ...prevListData,
      currentData: filteredData,
      dataArr: filteredData.slice(0, 10),
      page: 1
    }));
  };

  const paginationChange = async (page: number) => {
    const resObj = await makeReq(`${process.env.NEXT_PUBLIC_API_URL}/api/booking?page=${page}`, "GET", undefined, userToken ?? "");

    const res = handleResponse(resObj, enqueueSnackbar);

    if (res) {
      setListData((prevListData) => ({
        ...prevListData,
        dataArr: res.docs,
        page
      }));
      return;
    }

    setListData((prevListData) => ({
      ...prevListData,
      dataArr: [],
      page
    }));
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h4>Bookings</h4>
        <div className={styles.bookingsTable}>
          <div className={styles.tableHeader}>
            <div className={styles.tableRow}>
              <div className={styles.tableHeading}>
                <p>Showing bookings for</p>
              </div>
              <div className={styles.tableHeading}>
                <MonthPicker
                  onChange={(val) => {
                    setListData((prevListData) => ({
                      ...prevListData,
                      month: val.getMonth() + 1
                    }));
                  }}
                />
              </div>
              <div className={styles.tableHeading}>
                <YearPicker
                  onChange={(val) => {
                    console.log(val);
                  }}
                />
              </div>
              <div className={styles.tableHeading}>
                <div className={styles.controls}>
                  <p>
                    {listData.page === 1 ? listData.dataArr.length === 0 ? 0 : 1 : (listData.page - 1) * pageSize + 1}
                    -
                    {listData.dataArr.length < pageSize ? listData.dataArr.length : listData.page * pageSize}{' '} of {data.totalDocs}
                  </p>
                  <button
                    disabled={listData.page === 1 || listData.dataArr.length === 0}
                    onClick={() => paginationChange(listData.page - 1)}
                  >
                    <MaterialIcon iconName="chevron_left" />
                  </button>
                  <button
                    disabled={Math.ceil(data.totalDocs / pageSize) === listData.page}
                    onClick={() => paginationChange(listData.page + 1)}
                  >
                    <MaterialIcon iconName="chevron_right" />
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.tableRow}>
              <div className={styles.tableHeading}>
                <input
                  type="text"
                  placeholder="🔍 Booking ID"
                  value={searchState.bookingId}
                  onChange={(e) => {
                    setSearchState((prevDetailsState) => {
                      return {
                        ...prevDetailsState,
                        bookingId: e.target.value,
                      };
                    });
                    filterData("bookingId", e.target.value);
                  }}
                  min={0}
                  name="bookingId"
                />
              </div>
              <div className={styles.tableHeading}>
                {parsedToken?.role === "HOTEL" ? (
                  <input
                    type="text"
                    placeholder="🧑Customer Name"
                    value={searchState.userName}
                    onChange={(e) => {
                      setSearchState((prevDetailsState) => {
                        return {
                          ...prevDetailsState,
                          userName: e.target.value,
                        };
                      });
                      filterData("userName", e.target.value);
                    }}
                    name="userName"
                  />
                ) : (
                  <input
                    type="text"
                    placeholder="🏨Hotel Name"
                    value={searchState.hotelName}
                    onChange={(e) => {
                      setSearchState((prevDetailsState) => {
                        return {
                          ...prevDetailsState,
                          hotelName: e.target.value,
                        };
                      });
                      filterData("hotelName", e.target.value);
                    }}
                    name="hotelName"
                  />
                )}
              </div>
              <div className={styles.tableHeading}>
                <input
                  type="text"
                  placeholder="room type"
                  value={searchState.roomName}
                  onChange={(e) => {
                    setSearchState((prevDetailsState) => {
                      return {
                        ...prevDetailsState,
                        roomName: e.target.value,
                      };
                    });
                    filterData("roomName", e.target.value);
                  }}
                  pattern="\d{4}-\d{2}-\d{2}"
                  name="checkIn"
                />
              </div>
              <div className={styles.tableHeading}>
                <input
                  type="text"
                  placeholder="📅Check In Date"
                  value={searchState.checkIn}
                  onChange={(e) => {
                    setSearchState((prevDetailsState) => {
                      return {
                        ...prevDetailsState,
                        checkIn: e.target.value,
                      };
                    });
                    filterData("checkIn", e.target.value);
                  }}
                  pattern="\d{4}-\d{2}-\d{2}"
                  name="checkIn"
                />
              </div>
              <div className={styles.tableHeading}>
                <input
                  type="text"
                  placeholder="📅Check Out Date"
                  value={searchState.checkOut}
                  onChange={(e) => {
                    setSearchState((prevDetailsState) => {
                      return {
                        ...prevDetailsState,
                        checkOut: e.target.value,
                      };
                    });
                    filterData("checkOut", e.target.value);
                  }}
                  pattern="\d{4}-\d{2}-\d{2}"
                  name="checkOut"
                />
              </div>
              <div className={styles.tableHeading}>
                <input
                  type="number"
                  placeholder="💰Total Amount"
                  value={searchState.amount}
                  onChange={(e) => {
                    setSearchState((prevDetailsState) => {
                      return {
                        ...prevDetailsState,
                        amount: e.target.value,
                      };
                    });
                    filterData("amount", e.target.value);
                  }}
                  name="amount"
                />
              </div>
            </div>
          </div>
          <div className={styles.tableBody}>
            {listData.dataArr.length === 0 ? (
              <div className={styles.tableRow}>
                <div className={`${styles.tableCol} ${styles.noData}`}>
                  <h2>No data found</h2>
                </div>
              </div>
            ) : (
              listData.dataArr.map((listItem, index) => (
                <div className={`${styles.tableRow} ${styles.tableRowHover}`} key={index} onClick={() => {
                  router.push({
                    pathname: '/bookings/[id]',
                    query: { id: listItem.bookingId }
                  }, "/bookings/" + listItem.bookingId);
                }} >
                  <div className={styles.tableCol}>{listItem.bookingId}</div>
                  {parsedToken?.role === "HOTEL" ? (
                    <div className={styles.tableCol}>{listItem.userName}</div>
                  ) : (
                    <div className={styles.tableCol}>{listItem.hotelName}</div>
                  )}
                  <div className={styles.tableCol}>{listItem.room?.roomName}</div>
                  <div className={styles.tableCol}>{formatDate(listItem.checkIn)}</div>
                  <div className={styles.tableCol}>{formatDate(listItem.checkOut)}</div>
                  <div className={styles.tableCol}>
                    {listItem.amount}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Bookings;

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {

  const token = getTokenCookie(ctx);
  const userToken = parseJWT(token);

  if (!userToken) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const resObj = await makeReq(`${process.env.NEXT_PUBLIC_API_URL}/api/booking/`, "GET", undefined, token);

  if (!resObj || resObj.error || (resObj.response && !resObj.response.ok)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: resObj.res?.data
    }
  };
};;
