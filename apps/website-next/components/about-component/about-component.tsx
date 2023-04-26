import styles from './about-component.module.scss';

/* eslint-disable-next-line */
export interface AboutComponentProps {}

export function AboutComponent(props: AboutComponentProps) {
  return (
    <div className="text-center sm:bg-backround-full">
      <div className="font-bold text-2xl mt-8">
        <h1>About Us</h1>
      </div>
      <div className="text-xs mb-8 sm:my-0 px-8 sm:px-0">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique,
          ullam quam vero nobis autem,<br></br> quas consequuntur
          necessitatibus, ipsam ab quibusdam corporis quisquam neque doloremque
          temporibus. <br></br>Ad expedita necessitatibus inventore quas?
        </p>
      </div>
    </div>
  );
}

export default AboutComponent;
