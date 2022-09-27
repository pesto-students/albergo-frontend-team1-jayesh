import Image from 'next/image';
import Link from 'next/link';
import sectionStyles from '../../../styles/Homescreen/SectionPartnerTypeOne.module.scss';

const SectionPartnerTypeOne = ({ title }: { title: string }) => {
  return (
    <div className={sectionStyles.container}>
      <div className={sectionStyles.innerContainer}>
        <div className={sectionStyles.content}>
          <h2>{title}</h2>
          <p>Earn extra just by connecting your hotel...</p>
          <Link href="">
            <a>Become a Partner</a>
          </Link>
        </div>
        <div className={sectionStyles.imageContainer}>
          <Image
            src={
              'https://images.unsplash.com/photo-1662996790713-9d8f013e3e0f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
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
