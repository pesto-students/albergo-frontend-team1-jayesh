import { ReactNode } from 'react';
import styles from '../../styles/Components/Layout/Layout.module.scss';

const Layout = ({ children }: { children: ReactNode }) => {
  return <div className={styles.layoutContainer}>{children}</div>;
};

export default Layout;
