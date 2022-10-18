import Image from 'next/image';
import { useRef, useState } from 'react';
import bannerStyles from '../../../styles/Homescreen/Banner.module.scss';
import DateRangePicker from '../../DateRangePicker/DateRangePicker';

const Banner = () => {
  const destinationInpRef = useRef<HTMLInputElement>(null);
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const destination = destinationInpRef.current?.value;
    console.log(destination, checkInDate);
  };

  return (
    <div className={bannerStyles.container}>
      <form onSubmit={formSubmitHandler}>
        <div className={bannerStyles.inpContainer}>
          <label htmlFor="destination">destination</label>
          <input
            type="text"
            placeholder="Where are you going?"
            id="destination"
            ref={destinationInpRef}
          />
        </div>
        <DateRangePicker
          onChange={(val) => setCheckInDate(val)}
          placeholder="Checkin Date"
        />
        <button type="submit">Search</button>
      </form>
      <div className={bannerStyles.imageContainer}>
        <Image
          src={'/assets/img/unsplash.jpg'}
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
