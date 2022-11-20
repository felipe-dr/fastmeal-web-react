import { ClassNameProps } from 'shared/interfaces/class-name.interface';
import { Colors } from 'shared/types/colors.type';

export interface BadgeProps extends ClassNameProps {
  backgroundColor?: Colors;
  textColor?: Colors;
  text: string | number;
}
