import useSWRImmutable from 'swr/immutable';
import { GetOrderResponse } from '../pages/api/order';

export const useAuditOrder = (orderNo: string) =>
  useSWRImmutable<GetOrderResponse, Error, string[] | null>(
    orderNo ? ['order', orderNo] : null,
    () => {
      return fetch(`/api/order?orderNo=${orderNo}`).then((res) => res.json());
    }
  );
