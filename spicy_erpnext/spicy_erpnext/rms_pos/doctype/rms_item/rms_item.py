# Copyright (c) 2022, Fahim Ali Zain and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class RMSItem(Document):
    def on_update(self):
        self.make_item()

    def on_trash(self):
        item = frappe.db.get_value("Item", {"rms_item": self.name})
        if item:
            frappe.delete_doc("Item", item)

    def make_item(self):
        item = frappe.db.get_value("Item", {"rms_item": self.name})
        if not item:
            doc = frappe.new_doc("Item")
        else:
            doc = frappe.get_doc("Item", item)

        doc.update(dict(
            item_code=self.item_id,
            item_name=self.item_name,
            item_group="Consumable",
            description=self.description_in_ol,
            standard_rate=self.rate,
            rms_item=self.name,
        ))
        doc.save()
