import classNames from 'classnames';
import { RiAddCircleLine } from 'react-icons/ri';

import toBRL from 'core/utils/conversions/currency.util';

import ButtonLinkComponent from 'shared/components/button-link/button-link.component';
import { ClassNameProps } from 'shared/interfaces/class-name.interface';

import { RestaurantMenuItem } from 'features/restaurants/interfaces/restaurant-menu-item.interface';

import styles from './restaurant-menu-item.module.scss';

type RestaurantMenuItemProps = ClassNameProps & RestaurantMenuItem;

export default function RestaurantMenuItemComponent({
  imagePath,
  name,
  description,
  price,
  styleClasses,
}: RestaurantMenuItemProps): JSX.Element {
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
        >
          <RiAddCircleLine className="u-mr-5" />
          Adicionar
        </ButtonLinkComponent>
      </div>
    </div>
  );
}
