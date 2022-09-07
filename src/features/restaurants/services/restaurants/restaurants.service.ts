import BaseService from 'core/services/base/base.service';

import { Restaurant } from 'features/restaurants/interfaces/restaurant.interface';

export default class RestaurantsService extends BaseService<Restaurant> {
  constructor() {
    super('restaurants');
  }
}
