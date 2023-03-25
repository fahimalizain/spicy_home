import styles from './header-component.module.scss';

/* eslint-disable-next-line */
export interface HeaderComponentProps {}

export function HeaderComponent(props: HeaderComponentProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to HeaderComponent!</h1>
    </div>
  );
}

export default HeaderComponent;
