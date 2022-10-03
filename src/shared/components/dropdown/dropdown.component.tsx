/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import { FormEvent, useRef } from 'react';

import useOutsideEvent from 'core/hooks/use-outside-event/use-outside-event.hook';

import { Colors } from 'shared/types/colors.type';

import ButtonLinkComponent from '../button-link/button-link.component';
import buttonLinkStyles from '../button-link/button-link.module.scss';
import { ButtonLinkVisualType } from '../button-link/types/button-link-visual-type.type';
import dropdownStyles from './dropdown.module.scss';
import { DropdownItem, DropdownProps } from './interfaces/dropdown.interface';

export default function DropdownComponent({
  buttonAppearance,
  buttonColor,
  buttonActiveColor,
  buttonMobileLabel,
  buttonLabel,
  buttonIcon,
  buttonStyleClasses,
  listDefaultPadding = true,
  listMaxHeight,
  listItems,
  customItemsElements,
  children,
}: DropdownProps): JSX.Element {
  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  const { isActiveElement, showElement, hiddenElement } = useOutsideEvent({
    element: dropdownContainerRef,
  });

  function buildDefaultListItems(item: DropdownItem): JSX.Element {
    const {
      elementType,
      label,
      maxWidth,
      isActive,
      linkPath,
      action = () => null,
    } = item;

    const visualType: ButtonLinkVisualType =
      elementType === 'button' ? 'button' : 'link';

    const defaultButtonLink: {
      visualType: ButtonLinkVisualType;
      color: Colors;
      styleClasses: string;
      onClick: (event: FormEvent<HTMLElement>) => void;
    } = {
      visualType,
      color: 'transparent',
      styleClasses: classNames({
        [dropdownStyles['c-dropdown__link']]: true,
        [dropdownStyles['c-dropdown__link--disabled']]: !isActive,
        'u-cursor-not-allowed': !isActive,
      }),
      onClick: (event) => {
        // eslint-disable-next-line no-unused-expressions
        isActive ? [action(), hiddenElement()] : event.preventDefault();
      },
    };

    switch (elementType) {
      case 'button':
        return (
          <ButtonLinkComponent
            elementType={elementType}
            type="button"
            {...defaultButtonLink}
          >
            {label}
          </ButtonLinkComponent>
        );
      case 'link':
        return (
          <ButtonLinkComponent
            elementType={elementType}
            to={isActive && linkPath ? linkPath : '#'}
            {...defaultButtonLink}
          >
            {label}
          </ButtonLinkComponent>
        );
      case 'externalLink':
        return (
          <ButtonLinkComponent
            elementType={elementType}
            href={isActive && linkPath ? linkPath : '#'}
            {...defaultButtonLink}
          >
            {label}
          </ButtonLinkComponent>
        );
      default:
        return (
          <p
            className={classNames({
              [dropdownStyles['c-dropdown__text']]: true,
              [dropdownStyles['c-dropdown__text--overflow-ellipsis']]: maxWidth,
            })}
            style={{ maxWidth: `${maxWidth}` }}
          >
            {label}
          </p>
        );
    }
  }

  function buildList(): JSX.Element {
    return (
      <ul
        className={classNames({
          [dropdownStyles['c-dropdown__list']]: !children && true,
          [dropdownStyles['c-dropdown__list--active']]:
            !children && isActiveElement,
          [dropdownStyles['c-dropdown__list--padding']]: listDefaultPadding,
          [dropdownStyles['c-dropdown__list--max-height']]: listMaxHeight,
          'u-shadow-small': !children && true,
        })}
      >
        {customItemsElements ||
          listItems?.map((item) => (
            <li
              className={classNames({
                [dropdownStyles['c-dropdown__item']]: true,
                [dropdownStyles['c-dropdown__divider']]: item.hasDivider,
                [dropdownStyles['c-dropdown__link--disabled']]: !item.isActive,
                'u-display-flex': item.icon,
                'u-flex-align-items-center': item.icon,
              })}
              key={item.id}
            >
              {item.icon && item.icon}
              {buildDefaultListItems(item)}
            </li>
          ))}
      </ul>
    );
  }

  return (
    <div className={dropdownStyles['c-dropdown']} ref={dropdownContainerRef}>
      <ButtonLinkComponent
        elementType="button"
        visualType="button"
        appearance={buttonAppearance}
        color={buttonColor}
        mobileLabel={buttonMobileLabel}
        styleClasses={classNames({
          [buttonLinkStyles[`c-button--active-color-${buttonActiveColor}`]]:
            isActiveElement,
          [`${buttonStyleClasses}`]: buttonStyleClasses,
        })}
        type="button"
        onMouseEnter={showElement}
      >
        {buttonIcon && buttonIcon}
        {buttonLabel && buttonLabel}
      </ButtonLinkComponent>
      {children ? (
        <div
          className={classNames({
            [dropdownStyles['c-dropdown__list']]: true,
            [dropdownStyles['c-dropdown__list--active']]: isActiveElement,
            'u-shadow-small': true,
          })}
        >
          {buildList()}
          {children}
        </div>
      ) : (
        buildList()
      )}
    </div>
  );
}
