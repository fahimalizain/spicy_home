// import styles from './index.module.scss';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import React from 'react';
import FilterDropdown from '../components/FilterDropdown';
import { OrderDialog } from '../components/OrderDialog';
import { FaSearch } from 'react-icons/fa';

interface Order {
  status: string;
  order_id: string;
  subtotal: string;
  // Add other fields as needed
}

export function Index() {
  const styles: { [key: string]: { text: string; bg: string } } = {
    delivered: { text: 'text-green-500', bg: 'bg-green-100' },
    pending: { text: 'text-blue-500', bg: 'bg-blue-200' },
    cancelled: { text: 'text-red-500', bg: 'bg-red-200' },
  };
  const orders = [
    {
      status: 'delivered',
      order_id: '123',
      subtotal: '50.00',
      orderList: [
        { itemName: 'Garlic Naan', qty: 2, price: '15.00' },
        { itemName: 'Fried Lentils', qty: 1, price: '20.00' },
      ],
    },
    {
      status: 'pending',
      order_id: '124',
      subtotal: '75.00',
      orderList: [
        { itemName: 'Garlic Naan', qty: 2, price: '15.00' },
        { itemName: 'Butter Naan', qty: 1, price: '20.00' },
      ],
    },
    {
      status: 'cancelled',
      order_id: '125',
      subtotal: '100.00',
      orderList: [
        { itemName: 'Garlic Naan', qty: 2, price: '15.00' },
        { itemName: 'Butter Chicken', qty: 1, price: '20.00' },
      ],
    },
  ];

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);

  const openDialog = (order: Order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([
    'delivered',
    'pending',
    'cancelled',
  ]);
  const [filteredOrders, setFilteredOrders] = useState(orders);

  const handleCheckboxChange = (status: string) => {
    setSelectedStatuses((prevSelected) =>
      prevSelected.includes(status)
        ? prevSelected.filter((s) => s !== status)
        : [...prevSelected, status]
    );
  };

  useEffect(() => {
    setFilteredOrders(
      orders.filter((order) => selectedStatuses.includes(order.status))
    );
  }, [selectedStatuses]);

  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <div
      className="font-sans wrapper"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      {' '}
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
          order={selectedOrder}
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
          <FilterDropdown
            selectedStatuses={selectedStatuses}
            handleCheckboxChange={handleCheckboxChange}
          />

          <div className="flex items-center justify-between border-2 border-slate-300 rounded-full px-3 py-1 w-80">
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
                        styles[order.status].text
                      } ${styles[order.status].bg}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="py-7 md:px-4 text-xl">#{order.order_id}</td>
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
                        styles[order.status].text
                      } ${styles[order.status].bg}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="py-7 md:px-4 text-xl">#{order.order_id}</td>
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
                        styles[order.status].text
                      } ${styles[order.status].bg}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="py-7 md:px-4 text-xl">#{order.order_id}</td>
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
