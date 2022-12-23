import classNames from 'classnames';
import { RiAddCircleLine } from 'react-icons/ri';

import vocabulary from 'core/constants/vocabulary.constant';
import { useOrderContext } from 'core/contexts/order/order.context';
import { useToastContext } from 'core/contexts/toast/toast.context';
import toBRL from 'core/utils/conversions/currency.util';
import uuid from 'core/utils/generations/uuid';

import ButtonLinkComponent from 'shared/components/button-link/button-link.component';
import { ClassNameProps } from 'shared/interfaces/class-name.interface';

import { RestaurantMenuItem } from 'features/restaurants/interfaces/restaurant-menu-item.interface';

import styles from './restaurant-menu-item.module.scss';

type RestaurantMenuItemProps = ClassNameProps & RestaurantMenuItem;

export default function RestaurantMenuItemComponent({
  id,
  imagePath,
  name,
  description,
  price,
  styleClasses,
}: RestaurantMenuItemProps): JSX.Element {
  const { addItem } = useOrderContext();
  const { addToast } = useToastContext({});

  return (
    <div
      className={classNames({
        [styles['c-restaurant-menu-item']]: true,
        [`${styleClasses}`]: styleClasses !== undefined,
        'u-shadow-small': true,
      })}
    >
      <img
        className={classNames({
          [styles['c-restaurant-menu-item__img']]: true,
          'u-mr-sm-20': true,
          'u-mb-20': true,
          'u-mb-sm-0': true,
        })}
        src={imagePath}
        alt={name}
      />
      <h3 className="t3 u-text-base-3 u-text-uppercase">{name}</h3>
      <p className={styles['c-restaurant-menu-item__description']}>
        {description}
      </p>
      <div className="u-display-flex u-flex-wrap u-flex-justify-content-center u-flex-sm-justify-content-start u-flex-align-items-center u-gap-20">
        <span className="u-text-base-3 u-font-semibold">{toBRL(price)}</span>
        <ButtonLinkComponent
          elementType="button"
          visualType="button"
          appearance="compact"
          color="transparent"
          hoverTextColor="primary"
          type="button"
          styleClasses="u-display-flex u-flex-align-items-center u-px-5"
          onClick={() => {
            addItem({
              id,
              name,
              description,
              price,
              imagePath,
              quantity: 0,
              subtotal: 0,
            });
            addToast({
              id: uuid(),
              title: `${vocabulary.ORDER}`,
              type: 'info',
              message: `${name} adicionado.`,
            });
          }}
        >
          <RiAddCircleLine className="u-mr-5" />
          Adicionar
        </ButtonLinkComponent>
      </div>
    </div>
  );
}
