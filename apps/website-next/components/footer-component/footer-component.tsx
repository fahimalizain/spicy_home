import styles from './footer-component.module.scss';

/* eslint-disable-next-line */
export interface FooterComponentProps {}

export function FooterComponent(props: FooterComponentProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to FooterComponent!</h1>
    </div>
  );
}

export default FooterComponent;
