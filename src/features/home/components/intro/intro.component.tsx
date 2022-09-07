import classNames from 'classnames';

import ButtonLinkComponent from 'shared/components/button-link/button-link.component';
import LogoComponent from 'shared/components/logo/logo.component';

import styles from './intro.module.scss';

export default function IntroComponent(): JSX.Element {
  return (
    <section
      className={classNames({
        [styles['c-intro']]: true,
        'u-pt-70': true,
      })}
    >
      <div className={styles['c-intro__bg']} />
      <header>
        <h1 className={styles['c-intro__title']}>
          <span className="s1 u-font-semibold u-text-primary u-text-uppercase">
            Está com fome?
          </span>
          <LogoComponent
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
      <ButtonLinkComponent
        elementType="link"
        visualType="button"
        appearance="default"
        color="base-3"
        hoverColor="primary"
        to="/restaurants"
      >
        Restaurantes
      </ButtonLinkComponent>
    </section>
  );
}
