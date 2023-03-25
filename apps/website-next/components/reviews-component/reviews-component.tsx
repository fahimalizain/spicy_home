import styles from './reviews-component.module.scss';

/* eslint-disable-next-line */
export interface ReviewsComponentProps {}

export function ReviewsComponent(props: ReviewsComponentProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ReviewsComponent!</h1>
    </div>
  );
}

export default ReviewsComponent;
