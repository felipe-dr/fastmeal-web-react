import RadioButtonComponent from '../radio-button/radio-button.component';
import { RadioButtonGroupProps } from './interfaces/radio-button-group.interface';
import { RadioButtonOption } from './interfaces/radio-button-option.interface';

export default function RadioButtonGroupComponent({
  options,
  selectedValue,
  error,
  onChange,
}: RadioButtonGroupProps): JSX.Element {
  function buildRadioGroupOptions() {
    return options.map(({ id, label, name, disabled }: RadioButtonOption) => {
      const optionId = `radio-option-${id}`;

      return (
        <RadioButtonComponent
          key={optionId}
          id={optionId}
          label={label}
          name={name}
          value={label}
          defaultChecked={selectedValue === label}
          disabled={disabled}
          onChange={onChange}
        />
      );
    });
  }

  return (
    <>
      {buildRadioGroupOptions()}
      {error && <p className="s2 u-text-danger">{error}</p>}
    </>
  );
}
