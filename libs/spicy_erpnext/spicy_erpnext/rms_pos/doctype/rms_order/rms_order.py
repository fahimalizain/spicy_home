# Copyright (c) 2022, Fahim Ali Zain and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import getdate, get_time, flt, cint

from erpnext import get_default_company
from erpnext.setup.doctype.company.company import update_company_current_month_sales


class RMSOrder(Document):
    def validate(self):
        if self.status == "Error":
            return

        self.status = "Draft"
        self.set_rms_items()

    def autoname(self):
        self.name = f"DB{self.db_index}-{self.order_no}"

    def on_submit(self):
        self.make_sales_invoice()
        self.db_set("status", "Submitted")

    def set_rms_items(self):
        # RMSItem.name == item_id
        for item_row in self.order_items:
            item_row.rms_item = item_row.item_id

    def make_sales_invoice(self):
        doc = frappe.new_doc("Sales Invoice")

        doc.set_posting_time = 1
        doc.posting_date = getdate(self.date)
        doc.posting_time = get_time(self.date)

        doc.customer = "Cash Customer"
        doc.is_pos = 1
        doc.disable_rounded_total = 1
        doc.rms_order = self.name
        doc.discount_amount = flt(self.discount_amount)

        for item_row in self.order_items:
            doc.append("items", {
                "item_code": item_row.rms_item,
                "qty": item_row.qty,
                "rate": item_row.rate,
                "amount": flt(item_row.rate * item_row.qty, 2)
            })

        doc.append("payments", {
            "mode_of_payment": "Cash",
            "amount": self.net_total,
        })
        doc.save()

        if doc.grand_total != self.net_total:
            tax_templates = [
                "KSA VAT 5% - SH",
                "KSA VAT 15% - SH",
            ]

            for t in tax_templates:
                doc.taxes = []
                doc.taxes_and_charges = t
                from erpnext.controllers.accounts_controller import get_taxes_and_charges
                taxes = get_taxes_and_charges(
                    master_doctype="Sales Taxes and Charges Template",
                    master_name=doc.taxes_and_charges,
                )
                for t in taxes:
                    doc.append("taxes", t)

                doc.save()

                if doc.grand_total == self.net_total:
                    break

        # print(doc.net_total, doc.grand_total, self.net_total)
        # print(doc.total_taxes_and_charges)
        assert doc.grand_total == self.net_total

        doc.submit()


def enqueue_draft_rms_order_submission():
    def _re_enqueue():
        if get_number_of_jobs_in_queue(method=enqueue_draft_rms_order_submission) > 1:
            # 1 is allowed at max which is the current job
            return

        frappe.enqueue(
            enqueue_draft_rms_order_submission,
            queue="long",
            timeout=300,
        )

    if is_method_in_queue(method=submit_draft_order):
        _re_enqueue()
        return

    orders = frappe.get_all(
        "RMS Order",
        filters={"status": "Draft"},
        order_by="date asc, order_no asc",
        limit_page_length=100
    )

    if not len(orders):
        return

    for order in orders:
        frappe.enqueue(
            submit_draft_order,
            queue="long",
            timeout=300,
            order_name=order.name,
        )

    # SellingSettings.sales_update_frequency is set to Daily instead of after Each Transaction
    frappe.enqueue(
        update_company_current_month_sales,
        queue="long",
        timeout=300,
        company=get_default_company(),
    )

    _re_enqueue()


def get_number_of_jobs_in_queue(method, queue="long"):
    from frappe.utils.background_jobs import get_jobs
    jobs = get_jobs(site=frappe.local.site, queue=queue,
                    key="method").get(frappe.local.site, [])

    return jobs.count(method)


def is_method_in_queue(method, queue="long"):
    return get_number_of_jobs_in_queue(method, queue) > 0


def submit_draft_order(order_name: str):
    try:
        doc = frappe.get_doc("RMS Order", order_name)
        if doc.status != "Draft":
            return

        doc.submit()
    except Exception as e:
        frappe.db.rollback()  # rollback to avoid partial submission
        log_submission_error(order_name, e)
    finally:
        frappe.db.commit()


def log_submission_error(order_name: str, exc: Exception):
    frappe.log_error(
        title=f"RMS Order Submit Error: {order_name}",
        message=f"{str(exc)}\n{frappe.get_traceback()}")

    # Track the number of times the same order failed in frappe.cache()
    # If the same order fails 3 times, mark it as Error
    # This is to avoid infinite loop of submission
    # If the order is not submitted, it will be picked up again in the next run
    # of enqueue_draft_rms_order_submission

    cache_key = f"rms_order_submission_error_{order_name}"
    error_count = cint(frappe.cache().get(cache_key)) or 0
    error_count += 1
    frappe.cache().set(cache_key, error_count, 60 * 60 * 24)  # 1 day

    if error_count >= 3:
        frappe.db.set_value("RMS Order", order_name, "status", "Error")

        frappe.cache().delete(cache_key)

        frappe.log_error(
            title=f"RMS Order Submit Error: {order_name}",
            message=f"Order marked as Error after 3 failed attempts"
        )
