// import { Printer } from '@node-escpos/core';
// import NetworkPrinter from '@node-escpos/network-adapter';
import { KitchenPrintRequest, KitchenPrintResponse } from './types';
import { invoke } from '@tauri-apps/api/tauri';
import { parseISO, format } from 'date-fns';

export async function kitchenPrint(
  params: KitchenPrintRequest
): Promise<KitchenPrintResponse> {
  if (!window.__TAURI_IPC__) {
    return new Promise((r) =>
      setTimeout(
        () => r({ success: true, message: 'Running Outside Tauri' }),
        2000
      )
    );
  }

  return invoke<KitchenPrintResponse>('kitchen_print', {
    order: JSON.stringify({
      ...params.order,
      placedTimestamp: format(
        parseISO(params.order.placedTimestamp),
        'dd/MM/yyyy h:mm aa'
      ),
    }),
  });
}
