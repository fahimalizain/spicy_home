import { Order } from '../types';

export type OrderDetailRequest = {
  orderId: string;
  vendorId: string;
  globalEntityId: string;
  placedTimestamp: string;
};

export type OrderDetailResponse = {
  order: Order;
};
