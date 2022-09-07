/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import { useEffect } from 'react';

import useFetch from 'core/hooks/use-fetch/use-fetch.hook';

import ErrorsComponent from 'shared/components/errors/errors.component';
import HeaderTitleComponent from 'shared/components/header-title/header-title.component';

import RestaurantComponent from '../components/restaurant/restaurant.component';
import { Restaurant } from '../interfaces/restaurant.interface';
import RestaurantsService from '../services/restaurants/restaurants.service';
import styles from './restaurants.module.scss';

export default function RestaurantsComponent(): JSX.Element {
  const { request, statusMessage, data, isLoading, errors } =
    useFetch<Restaurant[]>();

  function rendersRestaurantsOrFeedback() {
    if (data) {
      return data?.map((restaurant) => (
        <RestaurantComponent key={restaurant.id} {...restaurant} />
      ));
    }

    if (isLoading) {
      return <p>Carregando...</p>;
    }

    if (errors.length > 0) {
      return <ErrorsComponent errorTitle={statusMessage} errors={errors} />;
    }

    return <p>Não há restaurantes disponíveis no momento.</p>;
  }

  useEffect(() => {
    const restaurantsService = new RestaurantsService();

    request(restaurantsService.getAll());
  }, []);

  return (
    <section>
      <HeaderTitleComponent titleText="Restaurantes" titleColor="base-3" />
      <div
        className={classNames({
          'grid-container': true,
          [styles['l-restaurants']]: true,
          'u-gap-30': true,
        })}
      >
        {rendersRestaurantsOrFeedback()}
      </div>
    </section>
  );
}
