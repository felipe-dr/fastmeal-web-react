import classNames from 'classnames';
import { Outlet, useLocation } from 'react-router-dom';

import authBurgerLg from 'assets/images/auth/auth-burger-lg.jpeg';
import authBurgerMd from 'assets/images/auth/auth-burger-md.jpeg';

import { useBreakpointContext } from 'core/contexts/breakpoint/breakpoint.context';

import Logo from 'shared/components/logo/logo.component';

import styles from './auth.module.scss';

export default function Auth(): JSX.Element {
  const { breakpoints } = useBreakpointContext();

  const location = useLocation();

  const pathName = location.pathname.split('/')[2];
  const formTitle = pathName === 'signin' ? 'Entrar' : 'Nova conta';

  return (
    <>
      <section
        className={classNames({
          'grid-container': true,
          [styles['l-auth']]: true,
          'u-py-45': true,
        })}
      >
        <Logo styleClasses={styles['l-auth__logo']} hasOnClick={false} />
        <h2 className="u-text-base-3 u-mt-15">{formTitle}</h2>
        <Outlet />
      </section>
      {breakpoints?.md === false && (
        <img
          className={styles['l-auth__image']}
          srcSet={`${authBurgerMd} 1200w, ${authBurgerLg} 1920w`}
          src={authBurgerMd}
          alt="Hambúrger extra picante"
        />
      )}
    </>
  );
}
