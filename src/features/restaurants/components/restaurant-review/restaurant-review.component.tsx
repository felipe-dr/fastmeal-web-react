/* eslint-disable import/no-duplicates */
import classNames from 'classnames';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import RatingComponent from 'shared/components/rating/rating.component';

import { RestaurantReview } from 'features/restaurants/interfaces/restaurant-review.interface';

import styles from './restaurant-review.module.scss';

export default function RestaurantReviewComponent({
  name,
  date,
  rating,
  comments,
}: RestaurantReview): JSX.Element {
  function rendersReviewReaction(ratingNote: number): {
    reactionImage: string;
    reactionAlt: string;
  } {
    const path = '/images/reactions';
    const alt = `Cliente ${name} reagiu com`;

    if (ratingNote < 3) {
      return {
        reactionImage: `${path}/pissed.png`,
        reactionAlt: `${alt} insatisfação`,
      };
    }

    if (ratingNote >= 3 && ratingNote < 4) {
      return {
        reactionImage: `${path}/soso.png`,
        reactionAlt: `${alt} parcialmente satisfeito`,
      };
    }

    return {
      reactionImage: `${path}/loved.png`,
      reactionAlt: `${alt} satisfação`,
    };
  }

  const { reactionImage, reactionAlt } = rendersReviewReaction(rating);

  return (
    <blockquote
      className={classNames({
        [styles['c-restaurant-review']]: true,
        'u-shadow-small': true,
      })}
    >
      <img
        className={styles['c-restaurant-review__img']}
        src={reactionImage}
        alt={reactionAlt}
      />
      <div
        className={classNames({
          [styles['c-restaurant-review__publication']]: true,
          'u-width-100': true,
          'u-width-sm-auto': true,
        })}
      >
        <cite className="u-font-bold u-text-base-3 u-text-capitalize">
          {name}
        </cite>
        <time
          className={classNames({
            [styles['c-restaurant-review__date']]: true,
            s2: true,
            'u-display-block': true,
          })}
        >
          {format(new Date(date), 'P', { locale: ptBR })}
        </time>
      </div>
      <RatingComponent
        styleClasses={styles['c-restaurant-review__rating']}
        rating={rating}
      />
      <p className={styles['c-restaurant-review__comments']}>{comments}</p>
    </blockquote>
  );
}
