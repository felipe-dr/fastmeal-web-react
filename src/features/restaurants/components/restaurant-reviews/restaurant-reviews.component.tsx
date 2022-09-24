/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useFetch from 'core/hooks/use-fetch/use-fetch.hook';

import ErrorsComponent from 'shared/components/errors/errors.component';

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
    return <p>Carregando...</p>;
  }

  if (errors.length > 0) {
    return <ErrorsComponent errorTitle={statusMessage} errors={errors} />;
  }

  if (data?.length === 0) {
    return <p>Não há avaliações disponíveis no momento.</p>;
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
