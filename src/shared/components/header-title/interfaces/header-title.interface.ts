import { Colors } from 'shared/types/colors.type';

export interface HeaderTitleProps {
  titleText: string;
  titleColor?: Colors;
  backgroundColor?: Colors;
  hasBreadcrumb?: boolean;
  disableRoute?: string;
}
