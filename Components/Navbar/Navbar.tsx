import Link from 'next/link';
import { Fragment } from 'react';
import { useAppSelector } from '../../redux/hooks';
import navStyles from '../../styles/Components/Navbar/Navbar.module.scss';
import { parseJWT } from '../../Utils/auth/authHelper';
import { MaterialIcon } from '../../Utils/Helper';

const Navbar = () => {
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
          <Link href={'/user/favourite'}>
            <a>
              {MaterialIcon('favorite')}
              Favourites
            </a>
          </Link>
        </li>
        <li>
          <Link href={'/user'}>
            <a>
              {MaterialIcon('person')}
              {user.name}
            </a>
          </Link>
        </li>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <nav className={navStyles.nav}>
        <Link href="/">
          <a>
            <h2>Albergo</h2>
          </a>
        </Link>
        <ul>
          {centralLinks.map((link, index) => (
            <li key={index}>
              <Link href={link.link}>
                <a>
                  {MaterialIcon(link.icon)}
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
                  <a className={navStyles.partnerBtn}>Become a partner</a>
                </Link>
              </li>
              <li>
                <Link href={'/login'}>
                  <a>
                    {MaterialIcon('login')}
                    login
                  </a>
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
