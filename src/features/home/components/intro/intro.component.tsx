import classNames from 'classnames';

import ButtonLink from 'shared/components/button-link/button-link.component';
import Logo from 'shared/components/logo/logo.component';

import styles from './intro.module.scss';

export default function Intro(): JSX.Element {
  return (
    <section className={styles['c-intro']}>
      <div className={styles['c-intro__bg']} />
      <header>
        <h1 className={styles['c-intro__title']}>
          <span className="s1 u-font-semibold u-text-primary u-text-uppercase">
            Está com fome?
          </span>
          <Logo
            styleClasses={classNames({
              [styles['c-intro__logo']]: true,
              'u-mt-30': true,
              'u-mb-15': true,
            })}
            hasLink={false}
          />
          <span
            className={classNames({
              [styles['c-intro__decoration']]: true,
              'u-font-normal': true,
            })}
          >
            Peça e se surpreenda!
          </span>
        </h1>
      </header>
      <ButtonLink
        elementType="link"
        visualType="button"
        appearance="default"
        color="base-3"
        to="/restaurants"
      >
        Restaurantes
      </ButtonLink>
    </section>
  );
}
