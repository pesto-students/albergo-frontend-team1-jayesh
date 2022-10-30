import Image from 'next/image';
import Link from 'next/link';
import styles from '../../../styles/Homescreen/SectionPartnerTypeOne.module.scss';

const SectionPartnerTypeOne = ({ title }: { title: string }) => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.content}>
          <h2>{title}</h2>
          <p>Earn extra just by connecting your hotel...</p>
          <Link href="/partner">
            <a>Become a Partner</a>
          </Link>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={
              '/assets/images/sectionPartnerOne/sectionPartnerOne.jpeg'
            }
            layout="fill"
            objectFit="cover"
            alt="Partner with us"
          />
        </div>
      </div>
    </div>
  );
};

export default SectionPartnerTypeOne;
