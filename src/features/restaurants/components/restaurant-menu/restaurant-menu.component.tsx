/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useFetch from 'core/hooks/use-fetch/use-fetch.hook';

import ErrorsComponent from 'shared/components/errors/errors.component';
import SpinnerComponent from 'shared/components/spinner/spinner.component';

import { RestaurantMenuItem } from 'features/restaurants/interfaces/restaurant-menu-item.interface';
import RestaurantsService from 'features/restaurants/services/restaurants/restaurants.service';

import RestaurantMenuItemComponent from '../restaurant-menu-item/restaurant-menu-item.component';
import RestaurantOrderListComponent from '../restaurant-order-list/restaurant-order-list.component';
import styles from './restaurant-menu.module.scss';

export default function RestaurantMenuComponent(): JSX.Element {
  const { id } = useParams();

  const { request, statusMessage, data, isLoading, errors } =
    useFetch<RestaurantMenuItem[]>();

  const restaurantsService = new RestaurantsService();

  useEffect(() => {
    request(restaurantsService.getAllRestaurantMenuById(id as string));
  }, []);

  if (isLoading) {
    return <SpinnerComponent />;
  }

  if (errors.length > 0) {
    return <ErrorsComponent errorTitle={statusMessage} errors={errors} />;
  }

  return (
    <div className={styles['l-restaurant-menu']}>
      {data?.length === 0 ? (
        <p
          className={classNames({
            [styles['l-restaurant-menu__text']]: true,
            'u-text-center': true,
            'u-text-sm-left': true,
            'u-shadow-small': true,
          })}
        >
          Não há itens do cardápio disponíveis no momento.
        </p>
      ) : (
        data?.map((restaurantMenuItem) => (
          <RestaurantMenuItemComponent
            styleClasses={styles['l-restaurant-menu__item']}
            key={restaurantMenuItem.id}
            {...restaurantMenuItem}
          />
        ))
      )}
      <RestaurantOrderListComponent />
    </div>
  );
}
