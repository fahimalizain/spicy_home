import styles from './services-component.module.scss';

/* eslint-disable-next-line */
export interface ServicesComponentProps {}

export function ServicesComponent(props: ServicesComponentProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ServicesComponent!</h1>
    </div>
  );
}

export default ServicesComponent;
