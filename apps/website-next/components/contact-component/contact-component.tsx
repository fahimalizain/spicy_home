import styles from './contact-component.module.scss';

/* eslint-disable-next-line */
export interface ContactComponentProps {}

export function ContactComponent(props: ContactComponentProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ContactComponent!</h1>
    </div>
  );
}

export default ContactComponent;
