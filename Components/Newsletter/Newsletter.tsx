import newsletterStyles from '../../styles/Components/Newsletter/Newsletter.module.scss';

const Newsletter = () => {
  return (
    <div className={newsletterStyles.container}>
      <div className={newsletterStyles.innerContainer}>
        <div className={newsletterStyles.content}>
          <h5>newsletter</h5>
          <p>Stay up to date</p>
        </div>
        <form>
          <input type="email" placeholder="john@doe.com" />
          <button type="submit">
            <span className="material-symbols-outlined">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
