import { ReactNode } from 'react';
import { LinkProps } from 'react-router-dom';

import { ClassNameProps } from 'shared/interfaces/class-name.interface';
import {
  ButtonLinkAppearance,
  ButtonLinkVisualType,
} from 'shared/types/button-link.type';
import { Colors } from 'shared/types/colors.type';

type ButtonLinkBaseProps = ClassNameProps & {
  visualType: ButtonLinkVisualType;
  appearance?: ButtonLinkAppearance;
  color?: Colors;
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
