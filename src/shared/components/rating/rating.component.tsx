import classNames from 'classnames';
import { RiStarFill } from 'react-icons/ri';

import { RatingProps } from './interfaces/rating.interface';
import styles from './rating.module.scss';

export default function RatingComponent({
  rating,
  styleClasses,
}: RatingProps): JSX.Element {
  return (
    <span
      className={classNames({
        [styles['c-rating']]: true,
        [`${styleClasses}`]: styleClasses !== undefined,
        'u-flex-shrink-0': true,
      })}
    >
      <RiStarFill className="u-mr-5" />
      {rating}
    </span>
  );
}
