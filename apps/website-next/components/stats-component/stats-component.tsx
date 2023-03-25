import styles from './stats-component.module.scss';

/* eslint-disable-next-line */
export interface StatsComponentProps {}

export function StatsComponent(props: StatsComponentProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to StatsComponent!</h1>
    </div>
  );
}

export default StatsComponent;
