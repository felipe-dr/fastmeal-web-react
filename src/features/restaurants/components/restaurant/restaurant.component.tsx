import classNames from 'classnames';
import { RiTimeLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import RatingComponent from 'shared/components/rating/rating.component';

import { Restaurant } from 'features/restaurants/interfaces/restaurant.interface';

import styles from './restaurant.module.scss';

export default function RestaurantComponent({
  id,
  imagePath,
  name,
  category,
  deliveryEstimate,
  rating,
}: Restaurant): JSX.Element {
  return (
    <Link
      className={classNames({
        [styles['c-restaurant']]: true,
        'u-display-flex': true,
        'u-shadow-small': true,
      })}
      to={`${id}/menu`}
    >
      <img
        className={styles['c-restaurant__img']}
        src={imagePath}
        alt={`Logotipo do restaurante ${name}`}
      />
      <div className="u-text-center u-text-sm-left">
        <h2 className="t2 u-text-base-3 u-text-uppercase">{name}</h2>
        <h3 className="t3 u-font-normal u-mb-20">{category}</h3>
        <h4 className="u-display-flex u-flex-justify-content-center u-flex-sm-justify-content-normal u-flex-align-items-center u-gap-5 u-font-normal">
          <RiTimeLine className="u-flex-shrink-0 u-text-base-3" />
          {deliveryEstimate}
        </h4>
      </div>
      <RatingComponent
        rating={rating}
        styleClasses={styles['c-restaurant__rating']}
      />
    </Link>
  );
}
