import { Order } from '../types';

export type KitchenPrintRequest = {
  order: Order & { isPrepaid: boolean };
};

export type KitchenPrintResponse = {
  success: boolean;
  message: string;
};
