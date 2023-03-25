import styles from './about-component.module.scss';

/* eslint-disable-next-line */
export interface AboutComponentProps {}

export function AboutComponent(props: AboutComponentProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to AboutComponent!</h1>
    </div>
  );
}

export default AboutComponent;
