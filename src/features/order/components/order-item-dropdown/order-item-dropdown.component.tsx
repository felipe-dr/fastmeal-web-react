import classNames from 'classnames';
import { RiCloseCircleLine } from 'react-icons/ri';

import toBRL from 'core/utils/conversions/currency.util';

import ButtonLinkComponent from 'shared/components/button-link/button-link.component';
import dropdownStyles from 'shared/components/dropdown/dropdown.module.scss';

import { OrderItemDropdownProps } from './interfaces/order-item-dropdown.interface';
import orderItemDropdownStyles from './order-item-dropdown.module.scss';

export default function OrderItemDropdownComponent({
  orderItems,
}: OrderItemDropdownProps): JSX.Element {
  return (
    <>
      {orderItems.map(({ id, imagePath, name, quantity, price }) => (
        <li
          className={classNames({
            [orderItemDropdownStyles['c-order-item-dropdown']]: true,
            [dropdownStyles['c-dropdown__item']]: true,
            [dropdownStyles['c-dropdown__divider']]: true,
          })}
          key={id}
        >
          <figure>
            <img
              className={orderItemDropdownStyles['c-order-item-dropdown__img']}
              src={imagePath}
              width="50"
              height="50"
              alt={name}
            />
          </figure>
          <div>
            <strong
              className={
                orderItemDropdownStyles['c-order-item-dropdown__title']
              }
            >
              {name}
            </strong>
            {`${quantity} × `}
            <span className="u-text-base-3">{toBRL(price)}</span>
          </div>
          <ButtonLinkComponent
            elementType="button"
            visualType="button"
            appearance="compact"
            color="transparent"
            hoverTextColor="primary"
            type="button"
            styleClasses={
              orderItemDropdownStyles['c-order-item-dropdown__remove']
            }
          >
            <RiCloseCircleLine className="u-flex-shrink-0" size={18} />
          </ButtonLinkComponent>
        </li>
      ))}
    </>
  );
}
