use escposify::device::Network;
use escposify::printer::Printer;

use crate::types::Order;

pub fn send(order: Order) -> Result<(), std::io::Error> {
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
}
