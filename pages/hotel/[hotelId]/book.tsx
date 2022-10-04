import Link from 'next/link';
import Layout from '../../../Components/Layout/Layout';
import registerStyles from '../../../styles/Hotel/book.module.scss';

const HotelSlugBook = () => {
  return (
    <Layout>
      <div className={registerStyles.container}>
        <div className={registerStyles.content}>
          <div className={registerStyles.header}>
            <Link href="/hotel/a">
              <a>
                <h3>Al burg Hotel</h3>
              </a>
            </Link>
          </div>
        </div>
        <div className={registerStyles.sideContent}></div>
      </div>
    </Layout>
  );
};

export default HotelSlugBook;
