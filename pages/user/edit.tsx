import editStyles from '../../styles/User/edit.module.scss';
import Layout from '../../Components/Layout/Layout';
import UserProfileSidebar from '../../Components/User/Sidebar';

const UserProfileEdit = () => {
  return (
    <Layout>
      <div className={editStyles.container}>
        <UserProfileSidebar />
        <div className={editStyles.content}>
          <h3>Hello, Jane Doe</h3>
          <small>Joined in Aug, 2021</small>
          <hr />
          <form>
            <div className={editStyles.formGroup}>
              <label htmlFor="inpEmail">Email</label>
              <input type="email" name="inpEmail" id="inpEmail" />
            </div>
            <div className={editStyles.formGroup}>
              <label htmlFor="inpPhone">Phone</label>
              <input type="tel" name="inpPhone" id="inpPhone" />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfileEdit;
