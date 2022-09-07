import classNames from 'classnames';

import { useNavbarContext } from 'core/contexts/navbar/navbar.context';

import styles from './mobile-nav-button.module.scss';

export default function MobileNavButtonComponent(): JSX.Element {
  const { showNavbar, handleNavbar } = useNavbarContext();

  return (
    <button
      className={classNames({
        [styles['c-mobile-nav-button']]: true,
        [styles['c-mobile-nav-button--active']]: showNavbar,
      })}
      type="button"
      onClick={handleNavbar}
    >
      {' '}
    </button>
  );
}
