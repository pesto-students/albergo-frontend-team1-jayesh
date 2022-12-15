import styles from '../../styles/Components/Newsletter/Newsletter.module.scss';
import { MaterialIcon } from '../../Utils/Helper';

const Newsletter = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.content}>
          <h5>newsletter</h5>
          <p>Stay up to date</p>
        </div>
        <form>
          <input type="email" placeholder="john@doe.com" />
          <button type="submit">
            <MaterialIcon iconName="send" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
