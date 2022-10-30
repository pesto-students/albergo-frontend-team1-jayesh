import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import styles from '../../../styles/Homescreen/Banner.module.scss';
import DateRangePicker from '../../DateRangePicker/DateRangePicker';

const Banner = () => {
  const destinationInpRef = useRef<HTMLInputElement>(null);
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const router = useRouter()

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const destination = destinationInpRef.current?.value;
    if (destination) {
      router.push({
        pathname: '/search',
        query: {
          destination,
          checkInDate: checkInDate?.toDateString()
        }
      })
    }
  };

  const disableBtn = !destinationInpRef.current?.value || !checkInDate;

  return (
    <div className={styles.container}>
      <form onSubmit={formSubmitHandler}>
        <input
          type="text"
          placeholder="Where are you going?"
          id="destination"
          ref={destinationInpRef}
        />
        <DateRangePicker
          onChange={(val) => setCheckInDate(val)}
        />
        <button type="submit" disabled={disableBtn} >Search</button>
      </form>
      <div className={styles.imageContainer}>
        <Image
          src={'/assets/images/home/banner.jpg'}
          alt="banner"
          layout="fill"
          objectFit="cover"
          objectPosition="bottom"
          priority={true}
        />
      </div>
    </div>
  );
};

export default Banner;
