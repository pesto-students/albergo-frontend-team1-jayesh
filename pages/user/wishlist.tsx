import Image from 'next/image';
import Layout from '../../Components/Layout/Layout';
import wishlistStyles from '../../styles/User/wishlist.module.scss';
import { MaterialIcon } from '../../Utils/Helper';

const Wishlist = () => {
  return (
    <Layout>
      <div className={wishlistStyles.container}>
        <h1>Wishlist</h1>
        <div className={wishlistStyles.cardContainer}>
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <div key={index} className={wishlistStyles.card}>
                <div className={wishlistStyles.cardImage}>
                  <Image
                    src="https://images.unsplash.com/photo-1664977243435-c17c474465e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                    layout="fill"
                    objectFit="cover"
                    alt="hotel-image"
                  />
                </div>
                <button>{MaterialIcon('close')}</button>
                <div className={wishlistStyles.cardContent}>
                  <h5>Al burj hotel</h5>
                  <p>100, krishna nagar, Delhi</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};