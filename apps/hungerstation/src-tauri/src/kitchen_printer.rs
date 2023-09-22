use escposify::device::Network;
use escposify::printer::Printer;

use crate::types::Order;
use crate::types::PrinterSettings;

pub fn send(settings: PrinterSettings, order: Order) -> Result<(), std::io::Error> {
    let printer = Network::new("192.168.1.100", 9100)?;
    let mut printer = Printer::new(printer, None, None);
    printer
        .chain_font("B")?
        .chain_style("B")?
        .chain_align("CT")?
        .chain_text("SpicyHome Restaurant")?
        .chain_font("A")?
        .chain_text(&"Hungerstation Order")?
        .chain_feed(2)?;

    printer
        .chain_align("LT")?
        .chain_text(&("Order #".to_owned() + &order.order_id))?
        .chain_text(&("Time: ".to_owned() + &order.placed_timestamp))?;


    // Column Headers
    let (mut printer, settings) = draw_line(printer, settings)?;
    printer
        .chain_align("LT")?
        .chain_text(&("Item".to_owned() + &" ".repeat(20) + "Qty" + &"_".repeat(10) + "Rate"))?;
    let (mut printer, settings) = draw_line(printer, settings)?;

    // Loop through order items
    for item in order.items {
        printer.chain_align("LT")?.chain_text(
            &(get_first_15_chars(&item.name)
                + &" ".repeat(5)
                + &item.quantity.to_string()
                + &" ".repeat(8)
                + &item.unit_price.to_string()),
        )?;
    }

    let (mut printer, _settings) = draw_line(printer, settings)?;

    // Order Totals
    printer
        .chain_align("RT")?
        .chain_text(&("Total: ".to_owned() + &order.order_value.to_string() + "SAR"))?
        .chain_feed(2)?
        .chain_text("Thank you for your order")?
        .chain_text("Please come again")?
        .chain_text("Powered by SpicyHome")?
        .chain_text("https://spicyhomeksa.com")?;

    printer.chain_feed(1)?.chain_cut(false)?.flush()
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
