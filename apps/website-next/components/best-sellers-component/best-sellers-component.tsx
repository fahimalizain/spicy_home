import styles from './best-sellers-component.module.scss';

/* eslint-disable-next-line */
export interface BestSellersComponentProps {}

export function BestSellersComponent(props: BestSellersComponentProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to BestSellersComponent!</h1>
    </div>
  );
}

export default BestSellersComponent;
