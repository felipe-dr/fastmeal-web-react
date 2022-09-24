import classNames from 'classnames';

import { ReactComponent as ForkAndKnifeIcon } from 'assets/icons/fork-and-knife.svg';

import ButtonLinkComponent from '../button-link/button-link.component';
import styles from './not-found.module.scss';

export default function NotFoundComponent(): JSX.Element {
  return (
    <main className={styles['c-not-found']}>
      <section
        className={classNames({
          'grid-container': true,
          [styles['c-not-found__section']]: true,
        })}
      >
        <figure>
          <ForkAndKnifeIcon
            className={classNames({
              [styles['c-not-found__icon']]: true,
              'u-icon': true,
            })}
          />
        </figure>
        <div>
          <h1 className={styles['c-not-found__title']}>404</h1>
          <h2 className="t2 u-text-uppercase u-text-base-3 u-my-15">
            Página não encontrada...
          </h2>
          <p
            className={classNames({
              [styles['c-not-found__description']]: true,
            })}
          >
            <span className="u-font-bold">Ops!</span>, a página que você está
            procurando não existe ou foi removida. Verifique se a url informada
            está correta.
          </p>
          <p className="u-font-bold u-text-base-3 u-text-uppercase u-mt-45 u-mb-15">
            Para onde deseja ir?
          </p>
          <ul className="u-display-flex u-flex-wrap u-flex-justify-content-center u-flex-sm-justify-content-start u-gap-20">
            <li>
              <ButtonLinkComponent
                elementType="link"
                visualType="link"
                appearance="default"
                color="base-3"
                hoverColor="primary"
                to=""
              >
                Início
              </ButtonLinkComponent>
            </li>
            <li>
              <ButtonLinkComponent
                elementType="link"
                visualType="link"
                appearance="default"
                color="base-3"
                hoverColor="primary"
                to="/restaurants"
              >
                Restaurantes
              </ButtonLinkComponent>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
