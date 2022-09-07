import classNames from 'classnames';

import styles from './header-title.module.scss';
import { HeaderTitleProps } from './interfaces/header-title.interface';

export default function HeaderTitleComponent({
  titleText,
  titleColor,
  backgroundColor,
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
          [`u-text-${titleColor}`]: titleColor !== undefined,
          'u-px-15': true,
        })}
      >
        {titleText}
      </h1>
    </header>
  );
}
