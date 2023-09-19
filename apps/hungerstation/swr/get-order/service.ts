import { HungerstationClient } from '../hungerstation';
import { OrderDetailRequest, OrderDetailResponse } from './types';

export async function getOrderDetails(
  client: HungerstationClient,
  params: OrderDetailRequest
): Promise<OrderDetailResponse> {
  const r = (await client.queryGQL(query, {
    params: {
      orderId: params.orderId,
      GlobalVendorCode: {
        globalEntityId: params.globalEntityId,
        vendorId: params.vendorId,
      },
      placedTimestamp: params.placedTimestamp,
      isBillingDataFlagEnabled: false,
    },
  })) as {
    orders: {
      order: OrderDetailResponse;
    };
  };

  return r.orders.order;
}

const query = `
query GetOrderDetails($params: OrderReq!) {
  orders {
    order(input: $params) {
      order {
        orderId
        placedTimestamp
        status
        globalEntityId
        vendorId
        vendorName
        orderValue
        billableStatus
        delivery {
          provider
          location {
            AddressText
            city
            district
            postCode
            __typename
          }
          __typename
        }
        items {
          ...ItemFields
          __typename
        }
        __typename
      }
      orderReceipt {
        uploadedAt
        __typename
      }
      orderStatuses {
        status
        timestamp
        detail {
          ... on Accepted {
            estimatedDeliveryTime
            __typename
          }
          ... on Cancelled {
            owner
            reason
            __typename
          }
          ... on Delivered {
            timestamp
            __typename
          }
          __typename
        }
        __typename
      }
      billing {
        billingStatus
        estimatedVendorNetRevenue
        taxTotalAmount
        vendorPayout
        payment {
          cashAmountCollectedByVendor
          paymentType
          method
          paymentFee
          __typename
        }
        expense {
          totalDiscountGross
          jokerFeeGross
          commissions {
            grossAmount
            rate
            base
            __typename
          }
          vendorCharges {
            grossAmount
            reason
            __typename
          }
          __typename
        }
        revenue {
          platformFundedDiscountGross
          partnerFundedDiscountGross
          containerChargesGross
          minimumOrderValueGross
          deliveryFeeGross
          tipGross
          taxCharge
          vendorRefunds {
            grossAmount
            reason
            __typename
          }
          __typename
        }
        __typename
      }
      previousVersions {
        changeAt
        reason
        orderState {
          orderValue
          items {
            ...ItemFields
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}

fragment ItemFields on Item {
  id: productId
  name
  parentName
  quantity
  unitPrice
  options {
    id
    name
    quantity
    type
    unitPrice
    __typename
  }
  __typename
}
`;
