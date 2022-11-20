import { ReactNode } from 'react';

import { ButtonLinkAppearance } from 'shared/components/button-link/types/button-link-appearance.type';
import { Colors } from 'shared/types/colors.type';

export interface DropdownItem {
  id: string | number;
  elementType: 'button' | 'link' | 'externalLink' | 'text';
  icon?: ReactNode;
  label: string;
  maxWidth?: string;
  hasDivider?: boolean;
  isActive: boolean;
  linkPath?: string;
  action?: () => unknown;
}

export interface DropdownProps {
  buttonAppearance?: ButtonLinkAppearance;
  buttonColor?: Colors;
  buttonActiveColor?: Colors;
  buttonMobileLabel?: string;
  buttonLabel?: string;
  buttonIcon?: ReactNode;
  buttonBadge?: ReactNode;
  buttonStyleClasses?: string;
  listDefaultPadding?: boolean;
  listMaxHeight?: boolean;
  listItems?: DropdownItem[];
  customItemsElements?: ReactNode;
  children?: ReactNode;
}
