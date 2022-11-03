export interface UseFormRadioProps {
  defaultValueChecked?: string;
  radioGroupName?: string;
}

export interface UseFormRadioReturn {
  selectedValue: string;
  error: string;
  handleValidation: () => boolean;
  onChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
}
