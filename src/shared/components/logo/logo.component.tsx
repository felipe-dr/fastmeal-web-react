import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { ReactComponent as LogoIcon } from 'assets/icons/logo.svg';

import { useNavbarContext } from 'core/contexts/navbar/navbar.context';

import { LogoProps } from './interfaces/logo.interface';
import styles from './logo.module.scss';

export default function Logo({
  linkStyleClasses,
  styleClasses,
  hasLink = true,
  hasOnClick = true,
}: LogoProps): JSX.Element {
  const { closeNavbar } = useNavbarContext();

  function createLogoIcon(): JSX.Element {
    return (
      <LogoIcon
        className={classNames({
          [styles['c-logo']]: true,
          [`${styleClasses}`]: styleClasses !== undefined,
          'u-icon': true,
        })}
      />
    );
  }

  if (hasLink) {
    return (
      <Link
        className={classNames({
          [`${linkStyleClasses}`]: linkStyleClasses !== undefined,
          'u-display-flex': true,
        })}
        to="/"
        onClick={hasOnClick ? closeNavbar : undefined}
      >
        {createLogoIcon()}
      </Link>
    );
  }

  return <>{createLogoIcon()}</>;
}
