import styles from './services-component.module.scss';

/* eslint-disable-next-line */
export interface ServicesComponentProps {}

export function ServicesComponent(props: ServicesComponentProps) {
  return (
    <div className="bg-backround-full sm:rounded-b-3xl sm:rounded-bt-none">
      <div className=" font-bold text-2xl mt-16 mb-24 text-center">
        <h1>Our Services</h1>
      </div>
      <div className="grid grid-cols-2  sm:grid-cols-2  sm:place-items-center	flex  sm:gap-16 mb-12">
        <div className=" relative flex  gap-4 flex-col sm:flex-row sm:gap-2 items-center  sm:border-0  box-border border-r border-b text-center  pr-10 pb-10  sm:pr-0 sm:pb-0">
          <img
            src="/images/service-delivery-icon.svg"
            className=" sm:w-28  w-20 h-14 relative  sm:b-4 "
            alt="food"
          ></img>
          <h1 className=" sm:text-lg font-semibold text-xs ">
            24/7 Fast delivery
          </h1>
        </div>

        <div className="box-border  flex gap-4 flex-col sm:flex-row  sm:gap-2 items-center sm:border-0  box-border border-l border-b text-center pl-10 sm:pl-0">
          <img
            src="/images/service-cuisine.svg"
            className=" sm:w-28  w-20 h-14 relative sm:b-4  "
            alt="food"
          ></img>
          <h1 className="  sm:text-lg font-semibold text-xs ">
            Exotic Indian Cuisine
          </h1>
        </div>
        <div className="box-border  flex gap-4 flex-col sm:flex-row  sm:gap-2 items-center  sm:border-0  box-border border-r border-t text-center pr-10 pt-10 sm:pr-0 sm:pt-0">
          <img
            src="/images/service-takeaways-icon.svg"
            className=" sm:w-28  w-20 h-14 relative sm:b-4 "
            alt="food"
          ></img>
          <h1 className=" sm:text-lg font-semibold text-xs ">
            Orderly Takeaways
          </h1>
        </div>
        <div className="box-border  flex gap-4 flex-col sm:flex-row  sm:gap-2 items-center  sm:border-0  box-border border-t border-l text-center pl-10 pt-10 sm:pl-0 sm:pt-0">
          <img
            src="/images/service-Hungerstation.svg"
            className=" sm:w-28  w-20 h-14 relative sm:b-4  "
            alt="food"
          ></img>
          <h1 className=" sm:text-lg font-semibold text-xs  ">
            Order on Hungerstation
          </h1>
        </div>
      </div>
    </div>
  );
}

export default ServicesComponent;
