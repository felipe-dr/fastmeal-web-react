import { RadioButtonOption } from './radio-button-option.interface';

export interface RadioButtonGroupProps {
  options: RadioButtonOption[];
  selectedValue: string;
  error?: string;
  onChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
}
