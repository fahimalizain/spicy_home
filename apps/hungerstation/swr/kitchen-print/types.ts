import { Order } from '../types';

export type KitchenPrintRequest = {
  order: Order;
};

export type KitchenPrintResponse = {
  success: boolean;
  message: string;
};
