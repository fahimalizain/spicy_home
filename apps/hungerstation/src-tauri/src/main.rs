// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod kitchen_printer;
pub mod types;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![kitchen_print])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn kitchen_print(order: String) -> types::KitchenPrintResponse {
    let order: types::Order = match serde_json::from_str(&order) {
        Ok(order) => order,
        Err(_err) => {
            println!("Error: {}", _err);
            return types::KitchenPrintResponse {
                success: false,
                message: _err.to_string(),
            };
        }
    };

    if let Err(_err) = kitchen_printer::send(order) {
        println!("Error: {}", _err);
        return types::KitchenPrintResponse {
            success: false,
            message: _err.to_string(),
        };
    }

    types::KitchenPrintResponse {
        success: true,
        message: "Kitchen Print Success".to_string(),
    }
}
