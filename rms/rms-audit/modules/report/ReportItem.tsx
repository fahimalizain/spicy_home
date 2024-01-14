import { FC } from 'react';
import { RMSAuditOrder } from '../../db/order';

type ReportItemProps = {
  order: RMSAuditOrder;
  onClick?: () => void;
};

const ReportItem: FC<ReportItemProps> = (props) => {
  const order = props.order;

  return (
    <div
      className="border-2 p-1 cursor-pointer hover:bg-gray-100 flex flex-col"
      onClick={props.onClick}
    >
      {/* Order No */}
      <div>
        <span className="text-sm text-zinc-500">Order No: </span>
        <span className="font-medium">#{order.OrderNo}</span>
      </div>
      {/* Date */}
      <div>
        <span className="text-sm text-zinc-500">Date: </span>
        <span className="font-medium">
          {new Date(order.Date.toString()).toLocaleString('en-US', {
            timeZone: 'Asia/Riyadh',
          })}
        </span>
      </div>
      {/* No. of Items */}
      <div>
        <span className="text-sm text-zinc-500">No. of Items: </span>
        <span className="font-medium">{order.items.length}</span>
      </div>
      {/* Total */}
      <div>
        <span className="text-sm text-zinc-500">Total: </span>
        <span className="font-medium">{order.Total}</span>
      </div>
      {/* removedTotal */}
      {order.removedTotal !== 0 && (
        <div>
          <span className="text-sm text-zinc-500">Removed Total: </span>
          <span className="font-medium">{order.removedTotal}</span>
        </div>
      )}
    </div>
  );
};

export default ReportItem;
