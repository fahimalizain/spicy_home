import { NextApiRequest, NextApiResponse } from 'next';
import { RMSAuditOrder, RMSAuditOrderItem } from '../../db/order';
import { type RMSOrderHeader } from '@spicy-home/mssql';
import { dbSQL } from '../../db';
import { parseAuditLogs } from './audit-logs';

export type GetOrderResponse =
  | {
      success: true;
      order: RMSAuditOrder;
    }
  | {
      message: string;
      success: false;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetOrderResponse>
) {
  if (!req.query.orderNo) {
    res
      .status(400)
      .json({ message: 'Missing orderNo query parameter', success: false });
    return;
  }

  const order = await getOrder(req.query.orderNo as string);
  if (!order) {
    return res.status(404).json({ message: 'Order not found', success: false });
  }

  return res.status(200).json({ order, success: true });
}

async function getOrder(_orderNo: string): Promise<RMSAuditOrder | null> {
  const orderNo = parseInt(_orderNo, 10);

  const data: RMSOrderHeader[] = await dbSQL(
    `SELECT * FROM RMSOrderHeader WHERE [OrderNo] = @orderNo`,
    {
      orderNo,
    }
  );

  if (!data.length) {
    return null;
  }

  const items: RMSAuditOrderItem[] = await dbSQL(
    `SELECT RMSOrderDetails.*, RMSItem.Name FROM RMSOrderDetails JOIN RMSItem ON RMSItem.ItemID = RMSOrderDetails.ItemId WHERE [OrderNo] = @orderNo`,
    {
      orderNo,
    }
  );

  const cancelledItems = await dbSQL(
    `SELECT RMSItemCanceled.*, RMSItem.Name FROM [RMSItemCanceled] JOIN RMSItem ON RMSItem.ItemID = RMSItemCanceled.ItemId WHERE [OrderNo] = @orderNo`,
    {
      orderNo,
    }
  );

  const auditLogs = await dbSQL(
    `SELECT * FROM rmsAuditTrial WHERE [No] = @orderNo`,
    {
      orderNo,
    }
  );

  const { logs, ...removedTotals } = parseAuditLogs(
    data[0],
    items,
    cancelledItems,
    auditLogs
  );

  return {
    ...data[0],
    items,
    auditLogs: logs,
    ...removedTotals,
  };
}
