import React, { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { OrderMeta, OrderStatus } from '../swr/types';
import { useOrderDetail } from '../swr/get-order';
import { KitchenPrintResponse, useKitchenPrint } from '../swr/kitchen-print';
import clsx from 'clsx';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  meta: OrderMeta | null;
}

export const OrderDialog: React.FC<Props> = ({ isOpen, onClose, meta }) => {
  const [isPrepaid, setIsPrepaid] = useState(true);

  const styles: Record<OrderStatus, { text: string; bg: string }> = {
    DELIVERED: { text: 'text-green-700', bg: 'bg-green-100' },
    IN_PROGRESS: { text: 'text-blue-500', bg: 'bg-blue-200' },
    CANCELLED: { text: 'text-red-500', bg: 'bg-red-200' },
  };

  const { data } = useOrderDetail({
    orderId: meta?.orderId,
    placedTimestamp: meta?.placedTimestamp,
  });

  const { trigger: kitchenPrint, isMutating } = useKitchenPrint();
  const [printStatus, setPrintStatus] = useState<KitchenPrintResponse | null>(
    null
  );

  const handleKitchenPrint = async () => {
    if (!data || isMutating) {
      return;
    }
    const r = await kitchenPrint({ order: { ...data.order, isPrepaid } });
    setPrintStatus(r);

    if (r.success) {
      setTimeout(() => onClose(), 3000);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      // Clear print status when dialog is closed
      setPrintStatus(null);
    }
  }, [isOpen]);

  if (!meta) {
    return null;
  }

  console.info('isMutating', isMutating);

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
              {data && (
                <ul className="mt-5 ">
                  {data.order.items.map((item, index) => (
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
              {data?.order && (
                <div className="flex flex-col gap-2 mt-4">
                  <div className="flex justify-stretch gap-2">
                    <button
                      onClick={() => setIsPrepaid(true)}
                      className={clsx(
                        'grow px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
                        {
                          'text-white bg-green-600 hover:bg-green-700 focus:ring-green-500':
                            isPrepaid,
                        }
                      )}
                    >
                      PREPAID
                    </button>
                    <button
                      onClick={() => setIsPrepaid(false)}
                      className={clsx(
                        'grow px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
                        {
                          'text-white bg-green-600 hover:bg-green-700 focus:ring-green-500':
                            !isPrepaid,
                        }
                      )}
                    >
                      POSTPAID
                    </button>
                  </div>
                  <button
                    disabled={isMutating}
                    className={
                      'w-full text-center uppercase p-5 bg-blue-600 rounded-lg text-white' +
                      (isMutating
                        ? ' opacity-50 cursor-not-allowed bg-gray-500'
                        : '')
                    }
                    onClick={handleKitchenPrint}
                  >
                    Kitchen Print
                  </button>
                  {!isMutating && printStatus && (
                    <div
                      className={clsx(
                        'p-4 mb-4 text-sm text-center rounded-lg ',
                        {
                          'bg-green-50 dark:bg-gray-800 text-green-800 dark:text-green-400':
                            printStatus.success,
                          'bg-red-50 dark:bg-gray-800 text-red-800 dark:text-red-400':
                            !printStatus.success,
                        }
                      )}
                      role="alert"
                    >
                      <span className="font-medium">
                        {printStatus.success ? 'Success! ' : 'Error: '}
                      </span>
                      {printStatus.message}
                    </div>
                  )}
                </div>
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
