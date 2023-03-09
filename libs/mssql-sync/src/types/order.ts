export interface DBRMSOrder {
  OrderNo: number;
  Date: Date;
  TableNo: number;
  Waiter: number;
  Guest: number;
  Total: number;
  DiscountAmount: number;
  DiscountPercentage: number;
  NetTotal: number;
  PreparationRemarks: string;
  Type: number;
  NoofGuest: number;
  Branch: number;
  Counter: number;
  User: number;
  Period: number;
  Shift: number;
  TokenNO: number;
  KStatus: number;
  DeliverTime: Date;
  Advance: number;
  Route: number;
  ServicePercentage: number;
  ServiceAmount: number;
  PrivilegeCard: number;
  privilegeCardDiscount: number;
  SalesOrderNo: number;
  TaxGroup: number;
  TaxPercentage: number;
  TaxAmount: number;
  RoundOff: number;
  isPrint: boolean;

  items: DBRMSOrderDetail[];
}

export interface DBRMSOrderDetail {
  SlNo: number;
  OrderNo: number;
  ItemId: number;
  ItemSlNo: number;
  Rate: number;
  Qty: number;
  IsModifier: boolean;
  SizeId: number;
  TemperatureID: number;
  SelectionID: number;
  Branch: number;
  Counter: number;
  Period: number;
  PQty: number;
  SQty: number;
  PRemarks: string;
  Tax: number;
  TaxGroup: number;
}

export interface RMSOrder {
  doctype: string;
  docstatus?: number;
  date: string;
  order_no: number;
  db_index: number;
  table_no: string;
  waiter: string;
  guest: string;
  token_no: string;
  preparation_remarks: string;

  order_items: RMSOrderItem[];

  tax_group: string;
  tax_percentage: number;
  tax_amount: number;
  total: number;

  discount_amount: number;
  discount_percentage: number;
  net_total: number;

  type: string;
  no_of_guest: string;
  branch: string;
  counter: string;
  user: string;
  period: string;
  shift: string;
  kstatus: string;

  deliver_time: string;
  advance: string;
  route: string;
  service_percentage: string;
  service_amount: string;
  privilege_card: string;
  privilege_card_discount: string;
  sales_order_no: string;
  round_off: string;
  is_print: string;
}

export interface RMSOrderItem {
  doctype: string;
  sl_no: number;
  item_id: string;
  rms_item?: string;
  item_sl_no: string;
  rate: number;
  qty: number;
  is_modifier: string;
  tax: string;
  tax_group: string;
  size_id: string;
  temperature_id: string;
  selection_id: string;
  branch: string;
  counter: string;
  period: string;
  pqty: string;
  sqty: string;
  premarks: string;
}

export function DBRMSOrderToFrappeRMSOrder(
  rms_order_header: DBRMSOrder
): RMSOrder {
  return {
    doctype: 'RMS Order',
    date: formatDateToString(rms_order_header.Date),
    order_no: rms_order_header.OrderNo,
    db_index: getRMSDBIndex(),
    table_no: (rms_order_header.TableNo || '').toString(),
    waiter: (rms_order_header.Waiter || '').toString(),
    guest: (rms_order_header.Guest || '').toString(),
    token_no: (rms_order_header.TokenNO || '').toString(),
    preparation_remarks: rms_order_header.PreparationRemarks,
    order_items: rms_order_header.items.map((detail) => {
      return {
        doctype: 'RMS Order Item',
        sl_no: detail.SlNo,
        item_id: detail.ItemId.toString(),
        item_sl_no: (detail.ItemSlNo || '').toString(),
        rate: detail.Rate,
        qty: detail.Qty,
        is_modifier: detail.IsModifier ? '1' : '0',
        tax: (detail.Tax || '').toString(),
        tax_group: (detail.TaxGroup || '').toString(),
        size_id: (detail.SizeId || '').toString(),
        temperature_id: (detail.TemperatureID || '').toString(),
        selection_id: (detail.SelectionID || '').toString(),
        branch: (detail.Branch || '').toString(),
        counter: (detail.Counter || '').toString(),
        period: (detail.Period || '').toString(),
        pqty: (detail.PQty || '').toString(),
        sqty: (detail.SQty || '').toString(),
        premarks: detail.PRemarks,
      };
    }),
    tax_group: (rms_order_header.TaxGroup || '').toString(),
    tax_percentage: rms_order_header.TaxPercentage,
    tax_amount: rms_order_header.TaxAmount,
    total: rms_order_header.Total,
    discount_amount: rms_order_header.DiscountAmount,
    discount_percentage: rms_order_header.DiscountPercentage,
    net_total: rms_order_header.NetTotal,
    type: (rms_order_header.Type || '').toString(),
    no_of_guest: (rms_order_header.NoofGuest || '').toString(),
    branch: (rms_order_header.Branch || '').toString(),
    counter: (rms_order_header.Counter || '').toString(),
    user: (rms_order_header.User || '').toString(),
    period: (rms_order_header.Period || '').toString(),
    shift: (rms_order_header.Shift || '').toString(),
    kstatus: (rms_order_header.KStatus || '').toString(),
    deliver_time: formatDateToString(rms_order_header.DeliverTime),
    advance: (rms_order_header.Advance || '').toString(),
    route: (rms_order_header.Route || '').toString(),
    service_percentage: (rms_order_header.ServicePercentage || '').toString(),
    service_amount: (rms_order_header.ServiceAmount || '').toString(),
    privilege_card: (rms_order_header.PrivilegeCard || '').toString(),
    privilege_card_discount: (
      rms_order_header.privilegeCardDiscount || ''
    ).toString(),
    sales_order_no: (rms_order_header.SalesOrderNo || '').toString(),
    round_off: (rms_order_header.RoundOff || '').toString(),
    is_print: rms_order_header.isPrint ? '1' : '0',
  };
}

function formatDateToString(date: Date) {
  /*
    DATE_FORMAT = "%Y-%m-%d"
    TIME_FORMAT = "%H:%M:%S.%f"
    DATETIME_FORMAT = f"{DATE_FORMAT} {TIME_FORMAT}"
  */

  let month = '' + (date.getUTCMonth() + 1),
    day = '' + date.getUTCDate(),
    hour = '' + date.getUTCHours(),
    minute = '' + date.getUTCMinutes(),
    second = '' + date.getUTCSeconds(),
    millisecond = '' + date.getUTCMilliseconds();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  if (hour.length < 2) hour = '0' + hour;
  if (minute.length < 2) minute = '0' + minute;
  if (second.length < 2) second = '0' + second;
  if (millisecond.length < 3) millisecond = '0' + millisecond;

  return (
    [date.getFullYear(), month, day].join('-') +
    ' ' +
    [hour, minute, second].join(':') +
    '.' +
    millisecond
  );
}

export function getRMSDBIndex() {
  return parseInt(process.env['RMS_DB_IDX'] ?? '0');
}
