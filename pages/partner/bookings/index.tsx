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

const mockData = [{ "id": 1, "name": "Ronnie Casellas", "roomType": "deluxe", "checkIn": "10/10/2022", "paymentMethod": "debitCard" },
{ "id": 2, "name": "Ramon Bury", "roomType": "suite", "checkIn": "1/2/2022", "paymentMethod": "debitCard" },
{ "id": 3, "name": "Dunstan Tribe", "roomType": "suite", "checkIn": "12/2/2020", "paymentMethod": "netBanking" },
{ "id": 4, "name": "Petrina Hackey", "roomType": "deluxe", "checkIn": "31/12/2021", "paymentMethod": "UPI" },
{ "id": 5, "name": "Ethan Kunkler", "roomType": "classic", "checkIn": "3/6/2020", "paymentMethod": "creditCard" },
{ "id": 6, "name": "Warner Gostyke", "roomType": "classic", "checkIn": "20/6/2021", "paymentMethod": "netBanking" },
{ "id": 7, "name": "Sibelle Spores", "roomType": "premium", "checkIn": "13/10/2022", "paymentMethod": "creditCard" },
{ "id": 8, "name": "Kass Vogele", "roomType": "superdeluxe", "checkIn": "15/6/2020", "paymentMethod": "cash" },
{ "id": 9, "name": "Ximenes Bygraves", "roomType": "superdeluxe", "checkIn": "10/8/2020", "paymentMethod": "netBanking" },
{ "id": 10, "name": "Christel Northbridge", "roomType": "suite", "checkIn": "13/7/2022", "paymentMethod": "creditCard" },
{ "id": 11, "name": "Titus McReynold", "roomType": "classic", "checkIn": "20/10/2020", "paymentMethod": "creditCard" },
{ "id": 12, "name": "Lyndsay Lockhead", "roomType": "superdeluxe", "checkIn": "14/10/2022", "paymentMethod": "netBanking" },
{ "id": 13, "name": "Sig Cartmill", "roomType": "deluxe", "checkIn": "15/4/2020", "paymentMethod": "paypal" },
{ "id": 14, "name": "Dot Zanetello", "roomType": "premium", "checkIn": "9/12/2020", "paymentMethod": "cash" },
{ "id": 15, "name": "Christiane Chominski", "roomType": "premium", "checkIn": "29/6/2021", "paymentMethod": "debitCard" },
{ "id": 16, "name": "Ange Muckian", "roomType": "superdeluxe", "checkIn": "10/5/2020", "paymentMethod": "cash" },
{ "id": 17, "name": "Ardelis Napleton", "roomType": "premium", "checkIn": "19/7/2021", "paymentMethod": "UPI" },
{ "id": 18, "name": "Alaric Blinder", "roomType": "deluxe", "checkIn": "7/9/2020", "paymentMethod": "netBanking" },
{ "id": 19, "name": "Didi Yesipov", "roomType": "superdeluxe", "checkIn": "24/8/2022", "paymentMethod": "creditCard" },
{ "id": 20, "name": "Valera Percy", "roomType": "deluxe", "checkIn": "9/4/2020", "paymentMethod": "debitCard" },
{ "id": 21, "name": "Hailey Gue", "roomType": "premium", "checkIn": "29/8/2020", "paymentMethod": "netBanking" },
{ "id": 22, "name": "Rudolfo Doncom", "roomType": "classic", "checkIn": "17/9/2020", "paymentMethod": "UPI" },
{ "id": 23, "name": "Aurlie Figin", "roomType": "deluxe", "checkIn": "8/4/2022", "paymentMethod": "debitCard" },
{ "id": 24, "name": "Dolli Kennerknecht", "roomType": "premium", "checkIn": "14/2/2020", "paymentMethod": "debitCard" },
{ "id": 25, "name": "David Bruffell", "roomType": "deluxe", "checkIn": "16/6/2020", "paymentMethod": "paypal" },
{ "id": 26, "name": "Rooney Vinter", "roomType": "classic", "checkIn": "25/2/2021", "paymentMethod": "UPI" },
{ "id": 27, "name": "Juliana Wynrahame", "roomType": "deluxe", "checkIn": "14/8/2021", "paymentMethod": "UPI" },
{ "id": 28, "name": "Evonne MacKibbon", "roomType": "classic", "checkIn": "6/2/2022", "paymentMethod": "cash" },
{ "id": 29, "name": "Eleanore Skeel", "roomType": "suite", "checkIn": "22/7/2022", "paymentMethod": "netBanking" },
{ "id": 30, "name": "Gina Struijs", "roomType": "superdeluxe", "checkIn": "30/1/2022", "paymentMethod": "cash" },
{ "id": 31, "name": "Karissa Adran", "roomType": "suite", "checkIn": "19/2/2020", "paymentMethod": "netBanking" },
{ "id": 32, "name": "Kimmie Thursby", "roomType": "suite", "checkIn": "24/1/2021", "paymentMethod": "creditCard" },
{ "id": 33, "name": "Hube Smalley", "roomType": "superdeluxe", "checkIn": "30/4/2022", "paymentMethod": "paypal" },
{ "id": 34, "name": "Smitty Gumley", "roomType": "superdeluxe", "checkIn": "8/5/2022", "paymentMethod": "debitCard" },
{ "id": 35, "name": "Chariot McConnell", "roomType": "deluxe", "checkIn": "1/5/2021", "paymentMethod": "cash" },
{ "id": 36, "name": "Raf Philipsson", "roomType": "deluxe", "checkIn": "21/5/2020", "paymentMethod": "creditCard" },
{ "id": 37, "name": "Derry Burgett", "roomType": "premium", "checkIn": "17/1/2021", "paymentMethod": "netBanking" },
{ "id": 38, "name": "Sammy Tupp", "roomType": "suite", "checkIn": "9/4/2021", "paymentMethod": "cash" },
{ "id": 39, "name": "Tammie Brimble", "roomType": "suite", "checkIn": "19/2/2022", "paymentMethod": "netBanking" },
{ "id": 40, "name": "Stavro Hargess", "roomType": "suite", "checkIn": "8/10/2022", "paymentMethod": "cash" },
{ "id": 41, "name": "Pincus Carous", "roomType": "premium", "checkIn": "7/8/2020", "paymentMethod": "paypal" },
{ "id": 42, "name": "Joan Hirtzmann", "roomType": "premium", "checkIn": "8/9/2021", "paymentMethod": "netBanking" },
{ "id": 43, "name": "Nicol Pougher", "roomType": "classic", "checkIn": "11/5/2020", "paymentMethod": "UPI" },
{ "id": 44, "name": "Ahmed Rookeby", "roomType": "superdeluxe", "checkIn": "25/9/2021", "paymentMethod": "UPI" },
{ "id": 45, "name": "Dory Grishmanov", "roomType": "superdeluxe", "checkIn": "15/2/2021", "paymentMethod": "UPI" },
{ "id": 46, "name": "Tabbie Garrould", "roomType": "deluxe", "checkIn": "16/9/2020", "paymentMethod": "debitCard" },
{ "id": 47, "name": "Meryl Mingus", "roomType": "superdeluxe", "checkIn": "7/10/2021", "paymentMethod": "UPI" },
{ "id": 48, "name": "Staffard Reany", "roomType": "classic", "checkIn": "3/8/2021", "paymentMethod": "netBanking" },
{ "id": 49, "name": "Lorry Downing", "roomType": "superdeluxe", "checkIn": "4/11/2021", "paymentMethod": "debitCard" },
{ "id": 50, "name": "Auberta Andell", "roomType": "deluxe", "checkIn": "1/11/2021", "paymentMethod": "cash" },
{ "id": 51, "name": "Vita Haskell", "roomType": "superdeluxe", "checkIn": "19/1/2022", "paymentMethod": "netBanking" },
{ "id": 52, "name": "Merola Blackaller", "roomType": "suite", "checkIn": "3/9/2022", "paymentMethod": "paypal" },
{ "id": 53, "name": "Correna Di Biagio", "roomType": "deluxe", "checkIn": "5/9/2021", "paymentMethod": "debitCard" },
{ "id": 54, "name": "Violet Boeter", "roomType": "deluxe", "checkIn": "27/8/2022", "paymentMethod": "creditCard" },
{ "id": 55, "name": "Thomasina Thurlby", "roomType": "deluxe", "checkIn": "14/2/2021", "paymentMethod": "UPI" },
{ "id": 56, "name": "Randee Ashbee", "roomType": "premium", "checkIn": "9/1/2022", "paymentMethod": "debitCard" },
{ "id": 57, "name": "Duke Davidovics", "roomType": "suite", "checkIn": "14/9/2022", "paymentMethod": "UPI" },
{ "id": 58, "name": "Donal Donnett", "roomType": "superdeluxe", "checkIn": "4/10/2022", "paymentMethod": "paypal" },
{ "id": 59, "name": "Simone Dwerryhouse", "roomType": "superdeluxe", "checkIn": "12/9/2022", "paymentMethod": "cash" },
{ "id": 60, "name": "Cobb Picford", "roomType": "suite", "checkIn": "11/10/2020", "paymentMethod": "netBanking" },
{ "id": 61, "name": "Elvera Fear", "roomType": "classic", "checkIn": "12/4/2020", "paymentMethod": "debitCard" },
{ "id": 62, "name": "Felicdad Wrate", "roomType": "superdeluxe", "checkIn": "30/5/2022", "paymentMethod": "debitCard" },
{ "id": 63, "name": "Aleta Bage", "roomType": "deluxe", "checkIn": "10/6/2020", "paymentMethod": "UPI" },
{ "id": 64, "name": "Von Valentine", "roomType": "premium", "checkIn": "9/10/2020", "paymentMethod": "debitCard" },
{ "id": 65, "name": "Emmalee Lockett", "roomType": "suite", "checkIn": "28/8/2022", "paymentMethod": "UPI" },
{ "id": 66, "name": "Bea Cressy", "roomType": "deluxe", "checkIn": "17/9/2021", "paymentMethod": "paypal" },
{ "id": 67, "name": "Alisander Monni", "roomType": "superdeluxe", "checkIn": "24/11/2020", "paymentMethod": "netBanking" },
{ "id": 68, "name": "Betsey Lukes", "roomType": "premium", "checkIn": "5/6/2022", "paymentMethod": "cash" },
{ "id": 69, "name": "Katharyn Ripping", "roomType": "deluxe", "checkIn": "19/8/2021", "paymentMethod": "netBanking" },
{ "id": 70, "name": "Rozalin Blunsen", "roomType": "classic", "checkIn": "29/1/2022", "paymentMethod": "creditCard" },
{ "id": 71, "name": "Brena Tanguy", "roomType": "classic", "checkIn": "26/7/2022", "paymentMethod": "debitCard" },
{ "id": 72, "name": "Maridel Kristufek", "roomType": "premium", "checkIn": "4/1/2020", "paymentMethod": "debitCard" },
{ "id": 73, "name": "Jessalyn Housbie", "roomType": "premium", "checkIn": "25/6/2022", "paymentMethod": "paypal" },
{ "id": 74, "name": "Antonin Illesley", "roomType": "superdeluxe", "checkIn": "17/9/2021", "paymentMethod": "creditCard" },
{ "id": 75, "name": "Jolene Portingale", "roomType": "deluxe", "checkIn": "3/8/2021", "paymentMethod": "netBanking" },
{ "id": 76, "name": "Maurita Scraggs", "roomType": "classic", "checkIn": "2/11/2020", "paymentMethod": "netBanking" },
{ "id": 77, "name": "Mart Hammatt", "roomType": "premium", "checkIn": "14/4/2022", "paymentMethod": "debitCard" },
{ "id": 78, "name": "Brandise Steptoe", "roomType": "premium", "checkIn": "17/7/2020", "paymentMethod": "paypal" },
{ "id": 79, "name": "Ari Dumphreys", "roomType": "deluxe", "checkIn": "31/1/2021", "paymentMethod": "creditCard" },
{ "id": 80, "name": "Mari Aburrow", "roomType": "deluxe", "checkIn": "17/10/2022", "paymentMethod": "paypal" },
{ "id": 81, "name": "Vernen Fussie", "roomType": "premium", "checkIn": "3/7/2020", "paymentMethod": "netBanking" },
{ "id": 82, "name": "Penrod Lindner", "roomType": "superdeluxe", "checkIn": "9/10/2021", "paymentMethod": "paypal" },
{ "id": 83, "name": "Olivier Geal", "roomType": "classic", "checkIn": "14/1/2022", "paymentMethod": "debitCard" },
{ "id": 84, "name": "Lazare Peterken", "roomType": "classic", "checkIn": "13/8/2020", "paymentMethod": "paypal" },
{ "id": 85, "name": "Findlay Mathen", "roomType": "premium", "checkIn": "5/5/2021", "paymentMethod": "debitCard" },
{ "id": 86, "name": "Celina Kepe", "roomType": "deluxe", "checkIn": "8/4/2022", "paymentMethod": "debitCard" },
{ "id": 87, "name": "Leslie Marzelle", "roomType": "premium", "checkIn": "20/3/2020", "paymentMethod": "cash" },
{ "id": 88, "name": "Rip Coltart", "roomType": "suite", "checkIn": "17/3/2020", "paymentMethod": "paypal" },
{ "id": 89, "name": "Noelani Corder", "roomType": "premium", "checkIn": "14/3/2022", "paymentMethod": "cash" },
{ "id": 90, "name": "Marya Acey", "roomType": "premium", "checkIn": "15/8/2020", "paymentMethod": "netBanking" },
{ "id": 91, "name": "Nan O'Doherty", "roomType": "premium", "checkIn": "31/5/2020", "paymentMethod": "UPI" },
{ "id": 92, "name": "Kenna Biggadyke", "roomType": "suite", "checkIn": "1/7/2020", "paymentMethod": "cash" },
{ "id": 93, "name": "Lee Brattan", "roomType": "classic", "checkIn": "5/9/2020", "paymentMethod": "creditCard" },
{ "id": 94, "name": "Katalin Nickerson", "roomType": "deluxe", "checkIn": "14/1/2020", "paymentMethod": "UPI" },
{ "id": 95, "name": "Dudley Lutman", "roomType": "premium", "checkIn": "25/9/2020", "paymentMethod": "creditCard" },
{ "id": 96, "name": "Ezequiel O'Neil", "roomType": "suite", "checkIn": "15/7/2020", "paymentMethod": "netBanking" },
{ "id": 97, "name": "Rafaelita Bleythin", "roomType": "classic", "checkIn": "4/7/2021", "paymentMethod": "paypal" },
{ "id": 98, "name": "Kyle Whifen", "roomType": "premium", "checkIn": "17/2/2022", "paymentMethod": "UPI" },
{ "id": 99, "name": "Carolynn Hammett", "roomType": "deluxe", "checkIn": "25/2/2022", "paymentMethod": "paypal" },
{ "id": 100, "name": "Eberto Rosita", "roomType": "premium", "checkIn": "25/4/2021", "paymentMethod": "netBanking" },
{ "id": 101, "name": "Terra Harrow", "roomType": "suite", "checkIn": "10/5/2022", "paymentMethod": "netBanking" },
{ "id": 102, "name": "Lew Bisson", "roomType": "superdeluxe", "checkIn": "4/10/2021", "paymentMethod": "UPI" },
{ "id": 103, "name": "Shep Streather", "roomType": "superdeluxe", "checkIn": "22/7/2022", "paymentMethod": "cash" },
{ "id": 104, "name": "Emilie Wathall", "roomType": "superdeluxe", "checkIn": "29/12/2021", "paymentMethod": "creditCard" },
{ "id": 105, "name": "Blondy Tubridy", "roomType": "suite", "checkIn": "23/4/2022", "paymentMethod": "UPI" },
{ "id": 106, "name": "Ashia Brik", "roomType": "suite", "checkIn": "20/1/2022", "paymentMethod": "debitCard" },
{ "id": 107, "name": "Shelley O'Fallon", "roomType": "suite", "checkIn": "27/5/2020", "paymentMethod": "netBanking" },
{ "id": 108, "name": "Johnathon Peris", "roomType": "premium", "checkIn": "27/4/2022", "paymentMethod": "paypal" },
{ "id": 109, "name": "Chaunce Yukhnov", "roomType": "premium", "checkIn": "14/10/2020", "paymentMethod": "netBanking" },
{ "id": 110, "name": "Wilma Yarrall", "roomType": "superdeluxe", "checkIn": "21/10/2022", "paymentMethod": "cash" },
{ "id": 111, "name": "Lolita Huke", "roomType": "superdeluxe", "checkIn": "3/8/2022", "paymentMethod": "debitCard" },
{ "id": 112, "name": "Ody Bisterfeld", "roomType": "suite", "checkIn": "26/11/2021", "paymentMethod": "netBanking" },
{ "id": 113, "name": "Gaile Diperaus", "roomType": "classic", "checkIn": "5/9/2020", "paymentMethod": "paypal" },
{ "id": 114, "name": "Aretha Brennand", "roomType": "superdeluxe", "checkIn": "2/8/2020", "paymentMethod": "netBanking" },
{ "id": 115, "name": "Michaela Abethell", "roomType": "classic", "checkIn": "3/2/2020", "paymentMethod": "UPI" },
{ "id": 116, "name": "Bonnibelle Agent", "roomType": "deluxe", "checkIn": "26/11/2020", "paymentMethod": "cash" },
{ "id": 117, "name": "Ralf Lanney", "roomType": "suite", "checkIn": "20/2/2020", "paymentMethod": "netBanking" },
{ "id": 118, "name": "Teddie De la Eglise", "roomType": "premium", "checkIn": "2/11/2020", "paymentMethod": "UPI" },
{ "id": 119, "name": "Lynne Meldrum", "roomType": "superdeluxe", "checkIn": "11/9/2020", "paymentMethod": "creditCard" },
{ "id": 120, "name": "Betty Vermer", "roomType": "classic", "checkIn": "29/5/2022", "paymentMethod": "cash" },
{ "id": 121, "name": "Moses Clapp", "roomType": "premium", "checkIn": "9/3/2021", "paymentMethod": "creditCard" },
{ "id": 122, "name": "Kyla Dymond", "roomType": "deluxe", "checkIn": "11/5/2021", "paymentMethod": "UPI" },
{ "id": 123, "name": "Cynthea Spittal", "roomType": "superdeluxe", "checkIn": "20/9/2020", "paymentMethod": "cash" },
{ "id": 124, "name": "Auroora Vanyukov", "roomType": "premium", "checkIn": "27/1/2022", "paymentMethod": "debitCard" },
{ "id": 125, "name": "Joelly Blatcher", "roomType": "suite", "checkIn": "23/2/2020", "paymentMethod": "debitCard" },
{ "id": 126, "name": "Zilvia Goane", "roomType": "premium", "checkIn": "1/4/2020", "paymentMethod": "paypal" },
{ "id": 127, "name": "Liv D'eath", "roomType": "deluxe", "checkIn": "2/2/2022", "paymentMethod": "debitCard" },
{ "id": 128, "name": "Prudi Blabber", "roomType": "deluxe", "checkIn": "2/9/2022", "paymentMethod": "UPI" },
{ "id": 129, "name": "Haily McClay", "roomType": "premium", "checkIn": "13/1/2022", "paymentMethod": "cash" },
{ "id": 130, "name": "Leshia Guite", "roomType": "superdeluxe", "checkIn": "10/10/2021", "paymentMethod": "creditCard" },
{ "id": 131, "name": "Lebbie Linskill", "roomType": "deluxe", "checkIn": "27/1/2022", "paymentMethod": "paypal" },
{ "id": 132, "name": "Heriberto Teck", "roomType": "suite", "checkIn": "19/4/2022", "paymentMethod": "paypal" },
{ "id": 133, "name": "Clementina Cornil", "roomType": "suite", "checkIn": "5/1/2020", "paymentMethod": "UPI" },
{ "id": 134, "name": "Shawna Liley", "roomType": "suite", "checkIn": "8/5/2021", "paymentMethod": "cash" },
{ "id": 135, "name": "Lanae Columbell", "roomType": "premium", "checkIn": "20/4/2022", "paymentMethod": "UPI" },
{ "id": 136, "name": "Clarey Taunton", "roomType": "classic", "checkIn": "29/12/2019", "paymentMethod": "debitCard" },
{ "id": 137, "name": "Kathie Davenell", "roomType": "premium", "checkIn": "7/8/2020", "paymentMethod": "paypal" },
{ "id": 138, "name": "Jae Whiten", "roomType": "superdeluxe", "checkIn": "31/3/2020", "paymentMethod": "paypal" },
{ "id": 139, "name": "Susanetta Levy", "roomType": "deluxe", "checkIn": "30/4/2021", "paymentMethod": "debitCard" },
{ "id": 140, "name": "Lucila Cane", "roomType": "superdeluxe", "checkIn": "28/3/2021", "paymentMethod": "paypal" },
{ "id": 141, "name": "Florian Nazaret", "roomType": "classic", "checkIn": "16/5/2020", "paymentMethod": "creditCard" },
{ "id": 142, "name": "Correna Tott", "roomType": "deluxe", "checkIn": "20/2/2021", "paymentMethod": "debitCard" },
{ "id": 143, "name": "Arleen Spacy", "roomType": "suite", "checkIn": "30/3/2022", "paymentMethod": "netBanking" },
{ "id": 144, "name": "Madlin Elan", "roomType": "deluxe", "checkIn": "8/8/2021", "paymentMethod": "cash" },
{ "id": 145, "name": "Hieronymus Ourtic", "roomType": "deluxe", "checkIn": "12/10/2022", "paymentMethod": "debitCard" },
{ "id": 146, "name": "Waite Ramsby", "roomType": "classic", "checkIn": "4/3/2020", "paymentMethod": "debitCard" },
{ "id": 147, "name": "Rosalind Yendall", "roomType": "suite", "checkIn": "22/8/2022", "paymentMethod": "cash" },
{ "id": 148, "name": "Harriette Wedgbrow", "roomType": "premium", "checkIn": "22/2/2022", "paymentMethod": "paypal" },
{ "id": 149, "name": "Melody Huebner", "roomType": "superdeluxe", "checkIn": "7/9/2021", "paymentMethod": "creditCard" },
{ "id": 150, "name": "Darlene Tillett", "roomType": "classic", "checkIn": "18/8/2022", "paymentMethod": "cash" },
{ "id": 151, "name": "Alastair Garlett", "roomType": "superdeluxe", "checkIn": "15/2/2022", "paymentMethod": "creditCard" },
{ "id": 152, "name": "Aluin Liverseege", "roomType": "classic", "checkIn": "4/4/2021", "paymentMethod": "netBanking" },
{ "id": 153, "name": "Micheline Joslin", "roomType": "deluxe", "checkIn": "27/12/2021", "paymentMethod": "netBanking" },
{ "id": 154, "name": "Pooh Shooter", "roomType": "deluxe", "checkIn": "20/8/2020", "paymentMethod": "UPI" },
{ "id": 155, "name": "Andria Beacock", "roomType": "classic", "checkIn": "1/2/2022", "paymentMethod": "creditCard" },
{ "id": 156, "name": "Poppy Hoggin", "roomType": "deluxe", "checkIn": "22/8/2022", "paymentMethod": "netBanking" },
{ "id": 157, "name": "Alexina Anwyl", "roomType": "suite", "checkIn": "17/8/2020", "paymentMethod": "debitCard" },
{ "id": 158, "name": "Shelby Lumsdale", "roomType": "suite", "checkIn": "6/1/2022", "paymentMethod": "UPI" },
{ "id": 159, "name": "Laurie Maxfield", "roomType": "deluxe", "checkIn": "19/11/2021", "paymentMethod": "debitCard" },
{ "id": 160, "name": "Edgardo Bransom", "roomType": "deluxe", "checkIn": "4/11/2021", "paymentMethod": "netBanking" },
{ "id": 161, "name": "Celka Chestnutt", "roomType": "suite", "checkIn": "24/3/2021", "paymentMethod": "debitCard" },
{ "id": 162, "name": "Kathie Boij", "roomType": "premium", "checkIn": "2/4/2021", "paymentMethod": "paypal" },
{ "id": 163, "name": "Chloette Wealleans", "roomType": "deluxe", "checkIn": "29/8/2022", "paymentMethod": "paypal" },
{ "id": 164, "name": "Clare Penlington", "roomType": "deluxe", "checkIn": "22/12/2019", "paymentMethod": "cash" },
{ "id": 165, "name": "Dyanne Jacquot", "roomType": "suite", "checkIn": "24/6/2021", "paymentMethod": "cash" },
{ "id": 166, "name": "Jae Ramalho", "roomType": "deluxe", "checkIn": "22/1/2021", "paymentMethod": "paypal" },
{ "id": 167, "name": "Demetra Brittan", "roomType": "premium", "checkIn": "17/6/2021", "paymentMethod": "netBanking" },
{ "id": 168, "name": "Sigismond Mitskevich", "roomType": "deluxe", "checkIn": "24/4/2020", "paymentMethod": "debitCard" },
{ "id": 169, "name": "Tiebold Hearnes", "roomType": "premium", "checkIn": "11/3/2021", "paymentMethod": "debitCard" },
{ "id": 170, "name": "Danit Isles", "roomType": "deluxe", "checkIn": "23/3/2020", "paymentMethod": "UPI" },
{ "id": 171, "name": "Trude MacAlister", "roomType": "classic", "checkIn": "3/3/2021", "paymentMethod": "cash" },
{ "id": 172, "name": "Lydia Jaggli", "roomType": "premium", "checkIn": "21/12/2020", "paymentMethod": "UPI" },
{ "id": 173, "name": "Carlynn Klemensiewicz", "roomType": "suite", "checkIn": "3/1/2020", "paymentMethod": "creditCard" },
{ "id": 174, "name": "Ardeen Bradburne", "roomType": "classic", "checkIn": "22/7/2021", "paymentMethod": "netBanking" },
{ "id": 175, "name": "Aland Brastead", "roomType": "superdeluxe", "checkIn": "1/12/2020", "paymentMethod": "creditCard" },
{ "id": 176, "name": "Babette Magog", "roomType": "superdeluxe", "checkIn": "7/5/2021", "paymentMethod": "debitCard" },
{ "id": 177, "name": "Bill Malloy", "roomType": "classic", "checkIn": "19/5/2022", "paymentMethod": "debitCard" },
{ "id": 178, "name": "Hollie Asprey", "roomType": "suite", "checkIn": "14/11/2021", "paymentMethod": "UPI" },
{ "id": 179, "name": "Vanda Perri", "roomType": "superdeluxe", "checkIn": "5/7/2022", "paymentMethod": "creditCard" },
{ "id": 180, "name": "Sargent MacIlriach", "roomType": "premium", "checkIn": "21/2/2021", "paymentMethod": "paypal" },
{ "id": 181, "name": "Jeniece Dacke", "roomType": "premium", "checkIn": "20/12/2020", "paymentMethod": "netBanking" },
{ "id": 182, "name": "Marianna Spragge", "roomType": "premium", "checkIn": "22/10/2021", "paymentMethod": "UPI" },
{ "id": 183, "name": "Reagen Paddock", "roomType": "suite", "checkIn": "26/3/2020", "paymentMethod": "paypal" },
{ "id": 184, "name": "Tully Panther", "roomType": "superdeluxe", "checkIn": "17/5/2022", "paymentMethod": "netBanking" },
{ "id": 185, "name": "Alika Cordner", "roomType": "classic", "checkIn": "10/5/2020", "paymentMethod": "netBanking" },
{ "id": 186, "name": "Sheilah Le Conte", "roomType": "classic", "checkIn": "13/3/2021", "paymentMethod": "creditCard" },
{ "id": 187, "name": "Inga Nelsen", "roomType": "classic", "checkIn": "21/8/2020", "paymentMethod": "cash" },
{ "id": 188, "name": "Hugo Grioli", "roomType": "premium", "checkIn": "25/1/2021", "paymentMethod": "debitCard" },
{ "id": 189, "name": "Willy Letcher", "roomType": "premium", "checkIn": "2/10/2020", "paymentMethod": "cash" },
{ "id": 190, "name": "Estella Hackley", "roomType": "deluxe", "checkIn": "27/1/2021", "paymentMethod": "debitCard" },
{ "id": 191, "name": "Mendel Durrett", "roomType": "suite", "checkIn": "16/9/2021", "paymentMethod": "creditCard" },
{ "id": 192, "name": "May Caines", "roomType": "superdeluxe", "checkIn": "25/3/2021", "paymentMethod": "netBanking" },
{ "id": 193, "name": "Timoteo Matiewe", "roomType": "deluxe", "checkIn": "24/7/2021", "paymentMethod": "debitCard" },
{ "id": 194, "name": "Esra Grimbaldeston", "roomType": "classic", "checkIn": "7/8/2022", "paymentMethod": "debitCard" },
{ "id": 195, "name": "Granny Ollenbuttel", "roomType": "deluxe", "checkIn": "6/11/2021", "paymentMethod": "paypal" },
{ "id": 196, "name": "Amberly Creffield", "roomType": "superdeluxe", "checkIn": "15/4/2020", "paymentMethod": "debitCard" },
{ "id": 197, "name": "Marchelle Benge", "roomType": "classic", "checkIn": "25/11/2021", "paymentMethod": "netBanking" },
{ "id": 198, "name": "Derron Attwooll", "roomType": "classic", "checkIn": "2/6/2021", "paymentMethod": "cash" },
{ "id": 199, "name": "Katie Dunge", "roomType": "premium", "checkIn": "14/2/2022", "paymentMethod": "UPI" },
{ "id": 200, "name": "Kiah Westmore", "roomType": "suite", "checkIn": "9/4/2020", "paymentMethod": "debitCard" },
{ "id": 201, "name": "Daveen Fernandes", "roomType": "superdeluxe", "checkIn": "20/4/2022", "paymentMethod": "debitCard" },
{ "id": 202, "name": "Sisely Ioannidis", "roomType": "suite", "checkIn": "2/8/2021", "paymentMethod": "UPI" },
{ "id": 203, "name": "Hector Littlewood", "roomType": "deluxe", "checkIn": "29/12/2019", "paymentMethod": "creditCard" },
{ "id": 204, "name": "Magnum Willcock", "roomType": "suite", "checkIn": "2/9/2022", "paymentMethod": "cash" },
{ "id": 205, "name": "Tamiko Overington", "roomType": "premium", "checkIn": "7/10/2022", "paymentMethod": "debitCard" },
{ "id": 206, "name": "Anny Aulds", "roomType": "premium", "checkIn": "23/2/2020", "paymentMethod": "debitCard" },
{ "id": 207, "name": "Alvera Grocott", "roomType": "deluxe", "checkIn": "24/10/2020", "paymentMethod": "paypal" },
{ "id": 208, "name": "Franky Leeder", "roomType": "superdeluxe", "checkIn": "2/8/2020", "paymentMethod": "creditCard" },
{ "id": 209, "name": "Ilario Malzard", "roomType": "deluxe", "checkIn": "20/11/2020", "paymentMethod": "netBanking" },
{ "id": 210, "name": "Wilmer Stenner", "roomType": "premium", "checkIn": "15/3/2021", "paymentMethod": "UPI" },
{ "id": 211, "name": "Rene Saer", "roomType": "suite", "checkIn": "25/4/2021", "paymentMethod": "UPI" },
{ "id": 212, "name": "Kirstyn Storcke", "roomType": "suite", "checkIn": "6/4/2020", "paymentMethod": "paypal" },
{ "id": 213, "name": "Kristi Vereker", "roomType": "classic", "checkIn": "12/5/2020", "paymentMethod": "netBanking" },
{ "id": 214, "name": "Eugenius Witling", "roomType": "classic", "checkIn": "21/5/2021", "paymentMethod": "cash" },
{ "id": 215, "name": "Lay Patullo", "roomType": "classic", "checkIn": "5/8/2022", "paymentMethod": "creditCard" },
{ "id": 216, "name": "Guglielmo Espada", "roomType": "classic", "checkIn": "21/3/2020", "paymentMethod": "debitCard" },
{ "id": 217, "name": "Albertine Turbayne", "roomType": "classic", "checkIn": "17/12/2021", "paymentMethod": "paypal" },
{ "id": 218, "name": "Grannie Shorten", "roomType": "superdeluxe", "checkIn": "8/6/2022", "paymentMethod": "netBanking" },
{ "id": 219, "name": "Giacopo Ciric", "roomType": "deluxe", "checkIn": "21/5/2021", "paymentMethod": "creditCard" },
{ "id": 220, "name": "Judah Maren", "roomType": "deluxe", "checkIn": "30/5/2022", "paymentMethod": "UPI" },
{ "id": 221, "name": "Rebekah Toffolini", "roomType": "premium", "checkIn": "31/3/2021", "paymentMethod": "paypal" },
{ "id": 222, "name": "Wallis Durrington", "roomType": "premium", "checkIn": "2/5/2021", "paymentMethod": "netBanking" },
{ "id": 223, "name": "Dean Ayllett", "roomType": "suite", "checkIn": "12/10/2021", "paymentMethod": "paypal" },
{ "id": 224, "name": "Angy Dutteridge", "roomType": "suite", "checkIn": "15/10/2020", "paymentMethod": "UPI" },
{ "id": 225, "name": "Felizio Ferroni", "roomType": "premium", "checkIn": "12/10/2021", "paymentMethod": "cash" },
{ "id": 226, "name": "Carl Masdon", "roomType": "suite", "checkIn": "12/8/2020", "paymentMethod": "debitCard" },
{ "id": 227, "name": "Riva Vany", "roomType": "deluxe", "checkIn": "10/5/2020", "paymentMethod": "debitCard" },
{ "id": 228, "name": "Glory Wellbelove", "roomType": "premium", "checkIn": "8/7/2021", "paymentMethod": "cash" },
{ "id": 229, "name": "Woody Phillipps", "roomType": "deluxe", "checkIn": "27/11/2021", "paymentMethod": "creditCard" },
{ "id": 230, "name": "Pru Derbyshire", "roomType": "classic", "checkIn": "20/8/2020", "paymentMethod": "netBanking" },
{ "id": 231, "name": "Cole Pigford", "roomType": "premium", "checkIn": "31/5/2022", "paymentMethod": "netBanking" },
{ "id": 232, "name": "Micheil Hambly", "roomType": "classic", "checkIn": "16/1/2020", "paymentMethod": "creditCard" },
{ "id": 233, "name": "Mateo Lawton", "roomType": "deluxe", "checkIn": "2/7/2022", "paymentMethod": "cash" },
{ "id": 234, "name": "Mose Connock", "roomType": "classic", "checkIn": "19/5/2020", "paymentMethod": "UPI" },
{ "id": 235, "name": "Correna Weldrick", "roomType": "superdeluxe", "checkIn": "29/1/2020", "paymentMethod": "netBanking" },
{ "id": 236, "name": "Ramonda Lornsen", "roomType": "superdeluxe", "checkIn": "15/7/2020", "paymentMethod": "creditCard" },
{ "id": 237, "name": "Daniel Birden", "roomType": "deluxe", "checkIn": "5/11/2021", "paymentMethod": "cash" },
{ "id": 238, "name": "Christiana Somes", "roomType": "superdeluxe", "checkIn": "5/10/2022", "paymentMethod": "netBanking" },
{ "id": 239, "name": "Netti Yitzhak", "roomType": "deluxe", "checkIn": "16/5/2020", "paymentMethod": "netBanking" },
{ "id": 240, "name": "Norrie Harvison", "roomType": "premium", "checkIn": "19/9/2020", "paymentMethod": "cash" },
{ "id": 241, "name": "Allister Bockings", "roomType": "superdeluxe", "checkIn": "13/6/2020", "paymentMethod": "debitCard" },
{ "id": 242, "name": "Ferguson Chazotte", "roomType": "superdeluxe", "checkIn": "30/9/2022", "paymentMethod": "paypal" },
{ "id": 243, "name": "Phaidra Redmond", "roomType": "deluxe", "checkIn": "2/12/2021", "paymentMethod": "debitCard" },
{ "id": 244, "name": "Giavani Krauss", "roomType": "deluxe", "checkIn": "23/12/2020", "paymentMethod": "cash" },
{ "id": 245, "name": "Gerhard Struttman", "roomType": "classic", "checkIn": "13/6/2022", "paymentMethod": "creditCard" },
{ "id": 246, "name": "Sully Tadlow", "roomType": "classic", "checkIn": "19/12/2020", "paymentMethod": "creditCard" },
{ "id": 247, "name": "Kassia Dumbellow", "roomType": "deluxe", "checkIn": "27/7/2020", "paymentMethod": "cash" },
{ "id": 248, "name": "Keir Sebborn", "roomType": "classic", "checkIn": "26/11/2020", "paymentMethod": "creditCard" },
{ "id": 249, "name": "August Crosthwaite", "roomType": "deluxe", "checkIn": "1/10/2022", "paymentMethod": "UPI" },
{ "id": 250, "name": "Sax Dockrell", "roomType": "premium", "checkIn": "28/11/2020", "paymentMethod": "debitCard" }]

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
      data: mockData
    }
  };
};
