import { ClassNameProps } from 'shared/interfaces/class-name.interface';

export interface ErrorsProps extends ClassNameProps {
  hasErrorTitle?: boolean;
  errorTitle?: string;
  errors: [];
}
