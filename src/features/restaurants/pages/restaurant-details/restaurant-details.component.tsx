/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import useFetch from 'core/hooks/use-fetch/use-fetch.hook';

import ErrorsComponent from 'shared/components/errors/errors.component';
import HeaderTitleComponent from 'shared/components/header-title/header-title.component';
import SpinnerComponent from 'shared/components/spinner/spinner.component';

import RestaurantAboutComponent from 'features/restaurants/components/restaurant-about/restaurant-about.component';
import { Restaurant } from 'features/restaurants/interfaces/restaurant.interface';
import RestaurantsService from 'features/restaurants/services/restaurants/restaurants.service';

export default function RestaurantDetailsComponent(): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();

  const { request, statusMessage, data, isLoading, errors } =
    useFetch<Restaurant>();

  const restaurantsService = new RestaurantsService();

  useEffect(() => {
    request(restaurantsService.getById(id as string));
  }, []);

  if (isLoading) {
    return (
      <>
        <HeaderTitleComponent titleText="Restaurantes" />
        <SpinnerComponent />;
      </>
    );
  }

  if (errors.length > 0) {
    return <ErrorsComponent errorTitle={statusMessage} errors={errors} />;
  }

  if (!data) {
    navigate('not-found');
  }

  return (
    <section>
      <HeaderTitleComponent titleText={data?.name as string} />
      {data && (
        <div className="grid-container u-display-grid u-gap-30">
          <RestaurantAboutComponent {...data} />
          <Outlet />
        </div>
      )}
    </section>
  );
}
