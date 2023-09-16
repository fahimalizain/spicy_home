export type OrderStatus = 'DELIVERED' | 'CANCELLED' | 'IN_PROGRESS';

export type OrderMeta = {
  orderId: string;
  globalEntityId: string;
  vendorId: string;
  vendorName: string;
  orderStatus: OrderStatus;
  placedTimestamp: string;
  subtotal: number;
  billableStatus: unknown;
  billing: unknown;
};

export type Order = {
  orderStatus: OrderStatus;
  orderId: string;
  subtotal: string;
  items: OrderItem[];
};

export type OrderItem = {
  itemName: string;
  qty: number;
  rate: number;
  total: number;
};
