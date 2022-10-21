import { ValidatorsKeyof } from '../types/validators.type';

export interface UseFormInputProps {
  validators?: {
    [key in ValidatorsKeyof]?: string | number | boolean;
  }[];
  fieldName?: string;
  customMessage?: string;
}

export interface UseFormInputReturn {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  onChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
  validate: () => boolean;
  onBlur: () => void;
}
