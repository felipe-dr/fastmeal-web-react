import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import translateTermsToPtBr from 'core/utils/translations/translations.util';

import ButtonLinkComponent from '../button-link/button-link.component';
import styles from './breadcrumb.module.scss';
import { Breadcrumb, BreadcrumbProps } from './interfaces/breadcrumb.interface';

export default function BreadcrumbComponent({
  disableRoute = '',
}: BreadcrumbProps): JSX.Element {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);
  const location = useLocation();
  const resources = location.pathname.split('/');

  resources.shift();

  function handleBreadcrumbItems(breadcrumb: Breadcrumb, index: number) {
    const isLastItem = index === resources.length - 1;

    return (
      <li
        className={classNames({
          [styles['c-breadcrumb__item--separator']]: !isLastItem,
          'u-font-bold': isLastItem,
          'u-text-base-3': true,
        })}
        key={breadcrumb.label}
      >
        {disableRoute || isLastItem ? (
          breadcrumb.label
        ) : (
          <ButtonLinkComponent
            elementType="link"
            visualType="link"
            appearance="default"
            color="base-3"
            to={breadcrumb.path}
          >
            {breadcrumb.label}
          </ButtonLinkComponent>
        )}
      </li>
    );
  }

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
          handleBreadcrumbItems(breadcrumb, index)
        )}
    </ul>
  );
}
