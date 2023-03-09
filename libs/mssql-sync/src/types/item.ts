export interface DBRMSItem {
  ItemID: number;
  Name: string;
  Code: string;
  Uom: number;
  Inactive: boolean;
  Rate: number;
  DescriptionInOL: string;
  SubCourse: number;
  IsRestaurantItem: boolean;
  StockItem: boolean;
  kitchen: number;
  HaveMoreItem: boolean;
  ShowModifiers: boolean;
  TaxGroup: number;
  TaxInclusive: boolean;
  spRate: number;
  InventoryID: number;
  ItemRemarks: string;
  LoadModifier: boolean;
}

export interface FrappeRMSItem {
  doctype: string;
  item_id: string;
  item_name: string;
  code: string;
  uom: string;
  inactive: string;
  rate: string;
  description_in_ol: string;
  sub_course: string;
  is_restaurant_item: string;
  stock_item: string;
  kitchen: string;
  have_more_item: string;
  show_modifiers: string;
  tax_group: string;
  tax_inclusive: string;
  sp_rate: string;
  inventory_id: string;
  item_remarks: string;
  load_modifier: string;
}

export function RMSItemToFrappeRMSItem(item: DBRMSItem): FrappeRMSItem {
  return {
    doctype: 'RMS Item',
    item_id: item.ItemID.toString(),
    item_name: item.Name,
    code: item.Code,
    uom: item.Uom.toString(),
    inactive: item.Inactive ? '1' : '0',
    rate: item.Rate.toString(),
    description_in_ol: item.DescriptionInOL,
    sub_course: item.SubCourse.toString(),
    is_restaurant_item: item.IsRestaurantItem ? '1' : '0',
    stock_item: item.StockItem ? '1' : '0',
    kitchen: item.kitchen.toString(),
    have_more_item: item.HaveMoreItem ? '1' : '0',
    show_modifiers: item.ShowModifiers ? '1' : '0',
    tax_group: item.TaxGroup.toString(),
    tax_inclusive: item.TaxInclusive ? '1' : '0',
    sp_rate: item.spRate.toString(),
    inventory_id: item.InventoryID.toString(),
    item_remarks: item.ItemRemarks,
    load_modifier: item.LoadModifier ? '1' : '0',
  };
}
