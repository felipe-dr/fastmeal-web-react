import classNames from 'classnames';

import styles from './input.module.scss';
import { InputProps } from './interfaces/input.interface';

export default function InputComponent({
  label,
  name,
  type,
  value,
  placeholder,
  onChange,
  onBlur,
  children,
  error,
}: InputProps): JSX.Element {
  return (
    <div>
      {label && (
        <label className={styles['c-input__label']} htmlFor={name}>
          {label}
        </label>
      )}
      <div className="u-position-relative u-display-flex">
        <input
          className={classNames({
            [styles['c-input__field']]: true,
            [styles['c-input__field--hover-focus']]: !error,
            'u-border-danger': error,
            'u-pl-45': children,
          })}
          id={name}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
        />
        {children && (
          <span className={styles['c-input__icon']}>{children}</span>
        )}
      </div>
      {error && (
        <p
          className={classNames({
            [styles['c-input__feedback']]: true,
            'u-text-danger': true,
          })}
        >
          {error}
        </p>
      )}
    </div>
  );
}
