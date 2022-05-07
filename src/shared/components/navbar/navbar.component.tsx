import classNames from 'classnames';
import { RiShoppingBasketLine, RiUserLine } from 'react-icons/ri';

import ROUTES from 'core/constants/routes';
import { useBreakpointContext } from 'core/contexts/breakpoint/breakpoint.context';
import { useNavbarContext } from 'core/contexts/navbar/navbar.context';

import MobileNavButton from '../mobile-nav-button/mobile-nav-button.component';
import NavbarLinks from '../navbar-links/navbar-links.component';
import RoundedLink from '../rounded-link/rounded-link.component';
import styles from './navbar.module.scss';

export default function Navbar(): JSX.Element {
  const { isMobile } = useBreakpointContext();
  const { showNavbar } = useNavbarContext();

  return (
    <>
      <div
        className={classNames({
          [styles['c-navbar']]: true,
          [styles['c-navbar__mobile']]: isMobile,
          [styles['c-navbar__mobile--active']]: showNavbar,
          [styles['c-navbar__desktop']]: !isMobile,
        })}
      >
        <NavbarLinks routes={ROUTES} />
        <ul className={styles['c-navbar__list']}>
          <li>
            <RoundedLink linkPath="/auth" linkLabel="Conta">
              <RiUserLine
                className="u-flex-shrink-0 u-mr-5 u-mr-md-0"
                size={20}
              />
            </RoundedLink>
          </li>
          <li>
            <RoundedLink linkPath="/cart" linkLabel="Pedidos">
              <RiShoppingBasketLine
                className="u-flex-shrink-0 u-mr-5 u-mr-md-0"
                size={20}
              />
            </RoundedLink>
          </li>
        </ul>
      </div>
      {isMobile && <MobileNavButton />}
    </>
  );
}
