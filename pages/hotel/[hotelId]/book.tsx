import Link from 'next/link';
import Layout from '../../../Components/Layout/Layout';
import styles from '../../../styles/Hotel/book.module.scss';

const HotelSlugBook = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <Link href="/hotel/a">
              <a>
                <h3>Al burg Hotel</h3>
              </a>
            </Link>
          </div>
        </div>
        <div className={styles.sideContent}></div>
      </div>
    </Layout>
  );
};

export default HotelSlugBook;
