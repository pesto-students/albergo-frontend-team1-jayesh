import Link from 'next/link';
import sectionStyles from '../../../styles/Homescreen/BlogSection.module.scss';
import BlogCard from '../../Card/BlogCard';

const BlogSection = ({ title }: { title: string }) => {
  return (
    <div className={sectionStyles.container}>
      <h3>{title}</h3>
      <hr className={sectionStyles.divider} />
      <div className={sectionStyles.cardContainer}>
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <BlogCard key={index} />
          ))}
      </div>
      <div className={sectionStyles.viewAllBlogLinkContainer}>
        <Link href="">
          <a className={sectionStyles.viewLink}>View All Blogs</a>
        </Link>
      </div>
    </div>
  );
};

export default BlogSection;
