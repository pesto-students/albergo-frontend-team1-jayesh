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

const data = [
  {
    id: 1,
    name: 'Marcello Hockell',
    roomType: 'classic',
    checkIn: '31/1/2021',
    paymentMethod: 'UPI'
  },
  {
    id: 2,
    name: 'Nicky Pennycuick',
    roomType: 'classic',
    checkIn: '16/9/2020',
    paymentMethod: 'debitCard'
  },
  {
    id: 3,
    name: 'Claudelle Wix',
    roomType: 'deluxe',
    checkIn: '1/7/2022',
    paymentMethod: 'cash'
  },
  {
    id: 4,
    name: 'Duff Gilardi',
    roomType: 'superdeluxe',
    checkIn: '23/1/2022',
    paymentMethod: 'cash'
  },
  {
    id: 5,
    name: 'Olvan Squires',
    roomType: 'suite',
    checkIn: '21/4/2020',
    paymentMethod: 'paypal'
  },
  {
    id: 6,
    name: 'Beale Handy',
    roomType: 'suite',
    checkIn: '10/5/2022',
    paymentMethod: 'UPI'
  },
  {
    id: 7,
    name: 'Tine Vinall',
    roomType: 'classic',
    checkIn: '3/6/2020',
    paymentMethod: 'UPI'
  },
  {
    id: 8,
    name: 'Madalyn Attard',
    roomType: 'superdeluxe',
    checkIn: '29/3/2021',
    paymentMethod: 'netBanking'
  },
  {
    id: 9,
    name: 'Amalea Hampton',
    roomType: 'suite',
    checkIn: '20/2/2021',
    paymentMethod: 'netBanking'
  },
  {
    id: 10,
    name: 'Shari Cradey',
    roomType: 'classic',
    checkIn: '3/8/2021',
    paymentMethod: 'debitCard'
  },
  {
    id: 11,
    name: 'Brandie Rudwell',
    roomType: 'classic',
    checkIn: '6/3/2021',
    paymentMethod: 'debitCard'
  },
  {
    id: 12,
    name: 'Moore MacDonell',
    roomType: 'suite',
    checkIn: '18/8/2021',
    paymentMethod: 'cash'
  },
  {
    id: 13,
    name: 'Jedidiah Gateley',
    roomType: 'classic',
    checkIn: '1/8/2021',
    paymentMethod: 'netBanking'
  },
  {
    id: 14,
    name: 'Lane Spinelli',
    roomType: 'premium',
    checkIn: '29/6/2021',
    paymentMethod: 'creditCard'
  },
  {
    id: 15,
    name: 'Ruthie Spring',
    roomType: 'suite',
    checkIn: '2/5/2021',
    paymentMethod: 'paypal'
  },
  {
    id: 16,
    name: 'Winnifred Birtles',
    roomType: 'suite',
    checkIn: '19/6/2022',
    paymentMethod: 'debitCard'
  },
  {
    id: 17,
    name: 'Deidre Kirckman',
    roomType: 'classic',
    checkIn: '30/12/2019',
    paymentMethod: 'debitCard'
  },
  {
    id: 18,
    name: 'Callie Clapison',
    roomType: 'deluxe',
    checkIn: '5/6/2021',
    paymentMethod: 'netBanking'
  },
  {
    id: 19,
    name: 'Teresina Iwanczyk',
    roomType: 'superdeluxe',
    checkIn: '25/2/2020',
    paymentMethod: 'creditCard'
  },
  {
    id: 20,
    name: 'Wolfgang Basford',
    roomType: 'suite',
    checkIn: '9/6/2021',
    paymentMethod: 'cash'
  },
  {
    id: 21,
    name: 'Griffin Blacksell',
    roomType: 'premium',
    checkIn: '1/3/2021',
    paymentMethod: 'creditCard'
  },
  {
    id: 22,
    name: 'Yorgo Stannion',
    roomType: 'deluxe',
    checkIn: '22/12/2021',
    paymentMethod: 'cash'
  },
  {
    id: 23,
    name: 'Callida Donnel',
    roomType: 'suite',
    checkIn: '9/12/2020',
    paymentMethod: 'debitCard'
  },
  {
    id: 24,
    name: 'Garwood Shrieves',
    roomType: 'classic',
    checkIn: '23/1/2020',
    paymentMethod: 'cash'
  },
  {
    id: 25,
    name: 'Riva Petti',
    roomType: 'premium',
    checkIn: '7/2/2022',
    paymentMethod: 'creditCard'
  },
  {
    id: 26,
    name: 'Carley Aiskovitch',
    roomType: 'classic',
    checkIn: '19/12/2020',
    paymentMethod: 'creditCard'
  },
  {
    id: 27,
    name: 'Bertie Posvner',
    roomType: 'suite',
    checkIn: '7/6/2021',
    paymentMethod: 'UPI'
  },
  {
    id: 28,
    name: 'Paxon Canavan',
    roomType: 'premium',
    checkIn: '14/1/2020',
    paymentMethod: 'paypal'
  },
  {
    id: 29,
    name: 'Sheena Venner',
    roomType: 'suite',
    checkIn: '3/11/2021',
    paymentMethod: 'netBanking'
  },
  {
    id: 30,
    name: 'Crin Skilton',
    roomType: 'suite',
    checkIn: '4/5/2021',
    paymentMethod: 'UPI'
  },
  {
    id: 31,
    name: 'Xylia Cake',
    roomType: 'deluxe',
    checkIn: '20/7/2021',
    paymentMethod: 'cash'
  },
  {
    id: 32,
    name: 'Rosemaria Clifford',
    roomType: 'premium',
    checkIn: '11/9/2022',
    paymentMethod: 'debitCard'
  },
  {
    id: 33,
    name: 'Thatcher Dinkin',
    roomType: 'classic',
    checkIn: '15/12/2020',
    paymentMethod: 'cash'
  },
  {
    id: 34,
    name: 'Keefer Tinghill',
    roomType: 'superdeluxe',
    checkIn: '12/11/2020',
    paymentMethod: 'UPI'
  },
  {
    id: 35,
    name: 'Ronna Wellan',
    roomType: 'premium',
    checkIn: '29/3/2020',
    paymentMethod: 'cash'
  },
  {
    id: 36,
    name: 'Sully Stonall',
    roomType: 'deluxe',
    checkIn: '24/1/2022',
    paymentMethod: 'cash'
  },
  {
    id: 37,
    name: 'Damita McLafferty',
    roomType: 'suite',
    checkIn: '5/7/2022',
    paymentMethod: 'creditCard'
  },
  {
    id: 38,
    name: 'Albie Lockless',
    roomType: 'premium',
    checkIn: '6/3/2020',
    paymentMethod: 'debitCard'
  },
  {
    id: 39,
    name: 'Murial McDonagh',
    roomType: 'premium',
    checkIn: '1/8/2020',
    paymentMethod: 'cash'
  },
  {
    id: 40,
    name: 'Hephzibah Sneyd',
    roomType: 'premium',
    checkIn: '4/12/2021',
    paymentMethod: 'paypal'
  },
  {
    id: 41,
    name: 'Lynnet Northern',
    roomType: 'suite',
    checkIn: '31/8/2021',
    paymentMethod: 'paypal'
  },
  {
    id: 42,
    name: 'Cindi Truce',
    roomType: 'superdeluxe',
    checkIn: '14/6/2022',
    paymentMethod: 'paypal'
  },
  {
    id: 43,
    name: 'Matti Smooth',
    roomType: 'deluxe',
    checkIn: '10/3/2022',
    paymentMethod: 'paypal'
  },
  {
    id: 44,
    name: 'Genovera Cisco',
    roomType: 'suite',
    checkIn: '6/6/2020',
    paymentMethod: 'debitCard'
  },
  {
    id: 45,
    name: 'Bobbie Minton',
    roomType: 'suite',
    checkIn: '13/2/2022',
    paymentMethod: 'cash'
  },
  {
    id: 46,
    name: 'Wallis Ridgedell',
    roomType: 'superdeluxe',
    checkIn: '19/6/2022',
    paymentMethod: 'creditCard'
  },
  {
    id: 47,
    name: 'Jarid Finders',
    roomType: 'suite',
    checkIn: '22/7/2021',
    paymentMethod: 'paypal'
  },
  {
    id: 48,
    name: 'Leila Wardingley',
    roomType: 'classic',
    checkIn: '10/8/2021',
    paymentMethod: 'paypal'
  },
  {
    id: 49,
    name: 'Keir Blaycock',
    roomType: 'deluxe',
    checkIn: '9/3/2022',
    paymentMethod: 'netBanking'
  },
  {
    id: 50,
    name: "Rosy O'Shevlan",
    roomType: 'superdeluxe',
    checkIn: '27/3/2022',
    paymentMethod: 'netBanking'
  },
  {
    id: 51,
    name: 'Christabella Mosby',
    roomType: 'classic',
    checkIn: '3/10/2020',
    paymentMethod: 'paypal'
  },
  {
    id: 52,
    name: 'Hanny Smogur',
    roomType: 'classic',
    checkIn: '12/5/2021',
    paymentMethod: 'creditCard'
  },
  {
    id: 53,
    name: 'Winthrop Lamkin',
    roomType: 'classic',
    checkIn: '19/11/2020',
    paymentMethod: 'debitCard'
  },
  {
    id: 54,
    name: 'Jody Boissier',
    roomType: 'classic',
    checkIn: '17/9/2022',
    paymentMethod: 'creditCard'
  },
  {
    id: 55,
    name: 'Natala Abrehart',
    roomType: 'premium',
    checkIn: '19/12/2020',
    paymentMethod: 'UPI'
  },
  {
    id: 56,
    name: 'Bidget Gori',
    roomType: 'classic',
    checkIn: '3/1/2022',
    paymentMethod: 'UPI'
  },
  {
    id: 57,
    name: 'Thedrick Owain',
    roomType: 'premium',
    checkIn: '12/6/2020',
    paymentMethod: 'cash'
  },
  {
    id: 58,
    name: 'Pascale Canter',
    roomType: 'classic',
    checkIn: '17/2/2020',
    paymentMethod: 'debitCard'
  },
  {
    id: 59,
    name: 'Harrison Murrey',
    roomType: 'premium',
    checkIn: '10/10/2020',
    paymentMethod: 'UPI'
  },
  {
    id: 60,
    name: 'Valina Elcoate',
    roomType: 'superdeluxe',
    checkIn: '19/8/2020',
    paymentMethod: 'cash'
  },
  {
    id: 61,
    name: 'Genvieve Ferney',
    roomType: 'suite',
    checkIn: '9/3/2021',
    paymentMethod: 'debitCard'
  },
  {
    id: 62,
    name: 'Joya Crownshaw',
    roomType: 'premium',
    checkIn: '2/10/2020',
    paymentMethod: 'cash'
  },
  {
    id: 63,
    name: 'Nerita Eades',
    roomType: 'premium',
    checkIn: '30/12/2019',
    paymentMethod: 'creditCard'
  },
  {
    id: 64,
    name: 'Tammie Laverack',
    roomType: 'suite',
    checkIn: '20/12/2019',
    paymentMethod: 'paypal'
  },
  {
    id: 65,
    name: 'Karola Saleway',
    roomType: 'superdeluxe',
    checkIn: '1/5/2020',
    paymentMethod: 'netBanking'
  },
  {
    id: 66,
    name: 'Alberto Yearby',
    roomType: 'classic',
    checkIn: '22/8/2022',
    paymentMethod: 'UPI'
  },
  {
    id: 67,
    name: 'Natty Kerton',
    roomType: 'classic',
    checkIn: '3/2/2021',
    paymentMethod: 'paypal'
  },
  {
    id: 68,
    name: 'Derrik Hanhardt',
    roomType: 'deluxe',
    checkIn: '6/7/2020',
    paymentMethod: 'paypal'
  },
  {
    id: 69,
    name: 'Domeniga Fibbitts',
    roomType: 'classic',
    checkIn: '16/2/2022',
    paymentMethod: 'debitCard'
  },
  {
    id: 70,
    name: 'Kaylee Lilleycrop',
    roomType: 'classic',
    checkIn: '22/1/2021',
    paymentMethod: 'UPI'
  },
  {
    id: 71,
    name: 'Waverley Thonason',
    roomType: 'premium',
    checkIn: '6/11/2021',
    paymentMethod: 'netBanking'
  },
  {
    id: 72,
    name: 'Gonzalo Dering',
    roomType: 'premium',
    checkIn: '14/1/2022',
    paymentMethod: 'debitCard'
  },
  {
    id: 73,
    name: 'Bekki Laurand',
    roomType: 'premium',
    checkIn: '10/6/2021',
    paymentMethod: 'netBanking'
  },
  {
    id: 74,
    name: 'Claudina Shambrooke',
    roomType: 'suite',
    checkIn: '7/2/2022',
    paymentMethod: 'debitCard'
  },
  {
    id: 75,
    name: 'Jae Quakley',
    roomType: 'superdeluxe',
    checkIn: '5/8/2020',
    paymentMethod: 'creditCard'
  },
  {
    id: 76,
    name: 'Wayne Antyukhin',
    roomType: 'superdeluxe',
    checkIn: '12/8/2022',
    paymentMethod: 'cash'
  },
  {
    id: 77,
    name: 'Stanislaw Vaughten',
    roomType: 'deluxe',
    checkIn: '26/1/2020',
    paymentMethod: 'netBanking'
  },
  {
    id: 78,
    name: 'Tony Shiers',
    roomType: 'superdeluxe',
    checkIn: '30/4/2021',
    paymentMethod: 'paypal'
  },
  {
    id: 79,
    name: 'Emory Lewcock',
    roomType: 'suite',
    checkIn: '11/3/2021',
    paymentMethod: 'cash'
  },
  {
    id: 80,
    name: 'Hall Hainey',
    roomType: 'superdeluxe',
    checkIn: '16/3/2021',
    paymentMethod: 'paypal'
  },
  {
    id: 81,
    name: 'Car Yexley',
    roomType: 'superdeluxe',
    checkIn: '17/10/2022',
    paymentMethod: 'paypal'
  },
  {
    id: 82,
    name: 'Viva Giovanazzi',
    roomType: 'premium',
    checkIn: '14/6/2020',
    paymentMethod: 'UPI'
  },
  {
    id: 83,
    name: 'Erhard Inchley',
    roomType: 'classic',
    checkIn: '26/8/2021',
    paymentMethod: 'cash'
  },
  {
    id: 84,
    name: 'Callie Herche',
    roomType: 'premium',
    checkIn: '24/4/2020',
    paymentMethod: 'UPI'
  },
  {
    id: 85,
    name: 'Halli Phillippo',
    roomType: 'suite',
    checkIn: '23/1/2022',
    paymentMethod: 'debitCard'
  },
  {
    id: 86,
    name: 'Cariotta Dellatorre',
    roomType: 'superdeluxe',
    checkIn: '21/1/2021',
    paymentMethod: 'paypal'
  },
  {
    id: 87,
    name: 'Francisca Jayume',
    roomType: 'premium',
    checkIn: '25/4/2021',
    paymentMethod: 'creditCard'
  },
  {
    id: 88,
    name: 'Gypsy Bagster',
    roomType: 'premium',
    checkIn: '17/6/2021',
    paymentMethod: 'paypal'
  },
  {
    id: 89,
    name: 'Marielle Troake',
    roomType: 'deluxe',
    checkIn: '3/5/2020',
    paymentMethod: 'creditCard'
  },
  {
    id: 90,
    name: 'Edgardo Sidebottom',
    roomType: 'deluxe',
    checkIn: '5/3/2020',
    paymentMethod: 'creditCard'
  },
  {
    id: 91,
    name: 'Perri Gammill',
    roomType: 'premium',
    checkIn: '4/11/2021',
    paymentMethod: 'UPI'
  },
  {
    id: 92,
    name: 'Nolana Gillbey',
    roomType: 'superdeluxe',
    checkIn: '8/7/2020',
    paymentMethod: 'paypal'
  },
  {
    id: 93,
    name: 'Dimitry Ruger',
    roomType: 'premium',
    checkIn: '11/8/2021',
    paymentMethod: 'cash'
  },
  {
    id: 94,
    name: 'Maribel Coldtart',
    roomType: 'classic',
    checkIn: '11/10/2021',
    paymentMethod: 'creditCard'
  },
  {
    id: 95,
    name: 'Price Huckleby',
    roomType: 'superdeluxe',
    checkIn: '26/4/2022',
    paymentMethod: 'UPI'
  },
  {
    id: 96,
    name: 'Jethro Rosita',
    roomType: 'suite',
    checkIn: '26/6/2021',
    paymentMethod: 'cash'
  },
  {
    id: 97,
    name: 'Bobbi Poleykett',
    roomType: 'classic',
    checkIn: '16/1/2022',
    paymentMethod: 'UPI'
  },
  {
    id: 98,
    name: 'Hercules Lasham',
    roomType: 'suite',
    checkIn: '21/8/2021',
    paymentMethod: 'UPI'
  },
  {
    id: 99,
    name: 'Irvin Vicioso',
    roomType: 'superdeluxe',
    checkIn: '5/9/2021',
    paymentMethod: 'UPI'
  },
  {
    id: 100,
    name: 'Luciano Hateley',
    roomType: 'deluxe',
    checkIn: '25/9/2020',
    paymentMethod: 'cash'
  },
  {
    id: 101,
    name: 'Kathe Oguz',
    roomType: 'suite',
    checkIn: '19/12/2019',
    paymentMethod: 'cash'
  },
  {
    id: 102,
    name: 'Pennie Brussell',
    roomType: 'superdeluxe',
    checkIn: '16/8/2022',
    paymentMethod: 'cash'
  },
  {
    id: 103,
    name: 'Quentin Union',
    roomType: 'suite',
    checkIn: '27/5/2022',
    paymentMethod: 'debitCard'
  },
  {
    id: 104,
    name: 'Evangelia Wigfall',
    roomType: 'classic',
    checkIn: '21/7/2020',
    paymentMethod: 'UPI'
  },
  {
    id: 105,
    name: 'Agata Fradson',
    roomType: 'superdeluxe',
    checkIn: '17/8/2021',
    paymentMethod: 'debitCard'
  },
  {
    id: 106,
    name: 'Lesya Llewellin',
    roomType: 'classic',
    checkIn: '19/11/2021',
    paymentMethod: 'UPI'
  },
  {
    id: 107,
    name: 'Rafaela Goodlake',
    roomType: 'suite',
    checkIn: '3/2/2021',
    paymentMethod: 'creditCard'
  },
  {
    id: 108,
    name: 'Melita Wase',
    roomType: 'suite',
    checkIn: '18/6/2022',
    paymentMethod: 'paypal'
  },
  {
    id: 109,
    name: 'Shoshanna Kilmurry',
    roomType: 'suite',
    checkIn: '12/11/2021',
    paymentMethod: 'creditCard'
  },
  {
    id: 110,
    name: 'Leonie Fenning',
    roomType: 'superdeluxe',
    checkIn: '18/5/2022',
    paymentMethod: 'paypal'
  },
  {
    id: 111,
    name: 'Carly Marnes',
    roomType: 'superdeluxe',
    checkIn: '3/6/2020',
    paymentMethod: 'debitCard'
  },
  {
    id: 112,
    name: 'Alfie Ebhardt',
    roomType: 'premium',
    checkIn: '14/11/2021',
    paymentMethod: 'cash'
  },
  {
    id: 113,
    name: 'Alonso Barns',
    roomType: 'deluxe',
    checkIn: '15/12/2020',
    paymentMethod: 'UPI'
  },
  {
    id: 114,
    name: 'Raphaela Bennion',
    roomType: 'classic',
    checkIn: '19/5/2021',
    paymentMethod: 'UPI'
  },
  {
    id: 115,
    name: 'Ina Rivalland',
    roomType: 'superdeluxe',
    checkIn: '23/10/2021',
    paymentMethod: 'netBanking'
  },
  {
    id: 116,
    name: 'Keven Baylay',
    roomType: 'deluxe',
    checkIn: '18/6/2020',
    paymentMethod: 'paypal'
  },
  {
    id: 117,
    name: 'Merry Gadaud',
    roomType: 'suite',
    checkIn: '20/11/2020',
    paymentMethod: 'UPI'
  },
  {
    id: 118,
    name: 'Kristyn Gartin',
    roomType: 'superdeluxe',
    checkIn: '15/3/2021',
    paymentMethod: 'debitCard'
  },
  {
    id: 119,
    name: 'Sabra Autin',
    roomType: 'suite',
    checkIn: '19/3/2021',
    paymentMethod: 'debitCard'
  },
  {
    id: 120,
    name: 'Clint Ronan',
    roomType: 'suite',
    checkIn: '16/1/2021',
    paymentMethod: 'creditCard'
  },
  {
    id: 121,
    name: 'Legra Zuan',
    roomType: 'classic',
    checkIn: '9/4/2022',
    paymentMethod: 'debitCard'
  },
  {
    id: 122,
    name: 'Salmon Guiraud',
    roomType: 'premium',
    checkIn: '30/3/2022',
    paymentMethod: 'paypal'
  },
  {
    id: 123,
    name: 'Kylie Acton',
    roomType: 'superdeluxe',
    checkIn: '11/10/2022',
    paymentMethod: 'paypal'
  },
  {
    id: 124,
    name: 'Leonhard Cosson',
    roomType: 'premium',
    checkIn: '10/4/2020',
    paymentMethod: 'debitCard'
  },
  {
    id: 125,
    name: 'North Cabena',
    roomType: 'superdeluxe',
    checkIn: '25/6/2021',
    paymentMethod: 'paypal'
  },
  {
    id: 126,
    name: 'Theodosia Adshead',
    roomType: 'superdeluxe',
    checkIn: '20/3/2021',
    paymentMethod: 'UPI'
  },
  {
    id: 127,
    name: 'Melita Winship',
    roomType: 'deluxe',
    checkIn: '27/9/2022',
    paymentMethod: 'cash'
  },
  {
    id: 128,
    name: 'Berrie Bauldry',
    roomType: 'deluxe',
    checkIn: '20/12/2021',
    paymentMethod: 'debitCard'
  },
  {
    id: 129,
    name: 'Silvana Lochrie',
    roomType: 'superdeluxe',
    checkIn: '13/5/2021',
    paymentMethod: 'cash'
  },
  {
    id: 130,
    name: 'Alvis MacCosty',
    roomType: 'premium',
    checkIn: '18/7/2021',
    paymentMethod: 'cash'
  },
  {
    id: 131,
    name: 'Kissee Farrent',
    roomType: 'premium',
    checkIn: '4/7/2021',
    paymentMethod: 'debitCard'
  },
  {
    id: 132,
    name: 'Rowland Purkess',
    roomType: 'deluxe',
    checkIn: '8/10/2020',
    paymentMethod: 'paypal'
  },
  {
    id: 133,
    name: 'Alphard Cristofori',
    roomType: 'deluxe',
    checkIn: '12/2/2020',
    paymentMethod: 'debitCard'
  },
  {
    id: 134,
    name: 'Mendel Bleazard',
    roomType: 'premium',
    checkIn: '23/7/2022',
    paymentMethod: 'paypal'
  },
  {
    id: 135,
    name: 'Camel Storck',
    roomType: 'classic',
    checkIn: '20/12/2021',
    paymentMethod: 'debitCard'
  },
  {
    id: 136,
    name: 'Nappy Clubley',
    roomType: 'superdeluxe',
    checkIn: '22/9/2021',
    paymentMethod: 'debitCard'
  },
  {
    id: 137,
    name: 'Karlene Parnell',
    roomType: 'deluxe',
    checkIn: '24/6/2020',
    paymentMethod: 'debitCard'
  },
  {
    id: 138,
    name: 'Irvin Craddy',
    roomType: 'classic',
    checkIn: '7/2/2022',
    paymentMethod: 'creditCard'
  },
  {
    id: 139,
    name: 'Neils Guerreiro',
    roomType: 'premium',
    checkIn: '26/3/2021',
    paymentMethod: 'UPI'
  },
  {
    id: 140,
    name: 'Dorey Money',
    roomType: 'classic',
    checkIn: '8/10/2021',
    paymentMethod: 'UPI'
  },
  {
    id: 141,
    name: 'Deena Devlin',
    roomType: 'premium',
    checkIn: '24/6/2020',
    paymentMethod: 'paypal'
  },
  {
    id: 142,
    name: 'Tersina Dumbleton',
    roomType: 'suite',
    checkIn: '13/10/2020',
    paymentMethod: 'cash'
  },
  {
    id: 143,
    name: 'Taddeo Meale',
    roomType: 'premium',
    checkIn: '25/12/2020',
    paymentMethod: 'debitCard'
  },
  {
    id: 144,
    name: 'Orville Luten',
    roomType: 'classic',
    checkIn: '21/11/2020',
    paymentMethod: 'netBanking'
  },
  {
    id: 145,
    name: 'Mile Robard',
    roomType: 'superdeluxe',
    checkIn: '13/4/2022',
    paymentMethod: 'netBanking'
  },
  {
    id: 146,
    name: 'Sterne Hewson',
    roomType: 'classic',
    checkIn: '2/12/2021',
    paymentMethod: 'creditCard'
  },
  {
    id: 147,
    name: 'Hyatt Hodgon',
    roomType: 'superdeluxe',
    checkIn: '29/4/2020',
    paymentMethod: 'cash'
  },
  {
    id: 148,
    name: 'Brigida McKleod',
    roomType: 'deluxe',
    checkIn: '8/3/2020',
    paymentMethod: 'cash'
  },
  {
    id: 149,
    name: 'Alleyn Guillart',
    roomType: 'classic',
    checkIn: '5/12/2020',
    paymentMethod: 'netBanking'
  },
  {
    id: 150,
    name: 'Rorie Kohnen',
    roomType: 'premium',
    checkIn: '22/2/2020',
    paymentMethod: 'paypal'
  },
  {
    id: 151,
    name: 'Westbrooke Keattch',
    roomType: 'classic',
    checkIn: '13/9/2021',
    paymentMethod: 'creditCard'
  },
  {
    id: 152,
    name: 'Caspar Fenelon',
    roomType: 'suite',
    checkIn: '8/9/2022',
    paymentMethod: 'netBanking'
  },
  {
    id: 153,
    name: 'Derward Blackborn',
    roomType: 'deluxe',
    checkIn: '4/10/2022',
    paymentMethod: 'cash'
  },
  {
    id: 154,
    name: 'Lavena MacKowle',
    roomType: 'premium',
    checkIn: '19/8/2022',
    paymentMethod: 'creditCard'
  },
  {
    id: 155,
    name: 'Derby Mahedy',
    roomType: 'deluxe',
    checkIn: '25/7/2020',
    paymentMethod: 'UPI'
  },
  {
    id: 156,
    name: 'Marco Allday',
    roomType: 'suite',
    checkIn: '25/4/2022',
    paymentMethod: 'netBanking'
  },
  {
    id: 157,
    name: 'Foss Jefferson',
    roomType: 'classic',
    checkIn: '9/5/2022',
    paymentMethod: 'debitCard'
  },
  {
    id: 158,
    name: 'Stacee Brightie',
    roomType: 'superdeluxe',
    checkIn: '18/7/2020',
    paymentMethod: 'paypal'
  },
  {
    id: 159,
    name: 'Inge Bilverstone',
    roomType: 'suite',
    checkIn: '12/11/2020',
    paymentMethod: 'creditCard'
  },
  {
    id: 160,
    name: 'Marianne Rivard',
    roomType: 'classic',
    checkIn: '3/8/2022',
    paymentMethod: 'debitCard'
  },
  {
    id: 161,
    name: 'Norry Rivilis',
    roomType: 'superdeluxe',
    checkIn: '15/4/2021',
    paymentMethod: 'paypal'
  },
  {
    id: 162,
    name: 'Kali Johnigan',
    roomType: 'suite',
    checkIn: '31/5/2020',
    paymentMethod: 'creditCard'
  },
  {
    id: 163,
    name: 'Rosanna Clohissy',
    roomType: 'suite',
    checkIn: '23/7/2021',
    paymentMethod: 'creditCard'
  },
  {
    id: 164,
    name: 'Quinta Clarabut',
    roomType: 'premium',
    checkIn: '1/8/2020',
    paymentMethod: 'netBanking'
  },
  {
    id: 165,
    name: 'Alix Matschoss',
    roomType: 'superdeluxe',
    checkIn: '22/2/2021',
    paymentMethod: 'UPI'
  },
  {
    id: 166,
    name: 'Sutherlan Gott',
    roomType: 'premium',
    checkIn: '20/8/2021',
    paymentMethod: 'cash'
  },
  {
    id: 167,
    name: 'Noel Flewett',
    roomType: 'premium',
    checkIn: '1/9/2020',
    paymentMethod: 'netBanking'
  },
  {
    id: 168,
    name: 'Shell Mapledoore',
    roomType: 'premium',
    checkIn: '23/11/2020',
    paymentMethod: 'UPI'
  },
  {
    id: 169,
    name: 'Elizabet Fritchley',
    roomType: 'suite',
    checkIn: '15/1/2020',
    paymentMethod: 'UPI'
  },
  {
    id: 170,
    name: 'Emmott Bourner',
    roomType: 'classic',
    checkIn: '27/10/2020',
    paymentMethod: 'cash'
  },
  {
    id: 171,
    name: 'Torey Fallows',
    roomType: 'deluxe',
    checkIn: '11/3/2020',
    paymentMethod: 'debitCard'
  },
  {
    id: 172,
    name: 'Cam Petrishchev',
    roomType: 'suite',
    checkIn: '5/6/2020',
    paymentMethod: 'paypal'
  },
  {
    id: 173,
    name: 'Basia Allgood',
    roomType: 'suite',
    checkIn: '24/2/2020',
    paymentMethod: 'paypal'
  },
  {
    id: 174,
    name: 'Iolanthe Didball',
    roomType: 'suite',
    checkIn: '25/10/2020',
    paymentMethod: 'netBanking'
  },
  {
    id: 175,
    name: 'Tamar Ickovicz',
    roomType: 'suite',
    checkIn: '1/10/2022',
    paymentMethod: 'creditCard'
  },
  {
    id: 176,
    name: 'Lilly Hodges',
    roomType: 'superdeluxe',
    checkIn: '30/12/2021',
    paymentMethod: 'cash'
  },
  {
    id: 177,
    name: 'Ethe Ethelstone',
    roomType: 'premium',
    checkIn: '21/8/2020',
    paymentMethod: 'cash'
  },
  {
    id: 178,
    name: 'Suellen Greenrod',
    roomType: 'deluxe',
    checkIn: '1/4/2020',
    paymentMethod: 'creditCard'
  },
  {
    id: 179,
    name: 'Juliane Heake',
    roomType: 'superdeluxe',
    checkIn: '22/7/2021',
    paymentMethod: 'creditCard'
  },
  {
    id: 180,
    name: 'Hatty Conelly',
    roomType: 'suite',
    checkIn: '8/5/2022',
    paymentMethod: 'debitCard'
  },
  {
    id: 181,
    name: 'Breena Bricham',
    roomType: 'superdeluxe',
    checkIn: '21/9/2020',
    paymentMethod: 'netBanking'
  },
  {
    id: 182,
    name: 'Normy Norvell',
    roomType: 'superdeluxe',
    checkIn: '16/10/2021',
    paymentMethod: 'cash'
  },
  {
    id: 183,
    name: 'Jerrilyn Physic',
    roomType: 'classic',
    checkIn: '25/5/2021',
    paymentMethod: 'creditCard'
  },
  {
    id: 184,
    name: 'Jules Trevena',
    roomType: 'suite',
    checkIn: '1/2/2020',
    paymentMethod: 'UPI'
  },
  {
    id: 185,
    name: 'Rutherford Crookston',
    roomType: 'superdeluxe',
    checkIn: '16/12/2020',
    paymentMethod: 'cash'
  },
  {
    id: 186,
    name: 'Agace Hackford',
    roomType: 'suite',
    checkIn: '12/11/2021',
    paymentMethod: 'paypal'
  },
  {
    id: 187,
    name: 'Elroy Niesel',
    roomType: 'suite',
    checkIn: '30/6/2021',
    paymentMethod: 'UPI'
  },
  {
    id: 188,
    name: 'Clarette Tidbold',
    roomType: 'superdeluxe',
    checkIn: '1/12/2021',
    paymentMethod: 'paypal'
  },
  {
    id: 189,
    name: 'Dody Mengue',
    roomType: 'superdeluxe',
    checkIn: '2/4/2021',
    paymentMethod: 'creditCard'
  },
  {
    id: 190,
    name: 'Lloyd Stockford',
    roomType: 'premium',
    checkIn: '13/1/2021',
    paymentMethod: 'paypal'
  },
  {
    id: 191,
    name: 'Arnuad Curness',
    roomType: 'deluxe',
    checkIn: '5/3/2020',
    paymentMethod: 'paypal'
  },
  {
    id: 192,
    name: 'Marv Pagelsen',
    roomType: 'classic',
    checkIn: '8/1/2020',
    paymentMethod: 'paypal'
  },
  {
    id: 193,
    name: 'Bea Ker',
    roomType: 'suite',
    checkIn: '7/3/2021',
    paymentMethod: 'debitCard'
  },
  {
    id: 194,
    name: 'Tailor Spurling',
    roomType: 'classic',
    checkIn: '11/7/2022',
    paymentMethod: 'netBanking'
  },
  {
    id: 195,
    name: 'Rebeca Scough',
    roomType: 'deluxe',
    checkIn: '22/12/2019',
    paymentMethod: 'creditCard'
  },
  {
    id: 196,
    name: 'Karilynn Postans',
    roomType: 'deluxe',
    checkIn: '18/6/2022',
    paymentMethod: 'netBanking'
  },
  {
    id: 197,
    name: 'Erminie Cranage',
    roomType: 'suite',
    checkIn: '27/9/2022',
    paymentMethod: 'paypal'
  },
  {
    id: 198,
    name: 'Katy Discombe',
    roomType: 'deluxe',
    checkIn: '10/11/2020',
    paymentMethod: 'cash'
  },
  {
    id: 199,
    name: 'Karita Dewitt',
    roomType: 'superdeluxe',
    checkIn: '4/12/2021',
    paymentMethod: 'creditCard'
  },
  {
    id: 200,
    name: 'Seka Truss',
    roomType: 'premium',
    checkIn: '12/9/2021',
    paymentMethod: 'paypal'
  },
  {
    id: 201,
    name: 'Liesa Tweddell',
    roomType: 'superdeluxe',
    checkIn: '29/11/2021',
    paymentMethod: 'debitCard'
  },
  {
    id: 202,
    name: 'Lacee Heephy',
    roomType: 'superdeluxe',
    checkIn: '5/4/2022',
    paymentMethod: 'UPI'
  },
  {
    id: 203,
    name: 'Ebenezer Simenon',
    roomType: 'deluxe',
    checkIn: '16/5/2022',
    paymentMethod: 'creditCard'
  },
  {
    id: 204,
    name: 'Carolee McGlew',
    roomType: 'premium',
    checkIn: '22/8/2022',
    paymentMethod: 'paypal'
  },
  {
    id: 205,
    name: 'Tudor Groombridge',
    roomType: 'premium',
    checkIn: '5/9/2020',
    paymentMethod: 'creditCard'
  },
  {
    id: 206,
    name: 'Maire Give',
    roomType: 'classic',
    checkIn: '28/6/2021',
    paymentMethod: 'debitCard'
  },
  {
    id: 207,
    name: 'Harriot Minger',
    roomType: 'deluxe',
    checkIn: '3/11/2021',
    paymentMethod: 'creditCard'
  },
  {
    id: 208,
    name: 'Bren Heed',
    roomType: 'classic',
    checkIn: '13/4/2020',
    paymentMethod: 'paypal'
  },
  {
    id: 209,
    name: 'Carlie Larkkem',
    roomType: 'premium',
    checkIn: '3/3/2020',
    paymentMethod: 'debitCard'
  },
  {
    id: 210,
    name: 'Genia Austwick',
    roomType: 'deluxe',
    checkIn: '25/2/2020',
    paymentMethod: 'paypal'
  },
  {
    id: 211,
    name: 'Shellie Rhubottom',
    roomType: 'suite',
    checkIn: '6/5/2021',
    paymentMethod: 'paypal'
  },
  {
    id: 212,
    name: 'Jacqui Pepin',
    roomType: 'superdeluxe',
    checkIn: '7/10/2021',
    paymentMethod: 'debitCard'
  },
  {
    id: 213,
    name: 'Ninnette Ferryn',
    roomType: 'classic',
    checkIn: '29/7/2022',
    paymentMethod: 'cash'
  },
  {
    id: 214,
    name: 'Jamill Martin',
    roomType: 'superdeluxe',
    checkIn: '18/8/2020',
    paymentMethod: 'paypal'
  },
  {
    id: 215,
    name: 'Letizia Laming',
    roomType: 'deluxe',
    checkIn: '31/3/2020',
    paymentMethod: 'paypal'
  },
  {
    id: 216,
    name: 'Barnebas MacNulty',
    roomType: 'deluxe',
    checkIn: '4/11/2021',
    paymentMethod: 'UPI'
  },
  {
    id: 217,
    name: 'Marsh Spraggon',
    roomType: 'deluxe',
    checkIn: '16/8/2021',
    paymentMethod: 'cash'
  },
  {
    id: 218,
    name: 'Rafa Solesbury',
    roomType: 'classic',
    checkIn: '19/1/2022',
    paymentMethod: 'debitCard'
  },
  {
    id: 219,
    name: 'Catherina Clousley',
    roomType: 'premium',
    checkIn: '1/5/2022',
    paymentMethod: 'debitCard'
  },
  {
    id: 220,
    name: 'Mace Leitch',
    roomType: 'superdeluxe',
    checkIn: '5/4/2020',
    paymentMethod: 'debitCard'
  },
  {
    id: 221,
    name: 'Lorens Grishelyov',
    roomType: 'classic',
    checkIn: '11/4/2020',
    paymentMethod: 'debitCard'
  },
  {
    id: 222,
    name: 'Alexandros Laurentin',
    roomType: 'premium',
    checkIn: '20/7/2022',
    paymentMethod: 'debitCard'
  },
  {
    id: 223,
    name: 'Jaimie Corbridge',
    roomType: 'suite',
    checkIn: '21/4/2021',
    paymentMethod: 'creditCard'
  },
  {
    id: 224,
    name: 'Bernadette Thonger',
    roomType: 'superdeluxe',
    checkIn: '6/8/2020',
    paymentMethod: 'netBanking'
  },
  {
    id: 225,
    name: 'Lorilee Capel',
    roomType: 'premium',
    checkIn: '1/9/2021',
    paymentMethod: 'cash'
  },
  {
    id: 226,
    name: 'Ashely Mecco',
    roomType: 'classic',
    checkIn: '23/4/2022',
    paymentMethod: 'paypal'
  },
  {
    id: 227,
    name: 'Abner Ellif',
    roomType: 'superdeluxe',
    checkIn: '7/8/2021',
    paymentMethod: 'creditCard'
  },
  {
    id: 228,
    name: 'Alexia Scawton',
    roomType: 'superdeluxe',
    checkIn: '2/6/2020',
    paymentMethod: 'creditCard'
  },
  {
    id: 229,
    name: 'Adolf Pymm',
    roomType: 'premium',
    checkIn: '16/6/2021',
    paymentMethod: 'paypal'
  },
  {
    id: 230,
    name: 'Ignacius Gregor',
    roomType: 'classic',
    checkIn: '9/3/2020',
    paymentMethod: 'paypal'
  },
  {
    id: 231,
    name: 'Taber Dran',
    roomType: 'suite',
    checkIn: '21/1/2021',
    paymentMethod: 'cash'
  },
  {
    id: 232,
    name: 'Rickie Fish',
    roomType: 'superdeluxe',
    checkIn: '8/4/2022',
    paymentMethod: 'cash'
  },
  {
    id: 233,
    name: 'Gualterio Beecraft',
    roomType: 'classic',
    checkIn: '23/5/2020',
    paymentMethod: 'creditCard'
  },
  {
    id: 234,
    name: 'Kevon Cosgreave',
    roomType: 'suite',
    checkIn: '18/12/2021',
    paymentMethod: 'netBanking'
  },
  {
    id: 235,
    name: 'Federica Stichel',
    roomType: 'classic',
    checkIn: '4/1/2021',
    paymentMethod: 'cash'
  },
  {
    id: 236,
    name: 'Etti Abdee',
    roomType: 'superdeluxe',
    checkIn: '3/6/2021',
    paymentMethod: 'cash'
  },
  {
    id: 237,
    name: 'Neel Olesen',
    roomType: 'deluxe',
    checkIn: '21/5/2021',
    paymentMethod: 'UPI'
  },
  {
    id: 238,
    name: 'Earvin Galsworthy',
    roomType: 'premium',
    checkIn: '9/11/2020',
    paymentMethod: 'debitCard'
  },
  {
    id: 239,
    name: 'Gladys Beernt',
    roomType: 'premium',
    checkIn: '14/11/2021',
    paymentMethod: 'paypal'
  },
  {
    id: 240,
    name: 'Olly Aveline',
    roomType: 'classic',
    checkIn: '22/12/2019',
    paymentMethod: 'creditCard'
  },
  {
    id: 241,
    name: 'Filberto Broadley',
    roomType: 'premium',
    checkIn: '15/8/2020',
    paymentMethod: 'netBanking'
  },
  {
    id: 242,
    name: 'Van Nordass',
    roomType: 'classic',
    checkIn: '30/8/2020',
    paymentMethod: 'netBanking'
  },
  {
    id: 243,
    name: 'Sula Silcox',
    roomType: 'suite',
    checkIn: '24/8/2020',
    paymentMethod: 'paypal'
  },
  {
    id: 244,
    name: 'Gwynne Dowsett',
    roomType: 'classic',
    checkIn: '2/12/2021',
    paymentMethod: 'paypal'
  },
  {
    id: 245,
    name: "Kiele O'Crigane",
    roomType: 'deluxe',
    checkIn: '23/1/2021',
    paymentMethod: 'creditCard'
  },
  {
    id: 246,
    name: 'Eolande Danhel',
    roomType: 'deluxe',
    checkIn: '23/10/2020',
    paymentMethod: 'cash'
  },
  {
    id: 247,
    name: 'Bryana Ricketts',
    roomType: 'suite',
    checkIn: '21/7/2020',
    paymentMethod: 'debitCard'
  },
  {
    id: 248,
    name: 'Harald Wison',
    roomType: 'superdeluxe',
    checkIn: '24/5/2020',
    paymentMethod: 'creditCard'
  },
  {
    id: 249,
    name: 'Andie Bontine',
    roomType: 'premium',
    checkIn: '6/8/2021',
    paymentMethod: 'UPI'
  },
  {
    id: 250,
    name: 'Falito McMackin',
    roomType: 'premium',
    checkIn: '22/11/2020',
    paymentMethod: 'creditCard'
  }
];

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
      data
    }
  };
};
