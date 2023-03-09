import SyncBase from './sync_base';
import { dbSQL } from './db';
import { DBRMSOrderToFrappeRMSOrder, DBRMSOrder, getRMSDBIndex } from './types';
import * as CLIProgress from 'cli-progress';

/**
 * @Date MSSQL Comparison is done as >= and not > because
 * There are so many orders with the same date.
 */

interface LastSyncedOrder {
  date: string;
  orderNo: number;
}

export default class SyncOrders extends SyncBase {
  override async syncAll() {
    let lastOrder = await this.getLastSyncedOrderDetails();
    const totalOrdersToSync = await this.getNumberOfOrdersToSync(lastOrder);
    let totalOrdersSynced = 0;

    console.log('No of Orders to Create:', totalOrdersToSync);
    const progressBar = new CLIProgress.SingleBar(
      {},
      CLIProgress.Presets.shades_classic
    );
    progressBar.start(totalOrdersToSync, 0);

    while (totalOrdersSynced < totalOrdersToSync) {
      const rms_orders = await this.getAllOrdersFromDB(lastOrder);
      if (rms_orders.length === 0) {
        console.warn(
          'No more orders to sync, even though totalOrdersSynced < totalOrdersToSync'
        );
        break;
      }
      for (const rms_order of rms_orders) {
        const frappe_order = DBRMSOrderToFrappeRMSOrder(rms_order);

        await this.client.insert({
          doctype: 'RMS Order',
          doc: frappe_order,
        });

        progressBar.increment();
      }

      totalOrdersSynced += rms_orders.length;
      lastOrder = await this.getLastSyncedOrderDetails();
    }

    progressBar.stop();
  }

  async getLastSyncedOrderDetails(): Promise<LastSyncedOrder | null> {
    const lastOrder = await this.client.get_list({
      doctype: 'RMS Order',
      fields: ['name', 'date', 'order_no', 'db_index'],
      filters: {
        db_index: getRMSDBIndex(),
      },
      limit_page_length: 1,
      order_by: 'order_no desc',
    });

    if (lastOrder.length === 0) {
      return null;
    }

    const order = lastOrder[0];
    // The returned millisecond can have a precision of 6 digits
    // which is unsupported by MSSQL. So we need to truncate it.
    let d = order.date;
    if (d.split('.').length > 1 && d.split('.')[1].length > 3) {
      d = d.split('.')[0] + '.' + d.split('.')[1].substr(0, 3);
    }

    return {
      date: d,
      orderNo: order.order_no,
    };
  }

  async getNumberOfOrdersToSync(
    lastOrder: LastSyncedOrder | null
  ): Promise<number> {
    let sql = `
    SELECT
      COUNT(*) AS computed
    FROM
      [dbo].[RMSOrderHeader]
      `;

    if (lastOrder) {
      sql += `
      WHERE
        OrderNo > @orderNo
      `;
    }

    const result = await dbSQL(
      sql,
      (lastOrder ?? {}) as Record<string, unknown>
    );
    return result[0].computed;
  }

  async getAllOrdersFromDB(
    lastOrder: LastSyncedOrder | null,
    limit = 100
  ): Promise<DBRMSOrder[]> {
    let sql = `
    SELECT
      TOP ${limit}
      *
      FROM
    [dbo].[RMSOrderHeader]`;

    if (lastOrder) {
      sql += `
      WHERE
        OrderNo > @orderNo
      `;
    }

    sql += ` ORDER BY OrderNo ASC`;

    const orders: DBRMSOrder[] = await dbSQL(
      sql,
      (lastOrder ?? {}) as Record<string, unknown>
    );

    // Load Order Details
    const orderIds = orders.map((x) => x.OrderNo);
    if (!orderIds.length) return orders;

    const orderItems = await dbSQL(
      `
      SELECT
        *
      FROM
        [dbo].[RMSOrderDetails]
      WHERE
        OrderNo IN (${orderIds.join(',')})
      `
    );

    // Attach Order Details to Order
    for (const item of orderItems) {
      const order = orders.find((x) => x.OrderNo === item.OrderNo);
      if (!order) continue;

      if (!order.items) {
        order.items = [];
      }

      order.items.push(item);
    }

    return orders;
  }
}
