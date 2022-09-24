import classNames from 'classnames';
import { RiRestaurantFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

import RatingComponent from 'shared/components/rating/rating.component';

import { Restaurant } from 'features/restaurants/interfaces/restaurant.interface';

import styles from './restaurant-about.module.scss';

export default function RestaurantAboutComponent({
  category,
  rating,
  imagePath,
  name,
  about,
  deliveryEstimate,
  openingHours,
}: Partial<Restaurant>): JSX.Element {
  return (
    <div
      className={classNames({
        [styles['c-restaurant-about']]: true,
        'u-shadow-small': true,
      })}
    >
      <div
        className={classNames({
          [styles['c-restaurant-about__header']]: true,
          'u-text-center': true,
          'u-text-sm-left': true,
          'u-display-sm-flex': true,
          'u-flex-sm-justify-content-between': true,
          'u-flex-sm-align-items-center': true,
        })}
      >
        <h2 className="t2 u-display-flex u-flex-justify-content-center u-flex-align-items-center u-text-base-3 u-text-uppercase">
          <RiRestaurantFill className="u-mr-5 u-flex-shrink-0" />
          {category}
        </h2>
        <RatingComponent rating={rating as number} />
      </div>
      <div
        className={classNames({
          [styles['c-restaurant-about__content']]: true,
          'u-display-flex': true,
        })}
      >
        <img
          className={styles['c-restaurant-about__img']}
          src={imagePath}
          alt={`Logotipo do restaurante ${name}`}
        />
        <dl>
          <dt>
            <h2 className="t3 u-font-semibold u-text-base-3">Quem somos</h2>
          </dt>
          <dd
            className={classNames({
              [styles['c-restaurant-about__content--max-width-650']]: true,
              'u-mb-15': true,
            })}
          >
            {about}
          </dd>
          <dt>
            <h2 className="t3 u-font-semibold u-text-base-3">
              Tempo de entrega
            </h2>
          </dt>
          <dd className="u-mb-15">{deliveryEstimate}</dd>
          <dt>
            <h2 className="t3 u-font-semibold u-text-base-3">Funcionamento</h2>
          </dt>
          <dd>{openingHours}</dd>
        </dl>
      </div>
      <ul
        className={classNames({
          'u-display-sm-flex': true,
        })}
      >
        <li className="u-width-100">
          <NavLink
            className={({ isActive }) =>
              classNames({
                [styles['c-restaurant-about__link']]: true,
                [styles['c-restaurant-about__link--active']]: isActive,
              })
            }
            to="menu"
          >
            Cardápio
          </NavLink>
        </li>
        <li className="u-width-100">
          <NavLink
            className={({ isActive }) =>
              classNames({
                [styles['c-restaurant-about__link']]: true,
                [styles['c-restaurant-about__link--active']]: isActive,
              })
            }
            to="reviews"
          >
            Avaliações
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
