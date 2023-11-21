use serde::{Deserialize, Serialize};

#[derive(Serialize)]
pub struct KitchenPrintResponse {
    pub success: bool,
    pub message: String,
}

pub struct PrinterSettings {
    pub width: u8,
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "UPPERCASE")]
pub enum OrderStatus {
    Delivered,
    Cancelled,
    InProgress,
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Order {
    pub order_id: String,
    pub is_prepaid: bool,
    pub placed_timestamp: String,
    pub status: OrderStatus,
    pub global_entity_id: String,
    pub vendor_id: String,
    pub vendor_name: String,
    pub order_value: f64,
    pub billable_status: serde_json::Value,
    pub items: Vec<OrderItem>,
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct OrderItem {
    pub id: String,
    pub name: String,
    pub parent_name: String,
    pub quantity: i32,
    pub unit_price: f64,
    pub options: serde_json::Value,
}
