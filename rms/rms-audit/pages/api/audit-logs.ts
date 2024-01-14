import {
  RMSAuditTrial,
  RMSOrderDetails,
  RMSOrderHeader,
} from '@spicy-home/mssql';
import { RMSAuditLog, RMSItemCancelled, AuditLogType } from '../../db/order';

export function parseAuditLogs(
  order: RMSOrderHeader,
  items: RMSOrderDetails[],
  cancelledItems: RMSItemCancelled[],
  auditLogs: RMSAuditTrial[]
): {
  logs: RMSAuditLog[];
  removedTotal: number;
  removedTabletTotal: number;
  removedSystemTotal: number;
} {
  const logs: RMSAuditLog[] = [];
  let removedTabletTotal = 0,
    removedSystemTotal = 0;

  for (const log of cancelledItems) {
    removedTabletTotal += log.Qty * log.Rate;
    logs.push({
      OrderNo: log.OrderNo,
      DateTime: log.Date,
      logs: [
        {
          logType: 'REMOVED_ITEM',
          message: `Item ${log.ItemId} ${log.Name} was removed`,
        },
      ],
      source: log,
    });
  }

  for (const log of auditLogs) {
    const remarks = log.Remarks.split('#')
      .map((r) => r.trim())
      .filter(
        (r) =>
          !(
            r.includes('Type :') ||
            r.includes('TokenNo :') ||
            r.includes('Tran No :') ||
            r.includes('Customer ') ||
            r.includes('Waiter :') ||
            r.includes('Date :') ||
            r.includes('Total ') ||
            r.includes('Disc ') ||
            r.includes('Advance ') ||
            r.includes('NetToal ') ||
            r.includes('Shift Closed') ||
            r.length === 0
          )
      )
      .map((remark) => {
        let logType: AuditLogType = 'UNKNOWN';
        let unexpected = false;
        if (remark.includes('New Item')) {
          logType = 'ADDED_ITEM' as const;
          const regex =
            /^New Item {3}: (.*) {2}Qty : (\d+) {2}Price : ([\d.]+)$/;
          const match = regex.exec(remark);
          if (match) {
            const [, name, qty] = match;
            remark = `Item ${name} x${qty} was added`;
          } else {
            console.warn('Unknown log type', remark);
          }
        } else if (remark.includes('Rmvd :')) {
          const regex = /^Rmvd : (.*) {2}Qty : (\d+) {2}Rate ([\d.]+)$/;
          const match = regex.exec(remark);
          logType = 'REMOVED_ITEM' as const;
          if (match) {
            const [, name, qty, rate] = match;
            remark = `Item ${name} was removed`;
            removedSystemTotal += Number(qty) * Number(rate);
          } else {
            console.warn('Unknown log type', remark);
          }
        } else if (remark.includes('Edited : Qty')) {
          logType = 'EDITED_ITEM' as const;
          unexpected = true;
        } else if (
          remark.includes('Added : Qty') ||
          remark.includes('Added  : Qty')
        ) {
          logType = 'EDITED_ITEM' as const;
          unexpected = true;
        }

        if (unexpected || logType === 'UNKNOWN') {
          console.warn('\n\t UNEXPECTED LOG TYPE', remark, '\n');
        }

        return {
          logType,
          message: remark,
        };
      });

    if (!remarks.length) {
      continue;
    }

    logs.push({
      OrderNo: log.No,
      DateTime: log.DateTime,
      logs: remarks,
      source: log,
    });
  }

  logs.sort((a, b) => a.DateTime.getTime() - b.DateTime.getTime());

  return {
    removedTotal: removedSystemTotal + removedTabletTotal,
    removedSystemTotal,
    removedTabletTotal,
    logs,
  };
}
