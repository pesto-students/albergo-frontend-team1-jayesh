import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { useAppSelector } from '../../redux/hooks';
import {
  setNavModalType,
  toggleNavModal
} from '../../redux/navModal/modal.slice';
import store from '../../redux/store';
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
    }
  ];

  const AuthLinks = () => {
    return (
      <Fragment>
        <li>
          <Link
            href={
              userToken && userToken.role === 'User'
                ? '/user'
                : '/partner/dashboard'
            }
          >
            <a>
              {userToken && userToken.role === 'User'
                ? 'profile'
                : 'dashboard'}
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
            AuthLinks()
          ) : (
            <Fragment>
              <li>
                <button
                  onClick={() => {
                    store.dispatch(setNavModalType('signup'));
                    store.dispatch(toggleNavModal());
                  }}
                >
                  Sign up
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    store.dispatch(setNavModalType('login'));
                    store.dispatch(toggleNavModal());
                  }}
                >
                  Login
                </button>
              </li>
            </Fragment>
          )}
        </ul>
        <ul>
          {centralLinks.map((link, index) => (
            <li key={index}>
              <Link href={link.link}>
                <a>{link.name}</a>
              </Link>
            </li>
          ))}
        </ul>
        <ul>
          {userToken && userToken.role === 'User' && (
            <li>
              <Link href="/partner">
                <a className={styles.partnerBtn}>Become a partner</a>
              </Link>
            </li>
          )}
          <li>
            <div className={styles.optionMenu}>
              <input type="checkbox" name="optionMenu" id="optionMenu" />
              <label htmlFor="optionMenu">
                <MaterialIcon iconName="menu" />
                <MaterialIcon iconName="account_circle" />
              </label>
              <ul className={styles.optionMenuList}>
                {userToken ? (
                  <Fragment>
                    <li>
                      <Link
                        href={
                          userToken && userToken.role === 'User'
                            ? '/user'
                            : '/partner/dashboard'
                        }
                      >
                        <a>
                          {userToken && userToken.role === 'User'
                            ? 'profile'
                            : 'dashboard'}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <button onClick={() => logout(router)}>Logout</button>
                    </li>
                  </Fragment>
                ) : (
                  <Fragment>
                    <li>
                      <button
                        onClick={() => {
                          store.dispatch(setNavModalType('signup'));
                          store.dispatch(toggleNavModal());
                        }}
                      >
                        Sign up
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          store.dispatch(setNavModalType('login'));
                          store.dispatch(toggleNavModal());
                        }}
                      >
                        Login
                      </button>
                    </li>
                  </Fragment>
                )}
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Navbar;
