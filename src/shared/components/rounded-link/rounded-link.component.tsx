import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { useBreakpointContext } from 'core/contexts/breakpoint/breakpoint.context';
import { useNavbarContext } from 'core/contexts/navbar/navbar.context';

import { RoundedLinkProps } from './interfaces/rounded-link.interface';
import styles from './rounded-link.module.scss';

export default function RoundedLink({
  linkPath,
  linkLabel,
  children,
}: RoundedLinkProps): JSX.Element {
  const { isMobile } = useBreakpointContext();
  const { closeNavbar } = useNavbarContext();

  return (
    <Link
      className={classNames({
        'u-display-flex': true,
        [styles['c-rounded-link']]: true,
      })}
      to={linkPath}
      onClick={closeNavbar}
    >
      {children}
      {isMobile && <span>{linkLabel}</span>}
    </Link>
  );
}
