import { HungerstationClient } from '../hungerstation';
import { ListOrderRequest, ListOrderResponse } from './types';

export async function listOrders(
  client: HungerstationClient,
  params: ListOrderRequest
): Promise<ListOrderResponse> {
  const r = (await client.queryGQL(listGQLQuery, {
    params: {
      pagination: {
        pageSize: params.pageSize,
      },
      timeFrom: params.timeFrom,
      timeTo: params.timeTo,
      globalVendorCodes: {
        globalEntityId: params.globalEntityId,
        vendorId: params.vendorId,
      },
    },
  })) as {
    orders: {
      listOrders: ListOrderResponse;
    };
  };

  return r.orders.listOrders;
}

const listGQLQuery = `query ListOrders($params: ListOrdersReq!) {
  orders {
    listOrders(input: $params) {
      nextPageToken
      resultTimestamp
      orders {
        ...OrderListingFields
        __typename
      }
      __typename
    }
    __typename
  }
}

fragment OrderListingFields on OrderSummary {
  orderId
  globalEntityId
  vendorId
  vendorName
  orderStatus
  placedTimestamp
  subtotal
  billableStatus
  billing {
    commissionAmount
    customerRefundGrossAmount
    netRevenue
    __typename
  }
  __typename
}`;
