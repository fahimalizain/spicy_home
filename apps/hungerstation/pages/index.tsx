// import styles from './index.module.scss';
import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import React from 'react';
import FilterDropdown from '../components/FilterDropdown';
import { OrderDialog } from '../components/OrderDialog';
import { FaSearch, FaRedo } from 'react-icons/fa';
import { OrderMeta, OrderStatus } from '../swr/types';
import { useOrders } from '../swr/list-orders/hook';
import useDebouncedValue from '../hooks/useDebouncedValue';

export function Index() {
  const styles: Record<OrderStatus, { text: string; bg: string }> = {
    DELIVERED: { text: 'text-green-500', bg: 'bg-green-100' },
    IN_PROGRESS: { text: 'text-blue-500', bg: 'bg-blue-200' },
    CANCELLED: { text: 'text-red-500', bg: 'bg-red-200' },
  };

  const { data: ordersResponse, mutate, isValidating } = useOrders();
  const _isLoading = useDebouncedValue(isValidating, 1000) || isValidating;

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState<OrderMeta | null>(
    null
  );

  const openDialog = (order: OrderMeta) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };
  const [searchTerm, setSearchTerm] = useState('');
  const knownStatuses = useMemo(
    () => ['DELIVERED', 'IN_PROGRESS', 'CANCELLED'],
    []
  );
  const [selectedStatuses, setSelectedStatuses] = useState<OrderStatus[]>([
    'DELIVERED',
    'IN_PROGRESS',
    'CANCELLED',
  ]);
  const [filteredOrders, setFilteredOrders] = useState(
    ordersResponse?.orders ?? []
  );

  const handleCheckboxChange = (status: OrderStatus) => {
    setSelectedStatuses((prevSelected) =>
      prevSelected.includes(status)
        ? prevSelected.filter((s) => s !== status)
        : [...prevSelected, status]
    );
  };

  useEffect(() => {
    setFilteredOrders(
      (ordersResponse?.orders ?? []).filter((order) => {
        if (selectedStatuses.includes(order.orderStatus)) {
          return true;
        }

        if (!knownStatuses.includes(order.orderStatus)) {
          order.orderStatus = 'IN_PROGRESS';
          return true;
        }

        return false;
      })
    );
  }, [knownStatuses, ordersResponse, selectedStatuses]);

  return (
    <div
      className="font-sans wrapper"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      {isDialogOpen && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-50 z-40"
          onClick={() => setIsDialogOpen(false)}
        ></div>
      )}
      <div>
        <OrderDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          meta={selectedOrder}
        />
      </div>
      <div className="container pt-12 text-black">
        <div className="flex justify-center gap-10">
          <Image
            width={120}
            height={100}
            alt="hungerstation"
            src="/hungerstation.svg"
          ></Image>
          <Image
            width={100}
            height={100}
            alt="spicyhome"
            src="/spicyhome.png"
          ></Image>
        </div>
        <h1 className="text-3xl font-semibold text-center mt-10 mb-5">
          Orders
        </h1>
        <div className="flex justify-between gap-4">
          <div className="flex gap-2">
            <button
              disabled={_isLoading}
              onClick={mutate}
              className="flex items-center gap-2 border-2 border-slate-300 rounded-full px-3 py-1 w-42"
            >
              <FaRedo className={_isLoading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
            <FilterDropdown
              selectedStatuses={selectedStatuses}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>

          <div className="flex items-center justify-between border-2 border-slate-300 rounded-full px-3 py-1 w-72">
            <input
              type="text"
              placeholder="Search Order"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch />
          </div>
        </div>
        <h1 className="text-xl mt-5">Today</h1>
        <div className="rounded-3xl border-2 border-slate-100 p-7">
          <table className="table-auto w-full text-sm divide-y">
            <thead>
              <tr className="cursor-pointer uppercase text-left md:text-xs text-gray-500 font-bold">
                <th className="font-light px-1 md:px-5">Status</th>
                <th className="font-light px md:px-4">Order ID</th>
                <th className="font-light text-right">Subtotal</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredOrders.map((order, index) => (
                <tr
                  key={index}
                  onClick={() => openDialog(order)}
                  className="hover:bg-slate-100 rounded-lg"
                >
                  <td className="py-7 uppercase text-[15px] xl:text-[10px] font-bold">
                    <span
                      className={`rounded-md tracking-wide p-[5px] mx-1 md:mx-5 ${
                        styles[order.orderStatus].text
                      } ${styles[order.orderStatus].bg}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  <td className="py-7 md:px-4 text-xl">#{order.orderId}</td>
                  <td className="py-7 text-xl  text-right pr-2">
                    SAR {order.subtotal}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h1 className="text-xl mt-5">Yesterday</h1>
        <div className="rounded-3xl border-2 border-slate-100 md:p-10">
          <table className="table-auto w-full text-sm divide-y">
            <thead>
              <tr className="cursor-pointer uppercase text-left md:text-xs text-gray-500 font-bold">
                <th className="font-light px-1 md:px-5">Status</th>
                <th className="font-light px md:px-4">Order ID</th>
                <th className="font-light text-right">Subtotal</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredOrders.map((order, index) => (
                <tr
                  key={index}
                  onClick={() => openDialog(order)}
                  className="hover:bg-slate-100 rounded-lg"
                >
                  <td className="py-7 uppercase text-[14px] xl:text-[10px] font-bold">
                    <span
                      className={`rounded-md tracking-wide p-[5px] mx-1 md:mx-5 ${
                        styles[order.orderStatus].text
                      } ${styles[order.orderStatus].bg}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  <td className="py-7 md:px-4 text-xl">#{order.orderId}</td>
                  <td className="py-7 text-xl text-right pr-2">
                    SAR {order.subtotal}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h1 className="text-xl mt-5">01-09-2023</h1>
        <div className="rounded-3xl border-2 border-slate-100 md:p-10">
          <table className="table-auto w-full text-sm divide-y">
            <thead>
              <tr className="cursor-pointer uppercase text-left md:text-xs text-gray-500 font-bold">
                <th className="font-light px-1 md:px-5">Status</th>
                <th className="font-light px md:px-4">Order ID</th>
                <th className="font-light text-right">Subtotal</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredOrders.map((order, index) => (
                <tr
                  key={index}
                  onClick={() => openDialog(order)}
                  className="hover:bg-slate-100 rounded-lg"
                >
                  <td className="py-7 uppercase text-[14px] xl:text-[10px] font-bold">
                    <span
                      className={`rounded-md tracking-wide p-[5px] mx-1 md:mx-5 ${
                        styles[order.orderStatus].text
                      } ${styles[order.orderStatus].bg}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  <td className="py-7 md:px-4 text-xl">#{order.orderId}</td>
                  <td className="py-7 text-xl text-right pr-2">
                    SAR {order.subtotal}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Index;
