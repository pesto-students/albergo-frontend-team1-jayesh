import Image from 'next/image';
import Link from 'next/link';
import styles from '../../../styles/Homescreen/SectionPartnerTypeTwo.module.scss';

const SectionPartnerTypeTwo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.content}>
          <h2>Discover More About Becoming Partner</h2>
          <hr className={styles.divider} />
          <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga.
          </p>
          <div className={styles.ctaContainer}>
            <Link href={''}>
              <a>Ask a Question</a>
            </Link>
            <Link href={''}>
              <a>Sign up</a>
            </Link>
          </div>
          <Link href={''}>
            <a className={styles.discoverMoreLink}>Discover More</a>
          </Link>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={
              'https://images.unsplash.com/photo-1663772620360-1c344ad2336e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
            }
            layout="fill"
            objectFit="cover"
            alt="partner"
          />
        </div>
      </div>
    </div>
  );
};

export default SectionPartnerTypeTwo;
