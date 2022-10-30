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
            {/* <Link href={''}>
              <a>Ask a Question</a>
            </Link> */}
            <Link href={'/partner/signup'}>
              <a>Sign up</a>
            </Link>
          </div>
          <Link href={'/partner'}>
            <a className={styles.discoverMoreLink}>Discover More</a>
          </Link>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={
              "/assets/images/sectionPartnerTwo/sectionPartnerTwo.jpg"
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
