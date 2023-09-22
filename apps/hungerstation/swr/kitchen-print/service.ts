// import { Printer } from '@node-escpos/core';
// import NetworkPrinter from '@node-escpos/network-adapter';
import { KitchenPrintRequest, KitchenPrintResponse } from './types';
import { invoke } from '@tauri-apps/api/tauri';

export async function kitchenPrint(
  params: KitchenPrintRequest
): Promise<KitchenPrintResponse> {
  return invoke<KitchenPrintResponse>('kitchen_print', {
    order: JSON.stringify(params.order),
  });
}
