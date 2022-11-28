/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useFetch from 'core/hooks/use-fetch/use-fetch.hook';

import ErrorsComponent from 'shared/components/errors/errors.component';
import SpinnerComponent from 'shared/components/spinner/spinner.component';

import { RestaurantReview } from 'features/restaurants/interfaces/restaurant-review.interface';
import RestaurantsService from 'features/restaurants/services/restaurants/restaurants.service';

import RestaurantReviewComponent from '../restaurant-review/restaurant-review.component';
import styles from './restaurant-reviews.module.scss';

export default function RestaurantReviewsComponent(): JSX.Element {
  const { id } = useParams();

  const { request, statusMessage, data, isLoading, errors } =
    useFetch<RestaurantReview[]>();

  const restaurantsService = new RestaurantsService();

  useEffect(() => {
    request(restaurantsService.getAllRestaurantReviewsById(id as string));
  }, []);

  if (isLoading) {
    return <SpinnerComponent />;
  }

  if (errors.length > 0) {
    return <ErrorsComponent errorTitle={statusMessage} errors={errors} />;
  }

  if (data?.length === 0) {
    return (
      <p
        className={classNames({
          [styles['l-restaurant-reviews__text']]: true,
          'u-text-center': true,
          'u-text-sm-left': true,
          'u-shadow-small': true,
        })}
      >
        Não há avaliações disponíveis no momento.
      </p>
    );
  }

  return (
    <div className={styles['l-restaurant-reviews']}>
      {data?.map((restaurantReview) => (
        <RestaurantReviewComponent
          key={restaurantReview.id}
          {...restaurantReview}
        />
      ))}
    </div>
  );
}
