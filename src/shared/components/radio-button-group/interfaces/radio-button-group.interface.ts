import { RadioButtonOption } from './radio-button-option.interface';

export interface RadioButtonGroupProps {
  options: RadioButtonOption[];
  selectedValue: string;
  onChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
}
