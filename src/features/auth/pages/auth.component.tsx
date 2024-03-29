import classNames from 'classnames';
import { Outlet, useLocation } from 'react-router-dom';

import authBurgerLg from 'assets/images/auth/auth-burger-lg.jpeg';
import authBurgerMd from 'assets/images/auth/auth-burger-md.jpeg';

import { useBreakpointContext } from 'core/contexts/breakpoint/breakpoint.context';

import LogoComponent from 'shared/components/logo/logo.component';

import styles from './auth.module.scss';

export default function AuthComponent(): JSX.Element {
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
        <LogoComponent
          styleClasses={styles['l-auth__logo']}
          hasOnClick={false}
        />
        <h2 className={styles['l-auth__title']}>{formTitle}</h2>
        <Outlet />
      </section>
      {breakpoints?.MD === false && (
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
