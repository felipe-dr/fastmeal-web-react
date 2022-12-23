import classNames from 'classnames';
import {
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiErrorWarningLine,
  RiInformationLine,
} from 'react-icons/ri';

import { useBreakpointContext } from 'core/contexts/breakpoint/breakpoint.context';

import ButtonLinkComponent from '../button-link/button-link.component';
import { ToastProps } from './interfaces/toast.interface';
import styles from './toast.module.scss';

export default function ToastComponent({
  position,
  toastList,
  removeToast,
}: ToastProps): JSX.Element {
  const { breakpoints } = useBreakpointContext();

  function buildIcon() {
    let iconType;
    const iconSize = 36;

    // eslint-disable-next-line array-callback-return
    toastList.map((toast) => {
      switch (toast.type) {
        case 'success':
          iconType = (
            <RiCheckboxCircleLine className="u-flex-shrink-0" size={iconSize} />
          );
          break;
        case 'info':
          iconType = (
            <RiInformationLine className="u-flex-shrink-0" size={iconSize} />
          );
          break;
        case 'warning':
          iconType = (
            <RiErrorWarningLine className="u-flex-shrink-0" size={iconSize} />
          );
          break;
        case 'danger':
          iconType = (
            <RiCloseCircleLine className="u-flex-shrink-0" size={iconSize} />
          );
          break;
        default:
          iconType = toast.icon;
      }
    });

    return iconType;
  }

  return (
    <div
      className={classNames({
        [styles['c-toast__container']]: true,
        [styles[`c-toast__position--${position}`]]: position !== undefined,
      })}
    >
      {toastList.map(({ id, type, title, message }) => (
        <div
          className={classNames({
            [styles['c-toast']]: true,
            [styles[`c-toast__type--${type}`]]: type !== undefined,
            [styles[`c-toast__position--${position}-animation`]]:
              position !== undefined,
            'u-shadow-small': true,
          })}
          key={id}
        >
          {breakpoints?.SM === false && buildIcon()}
          <div className={styles['c-toast__notify']}>
            {title && <p className={styles['c-toast__title']}>{title}</p>}
            <p>{message}</p>
          </div>
          <ButtonLinkComponent
            elementType="button"
            visualType="button"
            appearance="compact"
            color="transparent"
            type="button"
            styleClasses={classNames({
              [styles['c-toast__button']]: true,
              'u-text-base-3': type === 'default',
              'u-text-base-2': type !== 'default',
            })}
            onClick={() => removeToast(id)}
          >
            <RiCloseCircleLine className="u-flex-shrink-0" size={18} />
          </ButtonLinkComponent>
        </div>
      ))}
    </div>
  );
}
