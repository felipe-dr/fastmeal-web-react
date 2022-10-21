import classNames from 'classnames';
import {
  RiBankCard2Line,
  RiCloseCircleLine,
  RiShoppingBasketLine,
} from 'react-icons/ri';

import toBRL from 'core/utils/conversions/currency.util';

import ButtonLinkComponent from 'shared/components/button-link/button-link.component';

import OrderListComponent from 'features/order/components/order-list/order-list.component';
import orderListStyles from 'features/order/components/order-list/order-list.module.scss';
import { orderItems } from 'features/order/interfaces/order-item.interface';

import restaurantOrderListStyles from './restaurant-order-list.module.scss';

export default function RestaurantOrderListComponent(): JSX.Element {
  return (
    <div
      className={classNames({
        [restaurantOrderListStyles['c-restaurant-order-list']]: true,
        'u-shadow-small': true,
      })}
    >
      <h4
        className={classNames({
          [restaurantOrderListStyles['c-restaurant-order-list__title']]: true,
          't3 u-text-base-3 u-text-uppercase': true,
          'u-display-flex u-flex-align-items-center': true,
          'u-p-20': true,
        })}
      >
        <RiShoppingBasketLine className="u-flex-shrink-0 u-mr-5" />
        Pedido
      </h4>
      {orderItems.length > 0 ? (
        <>
          <div
            className={classNames({
              [orderListStyles['c-order-list__container']]: true,
              [orderListStyles['c-order-list__container--max-height-small']]:
                true,
              'u-px-20 u-mt-20': true,
            })}
          >
            <OrderListComponent
              showImage={false}
              showDescription={false}
              showPrice={false}
            />
          </div>
          <table
            className={
              restaurantOrderListStyles['c-restaurant-order-list__subtotal']
            }
          >
            <tbody>
              <tr>
                <th className="u-font-bold u-pl-32" scope="row">
                  Subtotal:
                </th>
                <td className="u-text-right u-pr-32">{toBRL(25.9)}</td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <p className="u-p-20">Nenhum item adicionado.</p>
      )}
      {orderItems.length > 0 && (
        <div
          className={classNames({
            [restaurantOrderListStyles['c-restaurant-order-list__actions']]:
              true,
            'u-flex-justify-content-center u-flex-sm-justify-content-end': true,
          })}
        >
          <ButtonLinkComponent
            elementType="button"
            visualType="button"
            appearance="compact"
            color="base-1"
            hoverColor="primary"
            styleClasses="u-display-flex u-flex-align-items-center"
            type="button"
          >
            <RiCloseCircleLine className="u-flex-shrink-0 u-mr-5" />
            Limpar
          </ButtonLinkComponent>
          <ButtonLinkComponent
            elementType="link"
            visualType="button"
            appearance="compact"
            color="base-3"
            hoverColor="primary"
            to="/order/checkout"
            styleClasses="u-display-flex u-flex-align-items-center"
          >
            <RiBankCard2Line className="u-flex-shrink-0 u-mr-5" />
            Fechar pedido
          </ButtonLinkComponent>
        </div>
      )}
    </div>
  );
}
