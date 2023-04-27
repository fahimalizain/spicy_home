export interface DBRMSWaiter {
  ID: number;
  Name?: string;
  Code?: string;
  Password?: string;
  Branch: number;
}

export interface FrappeRMSWaiter {
  doctype: string;
  waiter_id: string;
  waiter_name?: string;
  code?: string;
  password?: string;
  branch?: string;
}

export function RMSWaiterToFrappeRMSWaiter(
  waiter: DBRMSWaiter
): FrappeRMSWaiter {
  return {
    doctype: 'RMS Waiter',
    waiter_id: waiter.ID.toString(),
    waiter_name: waiter.Name,
    code: waiter.Code,
    password: waiter.Password,
    branch: waiter.Branch.toString(),
  };
}
