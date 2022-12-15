import Image from 'next/image';
import styles from '../../styles/Components/Card/BlogCard.module.scss';

const BlogCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={
            'https://images.unsplash.com/photo-1663706532601-60130a7bbb74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
          }
          layout="fill"
          objectFit="cover"
          alt="image"
        />
        {/* <IconButton className={cardStyles.likeBtn}>
          <Favorite className={cardStyles.likeIcon} />
        </IconButton> */}
      </div>
      <div className={styles.cardContent}>
        <h5>How to write a better blog!</h5>
        <p>Blog short desc</p>
      </div>
    </div>
  );
};

export default BlogCard;
