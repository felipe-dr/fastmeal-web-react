/* eslint-disable react/destructuring-assignment */
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import {
  ButtonLinkAppearance,
  ButtonLinkVisualType,
} from 'shared/types/button-link.type';
import { Colors } from 'shared/types/colors.type';

import styles from './button-link.module.scss';
import { ButtonLinkProps } from './types/button-link.type';

export default function ButtonLink(props: ButtonLinkProps): JSX.Element {
  function addStyleClasses(
    visualType: ButtonLinkVisualType | undefined,
    appearance: ButtonLinkAppearance | undefined,
    color: Colors | undefined
  ): string {
    return classNames({
      [styles[`c-${visualType}`]]: true,
      [styles[`c-${visualType}--${appearance}`]]: appearance !== undefined,
      [styles[`c-${visualType}--color-${color}`]]: color !== undefined,
      [`${props.styleClasses}`]: props.styleClasses !== undefined,
    });
  }

  if (props.elementType === 'button') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { elementType, visualType, appearance, color, ...rest } = props;

    return (
      // eslint-disable-next-line react/button-has-type
      <button
        className={addStyleClasses(visualType, appearance, color)}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      >
        {props.children}
      </button>
    );
  }

  if (props.elementType === 'link') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { elementType, visualType, appearance, color, ...rest } = props;

    return (
      <Link
        className={addStyleClasses(visualType, appearance, color)}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      >
        {props.children}
      </Link>
    );
  }

  if (props.elementType === 'externalLink') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { elementType, visualType, appearance, color, ...rest } = props;

    return (
      <a
        className={addStyleClasses(visualType, appearance, color)}
        target="_blank"
        rel="noopener noreferrer"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      >
        {props.children}
      </a>
    );
  }

  throw new Error('Could not determine the correct button type');
}
