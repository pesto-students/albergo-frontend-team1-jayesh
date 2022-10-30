import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { useAppSelector } from '../../redux/hooks';
import styles from '../../styles/Components/Navbar/Navbar.module.scss';
import { logout, parseJWT } from '../../Utils/auth/authHelper';
import { MaterialIcon } from '../../Utils/Helper';

const Navbar = () => {
  const router = useRouter();

  const userToken = parseJWT(
    useAppSelector((state) => state.user.userEncryptedToken)
  );

  const centralLinks = [
    {
      name: 'Search',
      icon: 'search',
      link: '/search'
    },
    {
      name: 'explore',
      icon: 'explore',
      link: '/explore'
    }
  ];

  const AuthLinks = (user: { name: string }) => {
    return (
      <Fragment>
        <li>
          <Link href={'/user'}>
            <a>
              <MaterialIcon iconName="person" />
              {user.name}
            </a>
          </Link>
        </li>
        <li>
          <button onClick={() => logout(router)}>Logout</button>
        </li>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <nav className={styles.nav}>
        <Link href="/">
          <a>
            <h2>Albergo</h2>
          </a>
        </Link>
        <button
          className={styles.menuBtn}
          onClick={() => {
            const menu = document.getElementById('mobileMenu');
            menu?.classList.toggle(styles.menuOpen);
          }}
        >
          <MaterialIcon iconName="menu" />
        </button>
        <ul className={styles.menu} id={'mobileMenu'}>
          {centralLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.link}>
                <a>
                  <MaterialIcon iconName={link.icon} />
                  {link.name}
                </a>
              </Link>
            </li>
          ))}
          {userToken ? (
            AuthLinks(userToken)
          ) : (
            <Fragment>
              <li>
                <Link href="/partner">
                  <a className={styles.partnerBtn}>Become a partner</a>
                </Link>
              </li>
              <li>
                <Link href={'/auth'}>
                  <a>
                    <MaterialIcon iconName="person" />
                    Login
                  </a>
                </Link>
              </li>
            </Fragment>
          )}
        </ul>
        <ul>
          {centralLinks.map((link, index) => (
            <li key={index}>
              <Link href={link.link}>
                <a>
                  <MaterialIcon iconName={link.icon} />
                  {link.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <ul>
          {userToken ? (
            AuthLinks(userToken)
          ) : (
            <Fragment>
              <li>
                <Link href="/partner">
                  <a className={styles.partnerBtn}>Become a partner</a>
                </Link>
              </li>
              <li>
                <Link href={'/login'}>
                  <a>login</a>
                </Link>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
    </Fragment>
  );
};

export default Navbar;
