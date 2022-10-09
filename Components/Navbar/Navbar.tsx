import Link from 'next/link';
import { Fragment } from 'react';
import navStyles from '../../styles/Components/Navbar/Navbar.module.scss';

const Navbar = () => {
  const toggleNavMenu = () => {
    const menu = document.getElementById('menu');
    menu?.classList.toggle(navStyles.active);
  };

  return (
    <Fragment>
      <nav className={navStyles.nav}>
        <Link href="/">
          <a>
            <h2>Albergo</h2>
          </a>
        </Link>
        <ul className={navStyles.navLinks}>
          <li>
            <Link href="/search">
              <a>Find a hotel</a>
            </Link>
          </li>
          <li>
            <Link href="/blogs">
              <a>Stories</a>
            </Link>
          </li>
        </ul>
        <ul className={navStyles.actionsContainer}>
          <li>
            <Link href="/becomePartner">
              <a className={navStyles.partnerBtn}>Become a partner</a>
            </Link>
          </li>
          <li>
            <button>Login</button>
          </li>
        </ul>
        <button className={navStyles.navBtn} onClick={toggleNavMenu}>
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className={navStyles.menu} id="menu" onClick={toggleNavMenu}>
          <h1>hello</h1>
          <h1>hello</h1>
          <h1>hello</h1>
          <h1>hello</h1>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
