import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import {
  MonthPicker,
  YearPicker
} from '../../../Components/DateRangePicker/DateRangePicker';
import Layout from '../../../Components/Layout/Layout';
import styles from '../../../styles/Partner/bookings.module.scss';
import { MaterialIcon } from '../../../Utils/Helper';

interface FilterData {
  id?: string;
  name?: string;
  roomType?: string;
  checkIn?: string;
  paymentMethod?: string;
}

interface DataList {
  id: number;
  name: string;
  roomType: string;
  checkIn: string;
  paymentMethod: string;
}

interface BokingsProps {
  data: DataList[];
}

const Bookings = ({ data }: BokingsProps) => {
  if (data === undefined) data = [];

  const [listData, setListData] = useState({
    dataArr: data.slice(0, 10),
    total: data.length,
    page: 1,
    pageSize: 10,
    currentData: data
  });

  const idInpRef = useRef<HTMLInputElement>(null);
  const nameInpRef = useRef<HTMLInputElement>(null);
  const roomTypeInpRef = useRef<HTMLInputElement>(null);
  const checkInpRef = useRef<HTMLInputElement>(null);
  const paymentInpRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const filterData = () => {
    const id = idInpRef.current?.value;
    const name = nameInpRef.current?.value;
    const roomType = roomTypeInpRef.current?.value;
    const checkIn = checkInpRef.current?.value;
    const paymentMethod = paymentInpRef.current?.value;

    const filterObj: FilterData = {};

    if (id) filterObj.id = id;
    if (name) filterObj.name = name;
    if (roomType) filterObj.roomType = roomType;
    if (checkIn) filterObj.checkIn = checkIn;
    if (paymentMethod) filterObj.paymentMethod = paymentMethod;

    if (Object.keys(filterObj).length === 0) {
      setListData((prevListData) => ({
        ...prevListData,
        dataArr: data.slice(0, 10),
        total: data.length,
        page: 1
      }));
      return;
    }

    const filteredData = data.filter((item) => {
      let isMatch = true;

      for (const filterKey in filterObj) {
        if (Object.prototype.hasOwnProperty.call(filterObj, filterKey)) {
          const filterKeyVal = filterObj[filterKey as keyof FilterData];
          const itemKeyVal = item[filterKey as keyof FilterData];

          if (!itemKeyVal.toString().includes(filterKeyVal as string)) {
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
      total: filteredData.length,
      page: 1
    }));
  };

  const paginationChange = (page: number) => {
    const start = (page - 1) * listData.pageSize;
    const end = start + listData.pageSize;

    setListData((prevListData) => ({
      ...prevListData,
      dataArr: prevListData.currentData.slice(start, end),
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
                    console.log(val);
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
                    {listData.page === 1
                      ? listData.total === 0
                        ? 0
                        : 1
                      : (listData.page - 1) * listData.pageSize + 1}
                    -
                    {listData.total < 11
                      ? listData.total
                      : listData.page * listData.pageSize > listData.total &&
                        listData.total > 10
                      ? listData.total
                      : listData.page * listData.pageSize}{' '}
                    of {listData.total}
                  </p>
                  <button
                    disabled={listData.page === 1 || listData.total === 0}
                    onClick={() => paginationChange(listData.page - 1)}
                  >
                    <MaterialIcon iconName="chevron_left" />
                  </button>
                  <button
                    disabled={
                      listData.page ===
                        Math.ceil(listData.total / listData.pageSize) ||
                      listData.total === 0
                    }
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
                  type="number"
                  placeholder="🔍 Booking ID"
                  ref={idInpRef}
                  onChange={filterData}
                  min={0}
                />
              </div>
              <div className={styles.tableHeading}>
                <input
                  type="text"
                  placeholder="🧑Customer Name"
                  ref={nameInpRef}
                  onChange={filterData}
                />
              </div>
              <div className={styles.tableHeading}>
                <input
                  type="text"
                  placeholder="🏘️Room Type"
                  ref={roomTypeInpRef}
                  onChange={filterData}
                />
              </div>
              <div className={styles.tableHeading}>
                <input
                  type="text"
                  placeholder="📅Check In Date"
                  ref={checkInpRef}
                  onChange={filterData}
                />
              </div>
              <div className={styles.tableHeading}>
                <input
                  type="text"
                  placeholder="💰Payment Method"
                  ref={paymentInpRef}
                  onChange={filterData}
                />
              </div>
              <div className={styles.tableHeading}>Details</div>
            </div>
          </div>
          <div className={styles.tableBody}>
            {listData.total === 0 ? (
              <div className={styles.tableRow}>
                <div className={`${styles.tableCol} ${styles.noData}`}>
                  <h2>No data found</h2>
                </div>
              </div>
            ) : (
              listData.dataArr.map((listItem, index) => (
                <div className={styles.tableRow} key={index}>
                  <div className={styles.tableCol}>{listItem.id}</div>
                  <div className={styles.tableCol}>{listItem.name}</div>
                  <div className={styles.tableCol}>{listItem.roomType}</div>
                  <div className={styles.tableCol}>{listItem.checkIn}</div>
                  <div className={styles.tableCol}>
                    {listItem.paymentMethod}
                  </div>
                  <div className={styles.tableCol}>
                    <button
                      onClick={() => {
                        router.push({
                          pathname: '/partner/bookings/[id]',
                          query: { id: listItem.id }
                        });
                      }}
                    >
                      View
                    </button>
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

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      // data
    }
  };
};
