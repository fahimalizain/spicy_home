import { FC } from 'react';
import { formatRiyadhDateTime } from '../..//utils/date';
import { RMSAuditOrderItem } from '../../db/order';
import { useAuditOrder } from '../../swr';
import { SaudiRiyal } from '../../utils/currnecy';
import AuditLogItem from './AuditLogItem';
import OrderItem from './OrderItem';

type OrderDetailsViewProps = {
  orderNo: string;
};

const OrderDetailsView: FC<OrderDetailsViewProps> = (props) => {
  const { data } = useAuditOrder(props.orderNo);

  if (data && !data.success) {
    return <div>Order not found</div>;
  }

  const order = data?.order;

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid gap-2 md:grid-flow-col auto-rows-auto md:grid-rows-[5em_1fr_5em] grid-cols-1 md:grid-cols-2">
      <div>
        {/* Order No */}
        <div>
          <span className="text-sm text-zinc-500">Order No: </span>
          <span className="font-medium">#{order.OrderNo}</span>
        </div>
        {/* Date */}
        <div>
          <span className="text-sm text-zinc-500">Date: </span>
          <span className="font-medium">
            {formatRiyadhDateTime(order.Date)}
          </span>
        </div>
        {/* No. of Items */}
        <div>
          <span className="text-sm text-zinc-500">No. of Items: </span>
          <span className="font-medium">{order.items.length}</span>
        </div>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-1 my-2">
        {(order.items satisfies RMSAuditOrderItem[]).map((item, index) => (
          <OrderItem key={index} item={item as RMSAuditOrderItem} />
        ))}
      </div>

      <div>
        {/* NetTotal */}
        {order.NetTotal !== order.Total && (
          <div>
            <span className="text-sm text-zinc-500">Net Total: </span>
            <span className="font-medium">
              {SaudiRiyal(order.NetTotal).format()}
            </span>
          </div>
        )}
        {/* Total */}
        <div>
          <span className="text-sm text-zinc-500">Total: </span>
          <span className="font-medium">
            {SaudiRiyal(order.Total).format()}
          </span>
        </div>
        {/* Removed Total */}
        {order.removedTotal !== 0 && (
          <div>
            <span className="text-sm text-zinc-500">Removed Total: </span>
            <span className="font-medium">
              {SaudiRiyal(order.removedTotal).format()}
            </span>
          </div>
        )}
        {/* Discount */}
      </div>

      {/* Timeline */}
      <div className="md:row-span-3 flex flex-col gap-1">
        Timeline
        <div className="overflow-y-auto max-h-[50em] flex flex-col gap-1">
          {order.auditLogs.map((auditLog, index) => (
            <AuditLogItem key={index} auditLog={auditLog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsView;
