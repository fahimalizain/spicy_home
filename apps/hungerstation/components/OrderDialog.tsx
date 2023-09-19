import React from 'react';
import { Transition } from '@headlessui/react';
import { OrderMeta, OrderStatus } from '../swr/types';
import { useOrderDetail } from '../swr/get-order';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  meta: OrderMeta | null;
}

export const OrderDialog: React.FC<Props> = ({ isOpen, onClose, meta }) => {
  const styles: Record<OrderStatus, { text: string; bg: string }> = {
    DELIVERED: { text: 'text-green-700', bg: 'bg-green-100' },
    IN_PROGRESS: { text: 'text-blue-500', bg: 'bg-blue-200' },
    CANCELLED: { text: 'text-red-500', bg: 'bg-red-200' },
  };

  const { data: order } = useOrderDetail({
    orderId: meta?.orderId,
    placedTimestamp: meta?.placedTimestamp,
  });

  if (!meta) {
    return null;
  }

  return (
    <Transition show={isOpen}>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-md">
          {meta ? (
            <>
              <div className="flex justify-between">
                <h1 className="text-4xl font-bold">#{meta.orderId}</h1>{' '}
                <button
                  className="uppercase text-sm text-slate-500 pl-10 py-5"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
              <h6 className="text-xs text-gray-500">Spicy Home Restaurant</h6>
              <h1 className="py-4 uppercase text-[10px] font-bold">
                <span
                  className={`rounded-md tracking-wide p-[5px] ${
                    styles[meta.orderStatus].text
                  } ${styles[meta.orderStatus].bg}`}
                >
                  {meta.orderStatus}
                </span>
              </h1>
              <hr />
              <h1 className="text-lg">Order Details</h1>
              {order && (
                <ul className="mt-5 ">
                  {order.order.items.map((item, index) => (
                    <li
                      key={index}
                      className="my-1 xl:text-sm flex w-80 justify-between"
                    >
                      <span>{item.quantity} x</span> <span>{item.name}</span>
                      <span>SAR {item.unitPrice}</span>
                    </li>
                  ))}
                </ul>
              )}
              <hr className="my-3" />
              <div className="flex justify-between font-semibold">
                <h3>Subtotal:</h3>
                <h3>SAR {meta.subtotal}</h3>
              </div>
              {meta.orderStatus === 'IN_PROGRESS' && (
                <button className="w-full mt-8 text-center uppercase p-5 bg-blue-600 rounded-lg text-white">
                  Kitchen Print
                </button>
              )}
            </>
          ) : (
            <h1>No order selected</h1>
          )}
        </div>
      </div>
    </Transition>
  );
};

export default OrderDialog;
