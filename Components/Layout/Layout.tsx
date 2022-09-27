import layoutStyles from '../../styles/Components/Layout/Layout.module.scss';

const Layout = ({ children }: { children: any }) => {
  return <div className={layoutStyles.layoutContainer}>{children}</div>;
};

export default Layout;
