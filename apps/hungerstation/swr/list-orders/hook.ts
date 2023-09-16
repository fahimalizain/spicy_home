import useSWR from 'swr';
import { useHungerstation } from '../../providers/hungerstation';
import { ListOrderRequest, ListOrderResponse } from './types';
import { SWRKeys } from '../keys';
import { listOrders } from './service';
import { addDays } from 'date-fns';

export function useOrders(params?: Partial<ListOrderRequest>) {
  const hungerstation = useHungerstation();
  const key = hungerstation.isAuthenticated() ? [SWRKeys.ORDERS_LIST] : null;

  const now = new Date();
  const twoWeeksAgo = addDays(now, -14);

  const _params = {
    globalEntityId:
      params?.globalEntityId ??
      (process.env.NEXT_PUBLIC_HS_GLOBAL_ENTITY_ID as string),
    vendorId:
      params?.vendorId ?? (process.env.NEXT_PUBLIC_HS_VENDOR_ID as string),
    pageSize: params?.pageSize ?? 50,
    timeFrom: params?.timeFrom ?? twoWeeksAgo.toISOString(),
    timeTo: params?.timeTo ?? now.toISOString(),
  } satisfies ListOrderRequest;

  return useSWR<ListOrderResponse, Error, string[] | null>(key, () =>
    listOrders(hungerstation, {
      ..._params,
    })
  );
}
