import BaseService from 'core/services/base/base.service';

import { OrderCheckout } from 'features/order/interfaces/order-checkout.interface';

export default class OrderCheckoutService extends BaseService<OrderCheckout> {
  constructor() {
    super('orders');
  }
}
