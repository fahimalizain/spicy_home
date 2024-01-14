import ReportItem from './ReportItem';
import { RMSAuditOrder } from '../../db/order';
import { FC } from 'react';
import { useRouter } from 'next/router';

type ReportBodyProps = {
  orders: RMSAuditOrder[];
};

const ReportBody: FC<ReportBodyProps> = ({ orders }) => {
  const router = useRouter();
  return (
    <div
      className="overflow-y-auto grid gap-1"
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(14em, 1fr))',
        gridAutoRows: 'minmax(10em, 1fr)',
      }}
    >
      {orders.map((order, index) => (
        <ReportItem
          key={index}
          order={order}
          onClick={() =>
            router.push({
              pathname: `/order-report/[orderNo]`,
              query: {
                orderNo: order.OrderNo,
              },
            })
          }
        />
      ))}
    </div>
  );
};

export default ReportBody;
