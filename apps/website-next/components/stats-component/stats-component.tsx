/* eslint-disable-next-line */
export interface StatsComponentProps {}

export function StatsComponent(props: StatsComponentProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3  sm:items-center flex sm:flex-row sm:justify-items-center py-20  ">
      <div className=" flex items-center flex-col space-y-4  ">
        <img
          src="/images/stats-Years-of-excellence-icon.svg"
          className=" sm:w-32 sm:h-24 w-20 h-14 "
          alt="diamond"
        ></img>
        <h1 className="sm:text-6xl text-3xl font-black  font-semibold  ">
          19+
        </h1>
        <h2 className="text-lg">Years of excellence</h2>
      </div>

      <div className=" flex items-center flex-col space-y-4 my-4  ">
        <img
          src="/images/stats-happy-customer-icon.svg"
          className=" sm:w-32 sm:h-24 w-20 h-14 "
          alt="food"
        ></img>
        <h1 className="sm:text-6xl text-3xl font-black  font-semibold  ">
          100,000+
        </h1>
        <h2 className="text-lg">Happy custemers</h2>
      </div>
      <div className=" flex items-center flex-col space-y-4 my-4 ">
        <img
          src="/images/stats-item-choos-icon.svg"
          className=" sm:w-32 sm:h-24 w-20 h-14 "
          alt="food"
        ></img>
        <h1 className="sm:text-6xl text-3xl font-black  font-semibold  ">
          100+
        </h1>
        <h2 className="text-lg">Items to choose from</h2>
      </div>
    </div>
  );
}

export default StatsComponent;
