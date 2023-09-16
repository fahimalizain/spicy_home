import useSWR from 'swr';
import { useHungerstation } from '../../providers/hungerstation';
import { OrderDetailRequest, OrderDetailResponse } from './types';
import { SWRKeys } from '../keys';
import { getOrderDetails } from './service';

export function useOrderDetail(params: Partial<OrderDetailRequest>) {
  const hungerstation = useHungerstation();
  const key =
    hungerstation.isAuthenticated() && params.orderId
      ? [SWRKeys.ORDER_DETAILS, params.orderId]
      : null;

  const _params = {
    globalEntityId: process.env.NEXT_PUBLIC_HS_GLOBAL_ENTITY_ID as string,
    vendorId: process.env.NEXT_PUBLIC_HS_VENDOR_ID as string,

    orderId: params?.orderId ?? '',
    placedTimestamp: params?.placedTimestamp ?? '',
  } satisfies OrderDetailRequest;

  return useSWR<OrderDetailResponse, Error, string[] | null>(key, () =>
    getOrderDetails(hungerstation, {
      ..._params,
    })
  );
}
