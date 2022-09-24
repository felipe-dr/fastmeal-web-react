import classNames from 'classnames';

import BreadcrumbComponent from '../breadcrumb/breadcrumb.component';
import styles from './header-title.module.scss';
import { HeaderTitleProps } from './interfaces/header-title.interface';

export default function HeaderTitleComponent({
  titleText,
  titleColor = 'base-3',
  backgroundColor,
  hasBreadcrumb = true,
}: HeaderTitleProps): JSX.Element {
  return (
    <header
      className={classNames({
        [styles['c-header-title']]: true,
        [`u-bg-${backgroundColor}`]: backgroundColor !== undefined,
        [styles['c-header-title--background']]: backgroundColor === undefined,
      })}
    >
      <h1
        className={classNames({
          t1: true,
          [`u-text-${titleColor}`]: true,
        })}
      >
        {titleText}
      </h1>
      {hasBreadcrumb && <BreadcrumbComponent />}
    </header>
  );
}
