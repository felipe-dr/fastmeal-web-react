import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import translateTermsToPtBr from 'core/utils/translations/translations.util';

import ButtonLinkComponent from '../button-link/button-link.component';
import styles from './breadcrumb.module.scss';
import { Breadcrumb } from './interfaces/breadcrumb.interface';

export default function BreadcrumbComponent(): JSX.Element {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);
  const location = useLocation();
  const resources = location.pathname.split('/');

  resources.shift();

  useEffect(() => {
    const breadcrumbArray: Breadcrumb[] = resources.map((resource, index) => {
      const path = `/${resources.slice(0, index + 1).join('/')}`;

      return {
        label: translateTermsToPtBr(resource.replace('-', ' ')),
        path,
      };
    });

    setBreadcrumbs(breadcrumbArray);
  }, [location.pathname]);

  return (
    <ul
      className={classNames({
        [styles['c-breadcrumb']]: true,
        s2: true,
      })}
    >
      <li className={styles['c-breadcrumb__item--separator']}>
        <ButtonLinkComponent
          elementType="link"
          visualType="link"
          appearance="default"
          color="base-3"
          to="/"
        >
          Início
        </ButtonLinkComponent>
      </li>
      {breadcrumbs &&
        breadcrumbs.map((breadcrumb, index) =>
          index === resources.length - 1 ? (
            <li className="u-text-base-3 u-font-bold" key={breadcrumb.label}>
              {breadcrumb.label}
            </li>
          ) : (
            <li
              className={styles['c-breadcrumb__item--separator']}
              key={breadcrumb.label}
            >
              <ButtonLinkComponent
                elementType="link"
                visualType="link"
                appearance="default"
                color="base-3"
                to={breadcrumb.path}
              >
                {breadcrumb.label}
              </ButtonLinkComponent>
            </li>
          )
        )}
    </ul>
  );
}
