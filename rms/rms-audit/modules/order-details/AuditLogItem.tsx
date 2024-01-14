import { FC } from 'react';
import { RMSAuditLog } from '../../db/order';
import { formatRiyadhTime } from '../../utils/date';

type AuditLogItemProps = {
  auditLog: RMSAuditLog;
};

const AuditLogItem: FC<AuditLogItemProps> = ({ auditLog }) => (
  <div className="p-2 bg-gray-100 hover:bg-gray-300 rounded-md flex flex-col">
    <span className="text-sm text-zinc-500">
      {formatRiyadhTime(auditLog.DateTime)}
    </span>
    {auditLog.logs.map((log, index) => (
      <span key={index} className="font-medium">
        {log.message}
      </span>
    ))}
  </div>
);

export default AuditLogItem;
