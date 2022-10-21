/* eslint-disable react/jsx-props-no-spreading */
import { RadioButtonProps } from './interfaces/radio-button.interface';
import styles from './radio-button.module.scss';

export default function RadioButtonComponent({
  id,
  label,
  name,
  value,
  defaultChecked,
  disabled = false,
  ...rest
}: RadioButtonProps): JSX.Element {
  return (
    <label className={styles['c-radio-button__label']} htmlFor={id}>
      <input
        className={styles['c-radio-button__field']}
        id={id}
        name={name}
        type="radio"
        value={value}
        defaultChecked={defaultChecked}
        disabled={disabled}
        {...rest}
      />
      {label}
    </label>
  );
}
