export type OrderStatus = 'DELIVERED' | 'CANCELLED' | 'INPROGRESS';
export const OrderStatuses: OrderStatus[] = [
  'DELIVERED',
  'CANCELLED',
  'INPROGRESS',
];

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
  orderId: string;
  placedTimestamp: string;
  status: OrderStatus;
  globalEntityId: string;
  vendorId: string;
  vendorName: string;
  orderValue: number;
  billableStatus: unknown;
  delivery: Delivery;
  items: OrderItem[];
  orderStatuses: OrderStatusLog[];
  billing: Billing;
};

export type OrderItem = {
  id: string;
  name: string;
  parentName: string;
  quantity: number;
  unitPrice: number;
  options: unknown;
};

export type Delivery = {
  provider: string;
  location: Location;
};

export type Location = {
  AddressText: string;
  city: string;
  district: string;
  postCode: string;
};

export type OrderStatusLog = {
  status: OrderStatus;
  timestamp: string;
};

export type Billing = {
  billingStatus: unknown;
  estimatedVendorNetRevenue: unknown;
  taxTotalAmount: unknown;
  vendorPayout: unknown;
  payment: unknown;
  expense: Expense;
  revenue: Revenue;
};

export type Expense = {
  totalDiscountGross: number;
  jokerFeeGross: unknown;
  commissions: unknown;
  vendorCharges: unknown;
};

export type Revenue = {
  platformFundedDiscountGross: unknown;
  partnerFundedDiscountGross: unknown;
  containerChargesGross: unknown;
  minimumOrderValueGross: unknown;
  deliveryFeeGross: unknown;
  tipGross: unknown;
  taxCharge: unknown;
  vendorRefunds: unknown;
};
