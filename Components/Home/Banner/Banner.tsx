import Image from "next/image";
import { useRouter } from "next/router";
import { useRef } from "react";
import styles from "../../../styles/Homescreen/Banner.module.scss";

const Banner = () => {
  const destinationInpRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const destination = destinationInpRef.current?.value;
    if (destination) {
      router.push(
        {
          pathname: "/search",
          query: {
            destination,
          },
        },
        "/search"
      );
    }
  };

  const disableBtn = !destinationInpRef.current?.value;

  return (
    <div className={styles.container}>
      <form onSubmit={formSubmitHandler}>
        <input
          type="text"
          placeholder="Where are you going?"
          id="destination"
          ref={destinationInpRef}
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
