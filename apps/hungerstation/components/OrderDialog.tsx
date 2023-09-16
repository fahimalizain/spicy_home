import React from 'react';
import { Transition } from '@headlessui/react';
import { Order } from '../swr/types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

export const OrderDialog: React.FC<Props> = ({ isOpen, onClose, order }) => {
  const styles: { [key: string]: { text: string; bg: string } } = {
    delivered: { text: 'text-green-700', bg: 'bg-green-100' },
    pending: { text: 'text-blue-500', bg: 'bg-blue-200' },
    cancelled: { text: 'text-red-500', bg: 'bg-red-200' },
  };

  if (!order) {
    return null;
  }
  return (
    <Transition show={isOpen}>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-md">
          {order ? (
            <>
              <div className="flex justify-between">
                <h1 className="text-4xl font-bold">#{order.order_id}</h1>{' '}
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
                    styles[order.status].text
                  } ${styles[order.status].bg}`}
                >
                  {order.status}
                </span>
              </h1>
              <hr />
              <h1 className="text-lg">Order Details</h1>

              <ul className="mt-5 ">
                {order.items.map((item, index) => (
                  <li
                    key={index}
                    className="my-1 xl:text-sm flex w-80 justify-between"
                  >
                    <span>{item.qty} x</span> <span>{item.itemName}</span>
                    <span>SAR {item.rate}</span>
                  </li>
                ))}
              </ul>
              <hr className="my-3" />
              <div className="flex justify-between font-semibold">
                <h3>Subtotal:</h3>
                <h3>SAR {order.subtotal}</h3>
              </div>
              {order.status === 'pending' && (
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
