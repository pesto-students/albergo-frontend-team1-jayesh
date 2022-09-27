import Image from 'next/image';
import Link from 'next/link';
import sectionStyles from '../../../styles/Homescreen/SectionPartnerTypeTwo.module.scss';

const SectionPartnerTypeTwo = () => {
  return (
    <div className={sectionStyles.container}>
      <div className={sectionStyles.innerContainer}>
        <div className={sectionStyles.content}>
          <h2>Discover More About Becoming Partner</h2>
          <hr className={sectionStyles.divider} />
          <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga.
          </p>
          <div className={sectionStyles.ctaContainer}>
            <Link href={''}>
              <a>Ask a Question</a>
            </Link>
            <Link href={''}>
              <a>Sign up</a>
            </Link>
          </div>
          <Link href={''}>
            <a className={sectionStyles.discoverMoreLink}>Discover More</a>
          </Link>
        </div>
        <div className={sectionStyles.imageContainer}>
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
