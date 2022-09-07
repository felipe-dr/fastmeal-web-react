import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { useNavbarContext } from 'core/contexts/navbar/navbar.context';

import { NavbarLinksProps } from './interfaces/navbar-links.interface';
import styles from './navbar-links.module.scss';

export default function NavbarLinksComponent({
  styleClasses,
  routes,
}: NavbarLinksProps): JSX.Element {
  const { closeNavbar } = useNavbarContext();

  return (
    <nav
      className={classNames({
        [styles['c-navbar-links']]: true,
        [`${styleClasses}`]: styleClasses !== undefined,
      })}
    >
      <ul className={styles['c-navbar-links__list']}>
        {routes.map((route, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            <NavLink
              className={({ isActive }) =>
                classNames({
                  [styles['c-navbar-links__link--active']]: isActive,
                  [styles['c-navbar-links__link']]: true,
                })
              }
              to={route.path}
              onClick={closeNavbar}
            >
              {route.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
