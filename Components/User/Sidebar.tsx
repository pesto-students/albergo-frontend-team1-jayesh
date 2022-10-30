import Image from 'next/image';
import sidebarStyles from '../../styles/Components/UserProfile/sidebar.module.scss';

const UserProfileSidebar = () => {
  return (
    <div className={sidebarStyles.sidebar}>
      <div className={sidebarStyles.userLogoContainer}>
        <Image
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          layout="fill"
          objectFit="cover"
          alt="user-logo"
        />
      </div>
      <button>Change profile Picture</button>
      <h4>About</h4>
      <small>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit
        molestiae inventore dignissimos impedit consequatur tenetur doloribus ut
        iure labore ratione veritatis beatae, tempora ducimus? Laboriosam
        officia quos repellendus sit vitae!
      </small>
      <h5>Jane Doe</h5>
      <p>
        <span className="material-symbols-outlined">check</span>
        Email verification
      </p>
      <p>
        <span className="material-symbols-outlined">check</span>
        Mobile verification
      </p>
    </div>
  );
};

export default UserProfileSidebar;
