import { useState, Fragment, useEffect } from 'react';
import {
  daysArr,
  getCurrentMonth,
  getMonthDetails,
  monthArr
} from '../../Utils/DatePicker/helper';
import { MaterialIcon } from '../../Utils/Helper';
import datePickerStyles from '../../styles/Components/DateRangePicker/DateRangePicker.module.scss';
import monthPickerStyles from '../../styles/Components/DateRangePicker/MonthPicker.module.scss';

const DateRangePicker = ({ onChange }: { onChange: (date: Date) => void }) => {
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
        className={datePickerStyles.dateInput}
      />
      {dateState.show && (
        <Fragment>
          <div
            className={datePickerStyles.backdrop}
            onClick={(e) => {
              e.preventDefault();
              onClickTouchCloseCal();
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              onClickTouchCloseCal();
            }}
          />
          <div className={datePickerStyles.calendar}>
            <div className={datePickerStyles.calendarTop}>
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
                  className={`material-symbols-outlined ${datePickerStyles.rightIcon}`}
                >
                  arrow_forward_ios
                </span>
              </button>
            </div>
            <div className={datePickerStyles.calendarBody}>
              {daysArr.map((day, index) => (
                <small key={index}>{day}</small>
              ))}
              {dateState.monthDetails.splitArrObj.prevMonthDays.map(
                (day, index) => {
                  return (
                    <div key={index}>
                      <small
                        className={`${datePickerStyles.days} ${datePickerStyles.disabled}`}
                      >
                        {day}
                      </small>
                    </div>
                  );
                }
              )}
              {dateState.monthDetails.splitArrObj.currentMonthDays.map(
                (day, index) => {
                  const currentDate = new Date().getDate();
                  return (
                    <div key={index}>
                      <small
                        // className={`
                        // ${getCurrentMonth() === dateState.currentMonth &&
                        //     day === dateState.monthDetails.currentDay &&
                        //     day >= currentDate
                        //     ? `${styles.days} ${styles.active} ${styles.today}`
                        //     : `${styles.days}`
                        //   } ${dateState.selectedDay === day &&
                        //     getCurrentMonth() === dateState.currentMonth
                        //     ? styles.selected
                        //     : undefined
                        //   } ${day < currentDate ? styles.disabled : undefined}`}
                        className={`${
                          getCurrentMonth() === dateState.currentMonth
                            ? datePickerStyles.currentMonth
                            : datePickerStyles.disabled
                        } ${
                          getCurrentMonth() === dateState.currentMonth &&
                          day === dateState.monthDetails.currentDay
                            ? datePickerStyles.today
                            : undefined
                        } ${
                          getCurrentMonth() === dateState.currentMonth &&
                          day >= currentDate
                            ? datePickerStyles.valid
                            : undefined
                        } ${datePickerStyles.days}`}
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
                      <small
                        className={`${datePickerStyles.days} ${datePickerStyles.disabled}`}
                      >
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

const MonthPicker = ({ onChange }: { onChange: (date: Date) => void }) => {
  const [monthState, setMonthState] = useState({
    currentMonth: getMonthDetails(getCurrentMonth()).month,
    showSelect: false
  });

  useEffect(() => {
    if (monthState.showSelect) {
      const activeMonth = document.getElementById('activeMonth');
      activeMonth &&
        activeMonth.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        });
    }
  }, [monthState.showSelect]);

  return (
    <div className={monthPickerStyles.container}>
      <input
        type="text"
        value={monthState.currentMonth}
        readOnly
        onClick={() =>
          setMonthState((prevMonthState) => ({
            ...prevMonthState,
            showSelect: true
          }))
        }
      />
      {monthState.showSelect && (
        <ul>
          {monthArr.map((month, index) => (
            <li
              key={index}
              onClick={() => {
                setMonthState((prevMonthState) => ({
                  ...prevMonthState,
                  currentMonth: month,
                  showSelect: false
                }));
                onChange &&
                  onChange(
                    new Date(getMonthDetails(index).year, index, 1, 0, 0, 0, 0)
                  );
              }}
              id={monthState.currentMonth === month ? 'activeMonth' : undefined}
              className={
                monthState.currentMonth === month
                  ? monthPickerStyles.active
                  : undefined
              }
            >
              {month}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const YearPicker = ({ onChange }: { onChange: (date: Date) => void }) => {
  const [yearState, setYearState] = useState({
    currentYear: getMonthDetails(getCurrentMonth()).year,
    showSelect: false
  });

  const yearArr = Array.from(
    { length: 20 },
    (v, k) => k + yearState.currentYear - 10
  );

  useEffect(() => {
    if (yearState.showSelect) {
      const activeYear = document.getElementById('activeYear');
      activeYear &&
        activeYear.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        });
    }
  }, [yearState.showSelect]);

  return (
    <div className={monthPickerStyles.container}>
      <input
        type="text"
        value={yearState.currentYear}
        readOnly
        onClick={() =>
          setYearState((prevYearState) => ({
            ...prevYearState,
            showSelect: true
          }))
        }
      />
      {yearState.showSelect && (
        <ul>
          {yearArr.map((year, index) => (
            <li
              key={index}
              onClick={() => {
                setYearState((prevYearState) => ({
                  ...prevYearState,
                  currentYear: year,
                  showSelect: false
                }));
                onChange &&
                  onChange(new Date(year, getCurrentMonth(), 1, 0, 0, 0, 0));
              }}
              id={yearState.currentYear === year ? 'activeYear' : undefined}
              className={
                yearState.currentYear === year
                  ? monthPickerStyles.active
                  : undefined
              }
            >
              {year}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { DateRangePicker, MonthPicker, YearPicker };
