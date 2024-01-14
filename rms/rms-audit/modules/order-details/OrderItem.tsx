import { FC } from 'react';
import { RMSAuditOrderItem } from '../../db/order';
import { SaudiRiyal } from '../../utils/currnecy';

type OrderItemProps = {
  item: RMSAuditOrderItem;
};

const OrderItem: FC<OrderItemProps> = ({ item }) => (
  <div className="bg-gray-100 hover:bg-gray-300 p-2 rounded-md flex justify-between items-center">
    <div className="flex flex-col">
      <span className="text-md font-medium">{item.Name}</span>
      <span className="text-sm">{SaudiRiyal(item.Rate).format()}</span>
    </div>

    <span>x{item.Qty}</span>
  </div>
);

export default OrderItem;
