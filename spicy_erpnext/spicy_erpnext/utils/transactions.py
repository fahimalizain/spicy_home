import frappe


def delete_all_transactions():
    delete_all_invoices()
    delete_all_orders()
    delete_all_items()


def delete_all_invoices():
    invoices = frappe.get_all(
        "Sales Invoice",
        fields=["name"],
        # filters={"rms_order": ["is", "set"]}
    )

    for invoice in invoices:
        doc = frappe.get_doc("Sales Invoice", invoice.name)
        if doc.docstatus == 1:
            doc.cancel()


def delete_all_orders():
    for order in frappe.get_all("RMS Order"):
        _delete_doc("RMS Order", order.name)


def delete_all_items():
    for item in frappe.get_all("RMS Item"):
        _delete_doc("RMS Item", item.name)


def _delete_doc(doctype, name):
    doc = frappe.get_doc(doctype, name)
    if doc.docstatus == 1:
        doc.cancel()
    doc.delete()

    print("Deleted", doctype, name)
