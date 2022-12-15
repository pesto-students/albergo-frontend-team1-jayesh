import Link from 'next/link';
import styles from '../../../styles/Homescreen/BlogSection.module.scss';
import BlogCard from '../../Card/BlogCard';

const BlogSection = ({ title }: { title: string }) => {
  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <hr className={styles.divider} />
      <div className={styles.cardContainer}>
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <BlogCard key={index} />
          ))}
      </div>
      <div className={styles.viewAllBlogLinkContainer}>
        <Link href="">
          <a className={styles.viewLink}>View All Blogs</a>
        </Link>
      </div>
    </div>
  );
};

export default BlogSection;
