import styles from './landing-component.module.scss';

/* eslint-disable-next-line */
export interface LandingComponentProps {}

export function LandingComponent(props: LandingComponentProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to LandingComponent!</h1>
    </div>
  );
}

export default LandingComponent;
