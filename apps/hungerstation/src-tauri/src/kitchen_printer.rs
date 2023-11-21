use escposify::device::Network;
use escposify::printer::Printer;

use crate::types::Order;
use crate::types::PrinterSettings;

// 42 chars per line

pub fn send(settings: PrinterSettings, order: Order) -> Result<(), std::io::Error> {
    let printer = Network::new("192.168.1.100", 9100)?;
    let mut printer = Printer::new(printer, None, None);
    printer
        .chain_font("A")?
        .chain_style("B")?
        .chain_align("CT")?
        .chain_size(2, 2)?
        .chain_text("SpicyHome Restaurant")?
        .chain_size(0, 0)?
        .chain_style("NORMAL")?
        .chain_text("Hafsah Bint Omar Street, Rawdah, Riyadh")?
        .chain_feed(1)?
        .chain_text(&"Hungerstation Order")?;

    printer
        .chain_align("LT")?
        .chain_text(&("Order #".to_owned() + &order.order_id))?
        .chain_text(&("Time: ".to_owned() + &order.placed_timestamp))?
        .chain_feed(1)?;

    // PREPAID / POSTPAID
    printer.chain_align("CT")?.chain_text(if order.is_prepaid {
        "PREPAID"
    } else {
        "POSTPAID"
    })?;

    // Item Table
    let item_table_lines = format_order_table(&order, &settings);
    for (_, line) in item_table_lines.iter().enumerate() {
        printer.println(line);
    }

    // Order Totals
    printer
        .chain_align("RT")?
        .chain_size(2, 2)?
        .chain_text(&("Total: ".to_owned() + &order.order_value.to_string() + " SAR"))?
        .chain_size(0, 0)?
        .chain_feed(2)?;

    // Footer
    printer
        .chain_align("CT")?
        .chain_text("Thank you for your Order!")?
        .chain_text("Contact Us: +966112357926")?
        .chain_text("https://spicyhomeksa.com")?;

    printer
        .chain_feed(1)?
        .chain_cut(false)?
        .chain_hwreset()?
        .flush()
}

fn format_order_table(order: &Order, settings: &PrinterSettings) -> Vec<String> {
    // Assuming the widths (including spaces) are:
    // Item (20 chars), Qty (4 chars), Rate (6 chars) and Amount (7 chars)
    const ITEM_WIDTH: usize = 20;
    const QTY_WIDTH: usize = 4;
    const RATE_WIDTH: usize = 6;
    const AMOUNT_WIDTH: usize = 7;

    let mut lines: Vec<String> = Vec::new();

    // Add
    lines.push("-".repeat(settings.width.into()));

    // Add the table headers
    lines.push(format!(
        "{:<20} {:<4} {:<6} {:<7}",
        "Item", "Qty", "Rate", "Amount"
    ));

    lines.push("-".repeat(settings.width.into()));

    for item in &order.items {
        let mut item_name_parts = item.name.clone();
        while item_name_parts.len() > ITEM_WIDTH {
            // Extract the first 20 characters
            let part = &item_name_parts[..ITEM_WIDTH];
            lines.push(format!("{:<20}", part));
            item_name_parts = item_name_parts[ITEM_WIDTH..].to_string();
        }
        let amount = item.quantity as f64 * item.unit_price;
        lines.push(format!(
            "{:<20} {:<4} {:>6.2} {:>7.2}",
            item_name_parts, item.quantity, item.unit_price, amount
        ));
    }
    lines.push("-".repeat(settings.width.into()));

    lines
}

fn get_first_15_chars(input: &str) -> String {
    let len = input.len();
    if len >= 15 {
        input.chars().take(15).collect()
    } else {
        format!("{:<15}", input)
    }
}

fn draw_line(
    mut printer: Printer<Network>,
    settings: PrinterSettings,
) -> Result<(Printer<Network>, PrinterSettings), std::io::Error> {
    printer
        .chain_align("CT")?
        .chain_text(&"-".repeat(settings.width.into()))?;

    Ok((printer, settings))
}
