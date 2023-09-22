// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use escposify::device::Network;
use escposify::printer::Printer;

mod types;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![kitchen_print])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn kitchen_print(order: String) -> types::KitchenPrintResponse {
    let _print = || -> Result<(), std::io::Error> {
        let order: types::Order = serde_json::from_str(&order)?;
        println!("Parsed JSON Order: {:?}\n", order);

        let printer = Network::new("192.168.1.100", 9100)?;
        let mut printer = Printer::new(printer, None, None);
        printer
            .chain_font("A")?
            .chain_align("CT")?
            .chain_text("SpicyHome Restaurant")?
            .chain_text(&("Hungerstation #".to_owned() + &order.order_id))?;

        // Table for order items
        printer
            .chain_align("LT")?
            .chain_text("Item")?
            .chain_text("Qty")?
            .chain_text("Price")?;

        // Loop through order items
        for item in order.items {
            printer
                .chain_align("LT")?
                .chain_text(&item.name)?
                .chain_text(&item.quantity.to_string())?
                .chain_text(&(item.unit_price.to_string() + "SAR"))?;
        }

        // Draw a line
        printer
            .chain_align("CT")?
            .chain_text("____________________________")?;

        // Order Totals
        printer
            .chain_align("CT")?
            .chain_text("Total")?
            .chain_text(&(order.order_value.to_string() + "SAR"))?
            .chain_text("Thank you for your order")?
            .chain_text("Please come again")?
            .chain_text("Powered by SpicyHome")?
            .chain_text("https://spicyhomeksa.com")?;

        printer.chain_feed(1)?.chain_cut(false)?.flush()
    };

    if let Err(_err) = _print() {
        println!("Error: {}", _err);
        return types::KitchenPrintResponse {
            success: false,
            message: _err.to_string(),
        };
    }

    println!("Kitchen Print Success");
    types::KitchenPrintResponse {
        success: true,
        message: "Kitchen Print Success".to_string(),
    }
}
