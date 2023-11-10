import useSWRMutation from 'swr/mutation';
import { KitchenPrintRequest, KitchenPrintResponse } from './types';
import { kitchenPrint } from './service';
import { SWRKeys } from '../keys';

export function useKitchenPrint() {
  return useSWRMutation<
    KitchenPrintResponse,
    Error,
    string[],
    KitchenPrintRequest
  >([SWRKeys.KITCHEN_PRINT], (_, { arg }) => kitchenPrint(arg));
}
