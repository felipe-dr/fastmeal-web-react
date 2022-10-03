import classNames from 'classnames';
import { RiShoppingBasketLine } from 'react-icons/ri';

import toBRL from 'core/utils/conversions/currency.util';

import ButtonLinkComponent from 'shared/components/button-link/button-link.component';
import DropdownComponent from 'shared/components/dropdown/dropdown.component';

import { OrderItem } from 'features/order/interfaces/order-item.interface';

import OrderItemDropdownComponent from '../order-item-dropdown/order-item-dropdown.component';
import orderDropdownStyles from './order-dropdown.module.scss';

export default function OrderDropdownComponent(): JSX.Element {
  // !! TEMP
  const orderItems: OrderItem[] = [
    {
      id: 1,
      name: 'Pão Artesanal Italiano',
      quantity: 1,
      price: 15.9,
      imagePath: '',
    },
    {
      id: 2,
      name: 'Classic Burger',
      quantity: 2,
      price: 18.5,
      imagePath: '',
    },
  ];

  return (
    <DropdownComponent
      buttonAppearance="round"
      buttonColor="transparent"
      buttonActiveColor="primary"
      buttonIcon={
        <RiShoppingBasketLine className="u-flex-shrink-0" size={20} />
      }
      buttonStyleClasses={classNames({
        'u-display-flex': true,
        'u-border-width-1': true,
      })}
      listMaxHeight
      customItemsElements={
        orderItems.length > 0 ? (
          <OrderItemDropdownComponent orderItems={orderItems} />
        ) : (
          <p className="u-py-20">Nenhum item adicionado.</p>
        )
      }
    >
      {orderItems.length > 0 && (
        <>
          <table
            className={classNames({
              [orderDropdownStyles['c-order-dropdown__subtotal']]: true,
              'u-p-20': true,
            })}
          >
            <tbody>
              <tr>
                <th className="u-font-bold">Subtotal:</th>
                <td className="u-text-right">{toBRL(99.8)}</td>
              </tr>
            </tbody>
          </table>
          <ButtonLinkComponent
            elementType="link"
            visualType="button"
            appearance="default"
            color="base-3"
            hoverColor="primary"
            to="order/checkout"
            styleClasses={classNames({
              [orderDropdownStyles['c-order-dropdown__button']]: true,
              'u-display-block': true,
            })}
          >
            Fechar pedido
          </ButtonLinkComponent>
        </>
      )}
    </DropdownComponent>
  );
}
