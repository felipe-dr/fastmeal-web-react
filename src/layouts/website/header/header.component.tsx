import classNames from 'classnames';

import Logo from 'shared/components/logo/logo.component';
import Navbar from 'shared/components/navbar/navbar.component';

import styles from './header.module.scss';

export default function Header(): JSX.Element {
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
        <Logo />
        <Navbar />
      </div>
    </header>
  );
}
