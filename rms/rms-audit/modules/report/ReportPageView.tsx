import ReportHeader from './ReportHeader';
import ReportBody from './ReportBody';
import ReportFooter from './ReportFooter';
import { FC } from 'react';
import { useReport } from '../../swr';

type ReportPageViewProps = {
  from: string;
  to: string;
};

const ReportPageView: FC<ReportPageViewProps> = ({ from, to }) => {
  const { data } = useReport(from, to);

  if (!data || !data.success) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-screen p-2 grid grid-rows-[4em_1fr_12em] sm:grid-rows-[2em_1fr_12em]">
      <ReportHeader />
      <ReportBody orders={data.orders} />
      <ReportFooter
        from={from}
        to={to}
        numOrders={data.numOrders}
        periodTotal={data.periodTotal}
        periodRemovedTabletTotal={data.periodRemovedTabletTotal}
        periodRemovedSystemTotal={data.periodRemovedSystemTotal}
        periodRemovedTotal={data.periodRemovedTotal}
        periodKitchenTotal={data.periodKitchenTotal}
      />
    </div>
  );
};

export default ReportPageView;
