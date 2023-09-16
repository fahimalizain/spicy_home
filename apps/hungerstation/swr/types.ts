export type Order = {
  status: string;
  order_id: string;
  subtotal: string;
  items: OrderItem[];
};

export type OrderItem = {
  itemName: string;
  qty: number;
  rate: number;
  total: number;
};
