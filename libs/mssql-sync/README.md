# RMS POS Order to ERPNext Sync

- Supports rebuilding of the entire Sales Data
- Syncs new Sales Data as they come in

## Steps
- Make sure MSSQL and Frappe Sites are available
- Check for New Items on RMSItem table and sync them over
- Check for New Orders on RMSOrder table and sync them over

## RMS Table Information

### RMSItem


### RMSOrderHeader
  - OrderNo -> rms_order_no
  - Date
  - TableNO -> Table No
  - Waiter -> Waiter
  - Type
  - PreparationRemarks -> remarks
  - Total
  - DiscountAmount
  - DiscountPercentage
  - NetTotal

### RMSOrderDetails