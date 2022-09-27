const daysArr = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const monthArr = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const getCurrentMonth = () => {
  const date = new Date();
  const month = date.getMonth();
  return month;
};

const getMonthDetails = (monthNum: number) => {
  const date = new Date();
  const month = monthNum;
  const year = date.getFullYear();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();
  const nextMonthDays = new Date(year, month + 2, 0).getDate();
  const prevMonthDaysArr = [];
  const nextMonthDaysArr = [];
  const currentMonthDaysArr = [];
  const currentDay = date.getDate();

  for (let i = 1; i <= prevMonthDays; i++) {
    prevMonthDaysArr.push(i);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    currentMonthDaysArr.push(i);
  }

  for (let i = 1; i <= nextMonthDays; i++) {
    nextMonthDaysArr.push(i);
  }
  const splitArrObj = {
    prevMonthDays: firstDay !== 0 ? prevMonthDaysArr.slice(-firstDay) : [],
    currentMonthDays: currentMonthDaysArr,
    nextMonthDays: lastDay !== 6 ? nextMonthDaysArr.slice(0, 6 - lastDay) : []
  };

  return {
    month: monthArr[month],
    year,
    daysInMonth,
    splitArrObj,
    currentDay
  };
};

export { daysArr, getCurrentMonth, getMonthDetails };
