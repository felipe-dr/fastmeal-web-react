/* eslint-disable react/destructuring-assignment */
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { ButtonAppearance } from 'shared/types/button-appearance.type';
import { Colors } from 'shared/types/colors.type';

import styles from './button-link.module.scss';
import { ButtonLinkProps } from './types/button-link.type';

export default function ButtonLink(props: ButtonLinkProps): JSX.Element {
  function addStyleClasses(
    appearance: ButtonAppearance | undefined,
    color: Colors | undefined
  ): string {
    return classNames({
      [styles['c-button-link']]: true,
      [styles[`c-button-link--${appearance}`]]: appearance !== undefined,
      [styles[`c-button-link--color-${color}`]]: color !== undefined,
      [`${props.styleClasses}`]: props.styleClasses !== undefined,
    });
  }

  if (props.elementType === 'button') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { appearance, color, elementType, ...rest } = props;

    return (
      // eslint-disable-next-line react/button-has-type
      <button
        className={addStyleClasses(appearance, color)}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      >
        {props.children}
      </button>
    );
  }

  if (props.elementType === 'link') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { appearance, color, elementType, ...rest } = props;

    return (
      <Link
        className={addStyleClasses(appearance, color)}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      >
        {props.children}
      </Link>
    );
  }

  if (props.elementType === 'externalLink') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { appearance, color, elementType, ...rest } = props;

    return (
      <a
        className={addStyleClasses(appearance, color)}
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
