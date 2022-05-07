import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { ReactComponent as LogoIcon } from 'assets/icons/logo.svg';

import { useNavbarContext } from 'core/contexts/navbar/navbar.context';

import styles from './logo.module.scss';

export default function Logo(): JSX.Element {
  const { closeNavbar } = useNavbarContext();

  return (
    <Link
      className={classNames({
        'u-display-flex': true,
        [styles['c-logo__link']]: true,
      })}
      to="/"
      onClick={closeNavbar}
    >
      <LogoIcon
        className={classNames({
          'u-icon': true,
          [styles['c-logo']]: true,
        })}
      />
    </Link>
  );
}
