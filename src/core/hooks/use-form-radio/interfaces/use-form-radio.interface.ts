export interface UseFormRadioProps {
  defaultValueChecked?: string;
}

export interface UseFormRadioReturn {
  selectedValue: string;
  onChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
}
