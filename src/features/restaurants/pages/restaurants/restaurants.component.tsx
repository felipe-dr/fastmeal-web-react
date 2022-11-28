/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import { useEffect } from 'react';

import useFetch from 'core/hooks/use-fetch/use-fetch.hook';

import ErrorsComponent from 'shared/components/errors/errors.component';
import HeaderTitleComponent from 'shared/components/header-title/header-title.component';
import SpinnerComponent from 'shared/components/spinner/spinner.component';

import RestaurantComponent from '../../components/restaurant/restaurant.component';
import { Restaurant } from '../../interfaces/restaurant.interface';
import RestaurantsService from '../../services/restaurants/restaurants.service';
import styles from './restaurants.module.scss';

export default function RestaurantsComponent(): JSX.Element {
  const { request, statusMessage, data, isLoading, errors } =
    useFetch<Restaurant[]>();

  function rendersRestaurantsOrFeedback() {
    if (isLoading) {
      return <SpinnerComponent />;
    }

    if (errors.length > 0) {
      return <ErrorsComponent errorTitle={statusMessage} errors={errors} />;
    }

    if (data) {
      if (data.length === 0) {
        return (
          <p className="u-text-center">
            Não há restaurantes disponíveis no momento.
          </p>
        );
      }

      return data?.map((restaurant) => (
        <RestaurantComponent key={restaurant.id} {...restaurant} />
      ));
    }

    return null;
  }

  useEffect(() => {
    const restaurantsService = new RestaurantsService();

    request(restaurantsService.getAll());
  }, []);

  return (
    <section>
      <HeaderTitleComponent titleText="Restaurantes" />
      <div
        className={classNames({
          'grid-container': true,
          [styles['l-restaurants']]: data && data.length > 0,
        })}
      >
        {rendersRestaurantsOrFeedback()}
      </div>
    </section>
  );
}
