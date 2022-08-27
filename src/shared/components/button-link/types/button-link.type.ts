import { ReactNode } from 'react';
import { LinkProps } from 'react-router-dom';

import { ClassNameProps } from 'shared/interfaces/class-name.interface';
import { Colors } from 'shared/types/colors.type';

import { ButtonLinkAppearance } from './button-link-appearance.type';
import { ButtonLinkVisualType } from './button-link-visual-type.type';

type ButtonLinkBaseProps = ClassNameProps & {
  visualType: ButtonLinkVisualType;
  appearance?: ButtonLinkAppearance;
  color?: Colors;
  hoverColor?: Colors;
  mobileLabel?: string;
  children: ReactNode;
};

type ButtonAsButton = ButtonLinkBaseProps &
  Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    keyof ButtonLinkBaseProps
  > & {
    elementType: 'button';
    type: 'submit' | 'reset' | 'button';
  };

type ButtonAsLink = ButtonLinkBaseProps &
  Omit<LinkProps, keyof ButtonLinkBaseProps> & {
    elementType: 'link';
  };

type ButtonAsExternalLink = ButtonLinkBaseProps &
  Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof ButtonLinkBaseProps
  > & {
    elementType: 'externalLink';
    href: string;
  };

export type ButtonLinkProps =
  | ButtonAsButton
  | ButtonAsLink
  | ButtonAsExternalLink;
