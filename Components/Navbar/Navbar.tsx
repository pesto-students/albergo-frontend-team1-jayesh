import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { setNavModalType } from '../../redux/navModal/modal.slice';
import store from '../../redux/store';
import styles from '../../styles/Components/Navbar/Navbar.module.scss';
import { logout, parseJWT } from '../../Utils/auth/authHelper';
import { MaterialIcon } from '../../Utils/Helper';

const Navbar = () => {

  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const optionMenu = document.getElementById("optionMenu") as HTMLInputElement;
      if (optionMenu.checked! && el.id !== ("optionMenu" || "authBtns")) {
        optionMenu.checked = false;
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, []);

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
              userToken && userToken.role === 'USER'
                ? '/user'
                : '/partner/dashboard'
            }
          >
            <a>
              {userToken && userToken.role === 'USER'
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
                  }}
                >
                  Sign up
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    store.dispatch(setNavModalType('login'));
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
          {!userToken && (
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
              <ul className={styles.optionMenuList} id="optionMenu" >
                {userToken ? (
                  <Fragment>
                    <li id='authBtns'>
                      <Link
                        href={
                          userToken && userToken.role === 'USER'
                            ? '/user'
                            : '/partner/dashboard'
                        }
                      >
                        <a>
                          {userToken && userToken.role === 'USER'
                            ? 'profile'
                            : 'dashboard'}
                        </a>
                      </Link>
                    </li>
                    <li id='authBtns' >
                      <button onClick={() => logout(router)}>Logout</button>
                    </li>
                  </Fragment>
                ) : (
                  <Fragment>
                    <li id='authBtns'>
                      <button
                        onClick={() => {
                          store.dispatch(setNavModalType('signup'));
                        }}
                      >
                        Sign up
                      </button>
                    </li>
                    <li id='authBtns'>
                      <button
                        onClick={() => {
                          store.dispatch(setNavModalType('login'));
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
