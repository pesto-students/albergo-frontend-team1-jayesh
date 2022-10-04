import Link from 'next/link';
import Layout from '../../../Components/Layout/Layout';
import registerStyles from '../../../styles/Hotel/register.module.scss';

const HotelSlugRegister = () => {
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
          <form>
            <div className={registerStyles.formGroup}>
              <div className={registerStyles.inpContainer}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" />
              </div>
              <div className={registerStyles.inpContainer}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" />
              </div>
            </div>
          </form>
        </div>
        <div className={registerStyles.sideContent}></div>
      </div>
    </Layout>
  );
};

export default HotelSlugRegister;
