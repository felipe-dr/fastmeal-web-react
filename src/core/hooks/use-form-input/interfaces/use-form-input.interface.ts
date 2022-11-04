import { ValidatorsKeyof } from '../types/validators.type';

export interface UseFormInputProps {
  validators?: {
    [key in ValidatorsKeyof]?: string | number | boolean;
  }[];
  fieldName?: string;
  customMessage?: string;
  mask?: 'cpf' | 'phone' | 'cep';
}

export interface UseFormInputReturn {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  validate: () => boolean;
  onBlur: () => void;
}
