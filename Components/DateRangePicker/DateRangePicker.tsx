import { useState, Fragment } from 'react';
import styles from '../../styles/Components/DateRangePicker/DateRangePicker.module.scss';
import {
  daysArr,
  getCurrentMonth,
  getMonthDetails
} from '../../Utils/DatePicker/helper';
import { MaterialIcon } from '../../Utils/Helper';

const DateRangePicker = ({
  onChange
}: {
  onChange: (date: Date) => void;
}) => {
  const [dateState, setDateState] = useState({
    show: false,
    monthDetails: getMonthDetails(getCurrentMonth()),
    currentMonth: getCurrentMonth(),
    selectedDay: 0,
    selectedDate: new Date(),
    inpValue: new Date().toDateString()
  });

  const onClickTouchShowCal = () => {
    setDateState((prevState) => ({
      ...prevState,
      show: true
    }));
  };

  const onClickTouchCloseCal = () => {
    setDateState((prevState) => ({
      ...prevState,
      show: false
    }));
  };

  const onClickTouchSelect = (day: string) => {
    const parsedDay = parseInt(day);

    const selectedDate = new Date(
      dateState.monthDetails.year,
      dateState.currentMonth,
      parsedDay
    );

    setDateState((prevState) => ({
      ...prevState,
      selectedDay: parsedDay,
      show: false,
      selectedDate: selectedDate,
      inpValue: selectedDate.toDateString()
    }));
    onChange(selectedDate);
  };

  return (
    <Fragment>
      <input
        type="text"
        onClick={(e) => {
          e.preventDefault();
          onClickTouchShowCal();
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          onClickTouchShowCal();
        }}
        value={dateState.inpValue}
        placeholder="Select Date"
        readOnly
        className={styles.dateInput}
      />
      {dateState.show && (
        <Fragment>
          <div
            className={styles.backdrop}
            onClick={(e) => {
              e.preventDefault();
              onClickTouchCloseCal();
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              onClickTouchCloseCal();
            }}
          />
          <div className={styles.calendar}>
            <div className={styles.calendarTop}>
              <button
                disabled={dateState.currentMonth === 0}
                onClick={() => {
                  setDateState((prevDateState) => {
                    return {
                      ...prevDateState,
                      currentMonth: prevDateState.currentMonth - 1,
                      monthDetails: getMonthDetails(
                        prevDateState.currentMonth - 1
                      )
                    };
                  });
                }}
              >
                <MaterialIcon iconName="arrow_back_ios" />
              </button>
              <span>
                <h3>{dateState.monthDetails.year}</h3>
                <p>{dateState.monthDetails.month}</p>
              </span>
              <button
                disabled={dateState.currentMonth === 11}
                onClick={() => {
                  setDateState((prevDateState) => {
                    return {
                      ...prevDateState,
                      currentMonth: prevDateState.currentMonth + 1,
                      monthDetails: getMonthDetails(
                        prevDateState.currentMonth + 1
                      )
                    };
                  });
                }}
              >
                <span
                  className={`material-symbols-outlined ${styles.rightIcon}`}
                >
                  arrow_forward_ios
                </span>
              </button>
            </div>
            <div className={styles.calendarBody}>
              {daysArr.map((day, index) => (
                <small key={index}>{day}</small>
              ))}
              {dateState.monthDetails.splitArrObj.prevMonthDays.map(
                (day, index) => {
                  return (
                    <div key={index}>
                      <small className={`${styles.days} ${styles.disabled}`}>
                        {day}
                      </small>
                    </div>
                  );
                }
              )}
              {dateState.monthDetails.splitArrObj.currentMonthDays.map(
                (day, index) => {
                  return (
                    <div key={index}>
                      <small
                        className={`${getCurrentMonth() === dateState.currentMonth &&
                          day === dateState.monthDetails.currentDay
                          ? `${styles.days} ${styles.active} ${styles.today}`
                          : `${styles.active} ${styles.days}`
                          } ${dateState.selectedDay === day &&
                            getCurrentMonth() === dateState.currentMonth
                            ? styles.selected
                            : undefined
                          }`}
                        onClick={(e) =>
                          onClickTouchSelect(e.currentTarget.innerText)
                        }
                        onTouchEnd={(e) =>
                          onClickTouchSelect(e.currentTarget.innerText)
                        }
                      >
                        {day}
                      </small>
                    </div>
                  );
                }
              )}
              {dateState.monthDetails.splitArrObj.nextMonthDays.map(
                (day, index) => {
                  return (
                    <div key={index}>
                      <small className={`${styles.days} ${styles.disabled}`}>
                        {day}
                      </small>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default DateRangePicker;
