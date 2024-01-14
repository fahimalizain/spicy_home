import {
  RMSOrderDetails,
  RMSOrderHeader,
  RMSItemCanceled,
} from '@spicy-home/mssql';

export type RMSAuditOrder = RMSOrderHeader & {
  items: Array<RMSAuditOrderItem>;
  auditLogs: RMSAuditLog[];

  // Ideally, removedTotal = removedTabletTotal + removedSystemTotal
  removedTotal: number;
  removedTabletTotal: number;
  removedSystemTotal: number;
};

export type AuditLogType =
  | 'UNKNOWN'
  | 'ADDED_ITEM'
  | 'REMOVED_ITEM'
  | 'EDITED_ITEM';

export type RMSAuditLog = {
  OrderNo: number;
  DateTime: Date;
  logs: Array<{
    logType: AuditLogType;
    message: string;
  }>;
  source: unknown;
};

export type RMSAuditOrderItem = RMSOrderDetails & { Name: string };
export type RMSItemCancelled = RMSItemCanceled & { Name: string };
