import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../../styles/Homescreen/Banner.module.scss";

const Banner = () => {
  const [destinationQuery, setDestinationQuery] = useState("");
  const router = useRouter();

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (destinationQuery) {
      router.push(
        {
          pathname: "/search",
          query: {
            destination: destinationQuery,
          },
        }
      );
    }
  };

  const disableBtn = !destinationQuery;

  return (
    <div className={styles.container}>
      <form onSubmit={formSubmitHandler}>
        <input
          type="text"
          placeholder="favourite city"
          id="destination"
          value={destinationQuery}
          onChange={e => setDestinationQuery(e.target.value)}
          required
        />
        <button type="submit" disabled={disableBtn}>
          Search
        </button>
      </form>
      <div className={styles.imageContainer}>
        <Image
          src={"/assets/images/home/banner.jpg"}
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
