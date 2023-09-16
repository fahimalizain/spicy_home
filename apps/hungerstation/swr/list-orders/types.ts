import { OrderMeta } from '../types';

export type ListOrderRequest = {
  vendorId: string;
  globalEntityId: string;
  timeFrom: string;
  timeTo: string;
  pageSize: number;
};

export type ListOrderResponse = {
  nextPageToken: string;
  resultTimestamp: string;
  orders: OrderMeta[];
};
