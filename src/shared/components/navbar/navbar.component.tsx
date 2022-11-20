import classNames from 'classnames';
import { RiShoppingBasketLine, RiUserLine } from 'react-icons/ri';

import ROUTES from 'core/constants/routes.constant';
import { useBreakpointContext } from 'core/contexts/breakpoint/breakpoint.context';
import { useNavbarContext } from 'core/contexts/navbar/navbar.context';
import { useUserContext } from 'core/contexts/user/user.context';

import AuthDropdownComponent from 'features/auth/components/auth-dropdown/auth-dropdown.component';
import OrderDropdownComponent from 'features/order/components/order-dropdown/order-dropdown.component';
import OrderTotalBadgeComponent from 'features/order/components/order-total-badge/order-total-badge.component';

import ButtonLinkComponent from '../button-link/button-link.component';
import MobileNavButtonComponent from '../mobile-nav-button/mobile-nav-button.component';
import NavbarLinksComponent from '../navbar-links/navbar-links.component';
import styles from './navbar.module.scss';

export default function NavbarComponent(): JSX.Element {
  const { isMobile } = useBreakpointContext();
  const { showNavbar, closeNavbar } = useNavbarContext();
  const { userEmail, isAuthenticatedUser, signOut } = useUserContext();

  function handleUserItemList(): JSX.Element {
    if (isMobile) {
      return (
        <>
          <ButtonLinkComponent
            elementType="button"
            visualType="button"
            appearance="round"
            color="transparent"
            styleClasses="u-display-flex u-border-width-1 u-cursor-initial"
            type="button"
          >
            <RiUserLine className="u-flex-shrink-0" size={20} />
          </ButtonLinkComponent>
          <div className="u-display-flex u-flex-align-items-center u-ml-5">
            {userEmail}
            <span className="u-mx-5">|</span>
            <ButtonLinkComponent
              elementType="button"
              visualType="button"
              color="transparent"
              type="button"
              onClick={() => {
                signOut();
                closeNavbar();
              }}
            >
              Sair
            </ButtonLinkComponent>
          </div>
        </>
      );
    }

    return <AuthDropdownComponent userEmail={userEmail} signOut={signOut} />;
  }

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
        <NavbarLinksComponent routes={ROUTES} />
        <ul className={styles['c-navbar__list']}>
          <li
            className={classNames({
              'u-display-flex': isMobile && isAuthenticatedUser,
              'u-flex-align-items-center': isMobile && isAuthenticatedUser,
            })}
          >
            {!isAuthenticatedUser ? (
              <ButtonLinkComponent
                elementType="link"
                visualType="button"
                appearance="round"
                color="transparent"
                hoverColor="primary"
                mobileLabel="Conta"
                styleClasses="u-display-flex u-border-width-1"
                to="auth/signin"
              >
                <RiUserLine className="u-flex-shrink-0" size={20} />
              </ButtonLinkComponent>
            ) : (
              handleUserItemList()
            )}
          </li>
          <li>
            {isMobile ? (
              <ButtonLinkComponent
                elementType="link"
                visualType="button"
                appearance="round"
                color="transparent"
                hoverColor="primary"
                mobileLabel="Pedidos"
                styleClasses="u-display-flex u-border-width-1"
                to="order/checkout"
                onClick={closeNavbar}
              >
                <RiShoppingBasketLine className="u-flex-shrink-0" size={20} />
                <OrderTotalBadgeComponent />
              </ButtonLinkComponent>
            ) : (
              <OrderDropdownComponent />
            )}
          </li>
        </ul>
      </div>
      {isMobile && <MobileNavButtonComponent />}
    </>
  );
}
