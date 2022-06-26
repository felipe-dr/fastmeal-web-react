import { ClassNameProps } from 'shared/interfaces/class-name.interface';

export interface LogoProps extends ClassNameProps {
  linkStyleClasses?: string;
  hasLink?: boolean;
  hasOnClick?: boolean;
}
