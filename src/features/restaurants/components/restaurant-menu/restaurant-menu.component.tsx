/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useFetch from 'core/hooks/use-fetch/use-fetch.hook';

import ErrorsComponent from 'shared/components/errors/errors.component';

import { RestaurantMenuItem } from 'features/restaurants/interfaces/restaurant-menu-item.interface';
import RestaurantsService from 'features/restaurants/services/restaurants/restaurants.service';

import RestaurantMenuItemComponent from '../restaurant-menu-item/restaurant-menu-item.component';
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
    return <p>Carregando...</p>;
  }

  if (errors.length > 0) {
    return <ErrorsComponent errorTitle={statusMessage} errors={errors} />;
  }

  if (data?.length === 0) {
    return <p>Não há itens do cardápio disponíveis no momento.</p>;
  }

  return (
    <div className={styles['l-restaurant-menu']}>
      {data?.map((restaurantMenuItem) => (
        <RestaurantMenuItemComponent
          styleClasses={styles['l-restaurant-menu__item']}
          key={restaurantMenuItem.id}
          {...restaurantMenuItem}
        />
      ))}
      <div className={styles['l-restaurant-menu__order-list']}>
        ------------------------- Order list -------------------------
      </div>
    </div>
  );
}