import classNames from 'classnames';

import styles from './errors.module.scss';
import { ErrorsProps } from './interfaces/errors.interface';

export default function ErrorsComponent({
  styleClasses,
  hasErrorTitle = true,
  errorTitle,
  errors,
}: ErrorsProps): JSX.Element {
  return (
    <div
      className={classNames({
        [styles['c-errors']]: true,
        [`${styleClasses}`]: styleClasses !== undefined,
      })}
    >
      {hasErrorTitle && errorTitle !== '' && (
        <h3 className={styles['c-errors__title']}>{errorTitle}</h3>
      )}
      <ul
        className={classNames({
          'u-ml-10': hasErrorTitle && errorTitle !== '',
        })}
      >
        {errors.map((error, index) => (
          <li
            className={classNames({
              [styles['c-errors__item']]: true,
              s1: true,
            })}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
          >
            {error}
          </li>
        ))}
      </ul>
    </div>
  );
}
