import Link from 'next/link';
import styles from '../../styles/Components/Footer/Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footerLayout}>
      <div className={styles.content}>
        <div className={styles.col1}>
          <h2>Albergo</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            condimentum, nisl ut aliquam lacinia, nisl nisl aliquet nisl, nec
            aliquet nisl nisl sit amet lorem. Sed euismod, nisl ut aliquam
            lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl sit amet
            lorem.
          </p>
        </div>
        <div className={styles.col2}>
          <ul>
            <li>
              <h5>Company</h5>
            </li>
            <li>
              <Link href="">
                <a>About us</a>
              </Link>
            </li>
            <li>
              <Link href="">
                <a>Legal Information</a>
              </Link>
            </li>
            <li>
              <Link href="">
                <a>Contact us</a>
              </Link>
            </li>
            <li>
              <Link href="">
                <a>Blogs</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.col3}>
          <ul>
            <li>
              <h5>Help Center</h5>
            </li>
            <li>
              <Link href="">
                <a>Find a stay</a>
              </Link>
            </li>
            <li>
              <Link href="">
                <a>How to partner</a>
              </Link>
            </li>
            <li>
              <Link href="">
                <a>Why us</a>
              </Link>
            </li>
            <li>
              <Link href="">
                <a>FAQs</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.col4}>
          <ul>
            <li>
              <h5>Contact Information</h5>
            </li>
            <li>
              <a href="tel:+">Phone : 1234567890</a>
            </li>
            <li>
              <a href="mailto:">Email : company@mail.com</a>
            </li>
            <li>
              <p>Location : 100 some street, Mumbai.</p>
            </li>
          </ul>
        </div>
      </div>
      <p>&copy; 2022 All Rights Reserved. Designed by </p>
    </footer>
  );
};

export default Footer;
