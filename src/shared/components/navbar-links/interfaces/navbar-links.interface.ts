import { ClassNameProps } from 'shared/interfaces/class-name.interface';

export interface NavbarLinksProps extends ClassNameProps {
  routes: {
    label: string;
    path: string;
  }[];
}
