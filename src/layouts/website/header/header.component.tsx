import classNames from 'classnames';

import LogoComponent from 'shared/components/logo/logo.component';
import NavbarComponent from 'shared/components/navbar/navbar.component';

import styles from './header.module.scss';

export default function HeaderComponent(): JSX.Element {
  return (
    <header
      className={classNames({
        [styles['l-header']]: true,
        'u-shadow-small': true,
      })}
    >
      <div
        className={classNames({
          'grid-container': true,
          [styles['l-header__container']]: true,
        })}
      >
        <LogoComponent linkStyleClasses={styles['l-header__logo']} />
        <NavbarComponent />
      </div>
    </header>
  );
}
