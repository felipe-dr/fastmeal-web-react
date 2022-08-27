/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { Colors } from 'shared/types/colors.type';

import styles from './button-link.module.scss';
import { ButtonLinkAppearance } from './types/button-link-appearance.type';
import { ButtonLinkVisualType } from './types/button-link-visual-type.type';
import { ButtonLinkProps } from './types/button-link.type';

export default function ButtonLink(props: ButtonLinkProps): JSX.Element {
  function addStyleClasses(
    visualType: ButtonLinkVisualType | undefined,
    appearance: ButtonLinkAppearance | undefined,
    color: Colors | undefined,
    hoverColor: Colors | undefined
  ): string {
    return classNames({
      [styles[`c-${visualType}`]]: true,
      [styles[`c-${visualType}--${appearance}`]]: appearance !== undefined,
      [styles[`c-${visualType}--color-${color}`]]: color !== undefined,
      [styles[`c-${visualType}--hover-color-${hoverColor}`]]:
        hoverColor !== undefined,
      [`${props.styleClasses}`]: props.styleClasses !== undefined,
    });
  }

  if (props.elementType === 'button') {
    const {
      elementType,
      visualType,
      appearance,
      color,
      hoverColor,
      mobileLabel,
      styleClasses,
      ...rest
    } = props;

    return (
      <button
        className={addStyleClasses(visualType, appearance, color, hoverColor)}
        {...rest}
      >
        {props.children}
        {props.mobileLabel && (
          <span className={styles['c-button__label']}>{props.mobileLabel}</span>
        )}
      </button>
    );
  }

  if (props.elementType === 'link') {
    const {
      elementType,
      visualType,
      appearance,
      color,
      hoverColor,
      mobileLabel,
      styleClasses,
      ...rest
    } = props;

    return (
      <Link
        className={addStyleClasses(visualType, appearance, color, hoverColor)}
        {...rest}
      >
        {props.children}
        {props.mobileLabel && (
          <span className={styles['c-button__label']}>{props.mobileLabel}</span>
        )}
      </Link>
    );
  }

  if (props.elementType === 'externalLink') {
    const {
      elementType,
      visualType,
      appearance,
      color,
      hoverColor,
      mobileLabel,
      styleClasses,
      ...rest
    } = props;

    return (
      <a
        className={addStyleClasses(visualType, appearance, color, hoverColor)}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {props.children}
        {props.mobileLabel && (
          <span className={styles['c-button__label']}>{props.mobileLabel}</span>
        )}
      </a>
    );
  }

  throw new Error('Could not determine the correct button type');
}
