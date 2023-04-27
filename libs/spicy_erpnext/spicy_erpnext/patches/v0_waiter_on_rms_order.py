import frappe
from frappe.utils.fixtures import sync_fixtures


def execute():
    sync_fixtures('spicy_erpnext')

    frappe.db.sql("""
        UPDATE `tabSales Invoice`
        SET waiter = (SELECT waiter FROM `tabRMS Order` WHERE name = `tabSales Invoice`.rms_order)
    """)
