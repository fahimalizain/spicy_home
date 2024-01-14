import { RMSAuditTrial, type RMSOrderHeader } from '@spicy-home/mssql';
import { add, parseISO } from 'date-fns';
import type { NextApiRequest, NextApiResponse } from 'next';
import { dbSQL } from '../../db';
import {
  RMSAuditOrder,
  RMSAuditOrderItem,
  RMSItemCancelled,
} from '../../db/order';
import { parseAuditLogs } from './audit-logs';

export type GetReportsResponse =
  | {
      success: true;
      from: Date;
      to: Date;
      numOrders: number;
      orders: RMSAuditOrder[];
      periodTotal: number;
      periodRemovedTabletTotal: number;
      periodRemovedSystemTotal: number;
      periodRemovedTotal: number;
      periodKitchenTotal: number;
    }
  | {
      success: false;
      message: string;
    };

export const config = {
  api: {
    responseLimit: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetReportsResponse>
) {
  if (!req.query.from || !req.query.to) {
    res
      .status(400)
      .json({ message: 'Missing from or to query parameter', success: false });
    return;
  }

  const from = parseISO(`${req.query.from}T00:00:00.000Z`);
  const to = add(parseISO(`${req.query.to}T23:59:59.999Z`), { hours: 6 }); // add 6 hours to include orders from the next day early morning
  const data = await getOrders(from, to);

  const { periodTotal, periodRemovedTabletTotal, periodRemovedSystemTotal } =
    data.reduce(
      (acc, o) => {
        acc.periodTotal += o.Total;
        acc.periodRemovedTabletTotal += o.removedTabletTotal;
        acc.periodRemovedSystemTotal += o.removedSystemTotal;
        return acc;
      },
      {
        periodTotal: 0,
        periodRemovedTabletTotal: 0,
        periodRemovedSystemTotal: 0,
      }
    );

  res.status(200).json({
    success: true,
    from,
    to,
    numOrders: data.length,
    orders: data,
    periodTotal,
    periodRemovedTabletTotal,
    periodRemovedSystemTotal,
    periodRemovedTotal: periodRemovedTabletTotal + periodRemovedSystemTotal,
    periodKitchenTotal:
      periodTotal + periodRemovedTabletTotal + periodRemovedSystemTotal,
  });
}

async function getOrders(from: Date, to: Date): Promise<RMSAuditOrder[]> {
  const data: RMSOrderHeader[] = await dbSQL(
    `SELECT * FROM RMSOrderHeader WHERE Date >= @from AND Date <= @to ORDER BY [OrderNo]`,
    {
      from,
      to,
    }
  );

  if (!data.length) {
    return [];
  }

  const items: RMSAuditOrderItem[] = await dbSQL(
    `SELECT RMSOrderDetails.*, RMSItem.Name FROM RMSOrderDetails JOIN RMSItem ON RMSItem.ItemID = RMSOrderDetails.ItemId WHERE OrderNo IN (${data
      .map((o) => o.OrderNo)
      .join(',')}) ORDER BY [OrderNo]`
  );

  const cancelledItems: RMSItemCancelled[] = await dbSQL(
    `SELECT * FROM [RMSItemCanceled] WHERE OrderNo IN (${data
      .map((o) => o.OrderNo)
      .join(',')}) ORDER BY [OrderNo]`
  );

  const auditLogs: RMSAuditTrial[] = await dbSQL(
    `SELECT * FROM rmsAuditTrial WHERE [No] IN (${data
      .map((o) => o.OrderNo)
      .join(',')}) ORDER BY [No]`
  );

  const orders: RMSAuditOrder[] = data.map((o) => {
    const _items = items.filter((i) => i.OrderNo === o.OrderNo);
    const { logs, ...removedTotals } = parseAuditLogs(
      o,
      _items,
      cancelledItems.filter((i) => i.OrderNo === o.OrderNo),
      auditLogs.filter((i) => i.No === o.OrderNo)
    );
    return {
      ...o,
      items: _items,
      auditLogs: logs,
      ...removedTotals,
    };
  });

  return orders;
}
