import { ValidatorsKeyof } from '../types/validators.type';

export interface UseFormProps {
  validators?: {
    [key in ValidatorsKeyof]?: string | number | boolean;
  }[];
  fieldName?: string;
  customMessage?: string;
}

export interface UseFormReturn {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  onChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
  validate: () => boolean;
  onBlur: () => void;
}
