import { RiAddLine, RiCloseCircleLine, RiSubtractLine } from 'react-icons/ri';

import toBRL from 'core/utils/conversions/currency.util';

import ButtonLinkComponent from 'shared/components/button-link/button-link.component';

import { orderItems } from 'features/order/interfaces/order-item.interface';

import { OrderListProps } from './interfaces/order-list.interface.';
import styles from './order-list.module.scss';

export default function OrderListComponent({
  showImage = true,
  showName = true,
  showDescription = true,
  showQuantity = true,
  showPrice = true,
  showSubtotal = true,
}: OrderListProps): JSX.Element {
  return (
    <table className={styles['c-order-list']}>
      <thead>
        <tr>
          {showImage && (
            <th className={styles['c-order-list__img']} scope="col">
              &nbsp;
            </th>
          )}
          {showName && <th scope="col">Item</th>}
          {showDescription && <th scope="col">Descrição</th>}
          {showQuantity && (
            <th className="u-text-center" scope="col">
              Quantidade
            </th>
          )}
          {showPrice && <th scope="col">Preço</th>}
          {showSubtotal && <th scope="col">Subtotal</th>}
          <th scope="col">&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {orderItems.map(
          ({ id, imagePath, name, description, quantity, price, subtotal }) => (
            <tr key={id}>
              {showImage && (
                <td>
                  <figure>
                    <img src={imagePath} width="50" height="50" alt={name} />
                  </figure>
                </td>
              )}
              {showName && <td>{name}</td>}
              {showDescription && <td>{description}</td>}
              {showQuantity && (
                <td className="u-text-center">
                  <ButtonLinkComponent
                    elementType="button"
                    visualType="button"
                    appearance="compact"
                    color="transparent"
                    hoverTextColor="primary"
                    type="button"
                    styleClasses="u-align-middle u-p-5"
                  >
                    <RiSubtractLine className="u-flex-shrink-0" />
                  </ButtonLinkComponent>
                  {quantity}
                  <ButtonLinkComponent
                    elementType="button"
                    visualType="button"
                    appearance="compact"
                    color="transparent"
                    hoverTextColor="primary"
                    type="button"
                    styleClasses="u-align-middle u-p-5"
                  >
                    <RiAddLine className="u-flex-shrink-0" />
                  </ButtonLinkComponent>
                </td>
              )}
              {showPrice && <td>{toBRL(price)}</td>}
              {showSubtotal && <td>{toBRL(subtotal)}</td>}
              <td>
                <ButtonLinkComponent
                  elementType="button"
                  visualType="button"
                  appearance="compact"
                  color="transparent"
                  hoverTextColor="primary"
                  type="button"
                  styleClasses="u-display-flex u-flex-justify-content-end u-width-100 u-p-5"
                >
                  <RiCloseCircleLine className="u-flex-shrink-0" />
                </ButtonLinkComponent>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}
