import classNames from 'classnames';
import { RiBankCard2Line } from 'react-icons/ri';

import { useOrderContext } from 'core/contexts/order/order.context';
import toBRL from 'core/utils/conversions/currency.util';

import ButtonLinkComponent from 'shared/components/button-link/button-link.component';

export default function OrderTotalPayableComponent(): JSX.Element {
  const { shipping, orderSubtotal, orderTotal } = useOrderContext();

  return (
    <>
      <legend
        className={classNames({
          't2 u-text-base-3 u-text-uppercase u-font-semibold': true,
          'u-border-bottom-1': true,
          'u-mb-20 u-pb-5': true,
        })}
      >
        Total
      </legend>
      <table className="u-width-100">
        <tbody>
          <tr>
            <th scope="row">Frete</th>
            <td className="u-text-right">{toBRL(shipping)}</td>
          </tr>
          <tr>
            <th scope="row">Subtotal</th>
            <td className="u-text-right">{toBRL(orderSubtotal)}</td>
          </tr>
          <tr>
            <th scope="row">Total</th>
            <td className="u-text-right">{toBRL(orderTotal)}</td>
          </tr>
        </tbody>
      </table>
      <ButtonLinkComponent
        elementType="button"
        visualType="button"
        appearance="default"
        color="base-3"
        hoverColor="primary"
        styleClasses="u-display-flex u-flex-align-items-center u-flex-justify-content-center u-justify-self-sm-end"
        type="submit"
      >
        <RiBankCard2Line className="u-flex-shrink-0 u-mr-5" />
        Fechar pedido
      </ButtonLinkComponent>
    </>
  );
}
