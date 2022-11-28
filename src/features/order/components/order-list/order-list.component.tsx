import { RiAddLine, RiCloseCircleLine, RiSubtractLine } from 'react-icons/ri';

import { useOrderContext } from 'core/contexts/order/order.context';
import toBRL from 'core/utils/conversions/currency.util';

import ButtonLinkComponent from 'shared/components/button-link/button-link.component';

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
  const { orderItems, addItem, removeItem } = useOrderContext();

  return orderItems.length > 0 ? (
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
        {orderItems.map((orderItem) => (
          <tr key={orderItem.id}>
            {showImage && (
              <td>
                <figure>
                  <img
                    src={orderItem.imagePath}
                    width="50"
                    height="50"
                    alt={orderItem.name}
                  />
                </figure>
              </td>
            )}
            {showName && <td>{orderItem.name}</td>}
            {showDescription && <td>{orderItem.description}</td>}
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
                  onClick={() => removeItem(orderItem)}
                >
                  <RiSubtractLine className="u-flex-shrink-0" />
                </ButtonLinkComponent>
                {orderItem.quantity}
                <ButtonLinkComponent
                  elementType="button"
                  visualType="button"
                  appearance="compact"
                  color="transparent"
                  hoverTextColor="primary"
                  type="button"
                  styleClasses="u-align-middle u-p-5"
                  onClick={() => addItem(orderItem)}
                >
                  <RiAddLine className="u-flex-shrink-0" />
                </ButtonLinkComponent>
              </td>
            )}
            {showPrice && <td>{toBRL(orderItem.price)}</td>}
            {showSubtotal && <td>{toBRL(orderItem.subtotal)}</td>}
            <td>
              <ButtonLinkComponent
                elementType="button"
                visualType="button"
                appearance="compact"
                color="transparent"
                hoverTextColor="primary"
                type="button"
                styleClasses="u-display-flex u-flex-justify-content-end u-width-100 u-p-5"
                onClick={() => removeItem(orderItem, true)}
              >
                <RiCloseCircleLine className="u-flex-shrink-0" />
              </ButtonLinkComponent>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p className="u-display-flex u-flex-justify-content-center u-flex-sm-justify-content-start u-flex-wrap u-gap-5">
      Nenhum item adicionado.
      <ButtonLinkComponent
        elementType="link"
        visualType="link"
        appearance="default"
        color="base-3"
        hoverColor="primary"
        to="/restaurants"
      >
        Buscar restaurantes
      </ButtonLinkComponent>
    </p>
  );
}
