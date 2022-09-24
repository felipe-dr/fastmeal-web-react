import BaseService from 'core/services/base/base.service';

import { HttpResponse } from 'shared/interfaces/http-response.interface';

import { RestaurantMenuItem } from 'features/restaurants/interfaces/restaurant-menu-item.interface';
import { RestaurantReview } from 'features/restaurants/interfaces/restaurant-review.interface';
import { Restaurant } from 'features/restaurants/interfaces/restaurant.interface';

export default class RestaurantsService extends BaseService<Restaurant> {
  constructor() {
    super('restaurants');
  }

  public getAllRestaurantMenuById(
    restaurantId: string
  ): Promise<HttpResponse<RestaurantMenuItem[]>> {
    return this.http.get<RestaurantMenuItem[]>(
      `${this.endpoint}/${restaurantId}/menu`
    );
  }

  public getAllRestaurantReviewsById(
    restaurantId: string
  ): Promise<HttpResponse<RestaurantReview[]>> {
    return this.http.get<RestaurantReview[]>(
      `${this.endpoint}/${restaurantId}/reviews`
    );
  }
}
