import classNames from 'classnames';
import {
  RiLogoutCircleRLine,
  RiMailLine,
  RiShoppingBasketLine,
  RiUserLine,
} from 'react-icons/ri';

import ROUTES from 'core/constants/routes.constant';
import { useBreakpointContext } from 'core/contexts/breakpoint/breakpoint.context';
import { useNavbarContext } from 'core/contexts/navbar/navbar.context';
import { useUserContext } from 'core/contexts/user/user.context';

import ButtonLinkComponent from '../button-link/button-link.component';
import DropdownComponent from '../dropdown/dropdown.component';
import { DropdownItem } from '../dropdown/interfaces/dropdown.interface';
import MobileNavButtonComponent from '../mobile-nav-button/mobile-nav-button.component';
import NavbarLinksComponent from '../navbar-links/navbar-links.component';
import styles from './navbar.module.scss';

export default function NavbarComponent(): JSX.Element {
  const { isMobile } = useBreakpointContext();
  const { showNavbar, closeNavbar } = useNavbarContext();
  const { userEmail, isAuthenticatedUser, signOut } = useUserContext();

  const accountDropdown: DropdownItem[] = [
    {
      id: 1,
      elementType: 'text',
      icon: <RiMailLine className="u-text-base-3" size={15} />,
      label: userEmail,
      maxWidth: '180px',
      hasDivider: true,
      isActive: true,
    },
    {
      id: 2,
      elementType: 'button',
      icon: <RiLogoutCircleRLine className="u-text-base-3" size={15} />,
      label: 'Sair',
      isActive: true,
      action: signOut,
    },
  ];

  function handleUserItemList(): JSX.Element {
    if (isMobile) {
      return (
        <>
          <ButtonLinkComponent
            elementType="link"
            visualType="button"
            appearance="round"
            color="transparent"
            hoverColor="primary"
            styleClasses="u-display-flex u-border-width-1"
            to=""
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

    return (
      <DropdownComponent
        buttonAppearance="round"
        buttonColor="transparent"
        buttonActiveColor="primary"
        buttonMobileLabel={userEmail}
        buttonIcon={<RiUserLine className="u-flex-shrink-0" size={20} />}
        buttonStyleClasses={classNames({
          'u-display-flex': true,
          'u-border-width-1': true,
        })}
        listItems={accountDropdown}
      />
    );
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
                to="/auth/signin"
              >
                <RiUserLine className="u-flex-shrink-0" size={20} />
              </ButtonLinkComponent>
            ) : (
              handleUserItemList()
            )}
          </li>
          <li>
            <ButtonLinkComponent
              elementType="link"
              visualType="button"
              appearance="round"
              color="transparent"
              hoverColor="primary"
              mobileLabel="Pedidos"
              styleClasses="u-display-flex u-border-width-1"
              to="/cart"
            >
              <RiShoppingBasketLine className="u-flex-shrink-0" size={20} />
            </ButtonLinkComponent>
          </li>
        </ul>
      </div>
      {isMobile && <MobileNavButtonComponent />}
    </>
  );
}
