import { useOrderContext } from 'core/contexts/order/order.context';

import BadgeComponent from 'shared/components/badge/badge.component';

export default function OrderTotalBadgeComponent(): JSX.Element {
  const { orderItemsQuantity } = useOrderContext();

  return (
    <BadgeComponent
      text={orderItemsQuantity}
      styleClasses="u-top-5 u-left-75"
    />
  );
}
