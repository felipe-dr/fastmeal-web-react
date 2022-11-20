import classNames from 'classnames';

import styles from './badge.module.scss';
import { BadgeProps } from './interfaces/badge.interface';

export default function BadgeComponent({
  backgroundColor = 'primary',
  textColor = 'base-2',
  text,
  styleClasses,
}: BadgeProps): JSX.Element {
  return (
    <span
      className={classNames({
        [styles['c-badge']]: true,
        [`u-bg-${backgroundColor}`]: true,
        [`u-text-${textColor}`]: true,
        [`${styleClasses}`]: styleClasses !== undefined,
      })}
    >
      {text}
    </span>
  );
}
