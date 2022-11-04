import classNames from 'classnames';

import HeaderTitleComponent from 'shared/components/header-title/header-title.component';

import OrderAccountFormComponent from 'features/order/components/order-account-form/order-account-form.component';
import OrderAddressFormComponent from 'features/order/components/order-address-form/order-address-form.component';
import OrderListComponent from 'features/order/components/order-list/order-list.component';
import OrderPaymentFormComponent from 'features/order/components/order-payment-form/order-payment-form.component';
import OrderPersonalFormComponent from 'features/order/components/order-personal-form/order-personal-form.component';
import OrderTotalPayableComponent from 'features/order/components/order-total-payable/order-total-payable.component';
import useOrderForm from 'features/order/hooks/use-order-form/use-order-form.hook';

import orderListStyles from '../../components/order-list/order-list.module.scss';
import orderCheckoutStyles from './order-checkout.module.scss';

export default function OrderCheckoutComponent(): JSX.Element {
  const { formFields, paymentMethodRadio, onSubmit } = useOrderForm();

  return (
    <section>
      <HeaderTitleComponent
        titleText="Finalização do pedido"
        disableRoute="order"
      />
      <div className="grid-container u-display-grid u-gap-30">
        <form
          className={classNames({
            [orderCheckoutStyles['l-order-checkout']]: true,
            'u-shadow-small': true,
          })}
          onSubmit={(event) => onSubmit(event)}
        >
          <fieldset
            className={classNames({
              [orderCheckoutStyles['l-order-checkout__group']]: true,
              [orderCheckoutStyles['l-order-checkout__group--full-width']]:
                true,
              [orderCheckoutStyles['l-order-checkout__group--2-col']]: true,
            })}
          >
            <OrderPersonalFormComponent formFields={formFields} />
          </fieldset>
          <fieldset
            className={classNames({
              [orderCheckoutStyles['l-order-checkout__group']]: true,
              [orderCheckoutStyles['l-order-checkout__group--full-width']]:
                true,
              [orderCheckoutStyles['l-order-checkout__group--2-col']]: true,
            })}
          >
            <OrderAccountFormComponent formFields={formFields} />
          </fieldset>
          <fieldset
            className={classNames({
              [orderCheckoutStyles['l-order-checkout__group']]: true,
              [orderCheckoutStyles['l-order-checkout__group--full-width']]:
                true,
              [orderCheckoutStyles['l-order-checkout__group--2-col']]: true,
            })}
          >
            <OrderAddressFormComponent formFields={formFields} />
          </fieldset>
          <fieldset
            className={classNames({
              [orderListStyles['c-order-list__container']]: true,
              [orderListStyles['c-order-list__container--max-height-medium']]:
                true,
              [orderListStyles['c-order-list__container--min-inline-initial']]:
                true,
              [orderCheckoutStyles['l-order-checkout__group--full-width']]:
                true,
            })}
          >
            <legend
              className={classNames({
                't2 u-text-base-3 u-text-uppercase u-font-semibold': true,
                'u-border-bottom-1': true,
                'u-mb-20 u-pb-5': true,
              })}
            >
              Itens do pedido
            </legend>
            <OrderListComponent />
          </fieldset>
          <fieldset className="u-display-grid u-flex-align-content-start u-gap-5">
            <OrderPaymentFormComponent
              paymentMethodRadio={paymentMethodRadio}
            />
          </fieldset>
          <fieldset className={orderCheckoutStyles['l-order-checkout__group']}>
            <OrderTotalPayableComponent />
          </fieldset>
        </form>
      </div>
    </section>
  );
}
