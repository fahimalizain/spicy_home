# Copyright (c) 2023, Fahim Ali Zain and contributors
# For license information, please see license.txt

import frappe


def execute(filters=None):
    if filters.waiter:
        return execute_for_waiter(filters)
    else:
        return execute_with_summary(filters)


def execute_for_waiter(filters):
    pass


def execute_with_summary(filters):
    data = frappe.db.sql("""
        SELECT
            sales_invoice.waiter AS waiter_id,
            waiter.waiter_name AS waiter,
            SUM(grand_total) AS total_sales
        FROM
            `tabSales Invoice` sales_invoice
            JOIN `tabRMS Waiter` waiter ON waiter.name = waiter
        WHERE
            sales_invoice.docstatus = 1
            AND sales_invoice.posting_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY waiter
    """, filters, as_dict=1)

    # Make Pie Chart
    chart = frappe._dict(
        title="Sales by Waiter",
        type="donut",
        data={
            "labels": [d.waiter for d in data],
            "datasets": [
                {
                    "name": "Total Sales",
                    "values": [d.total_sales for d in data],
                }
            ]
        },
        height=250,
        colors=["#7cd6fd", "#743ee2", "#FFC107"],
    )

    report_summary = None

    columns = [
        dict(
            label="Waiter",
            fieldname="waiter",
            fieldtype="Link",
            options="RMS Waiter",
            width=200
        ),
        dict(
            label="Total Sales",
            fieldname="total_sales",
            fieldtype="Currency",
            width=200
        ),
    ]

    return columns, data, None, chart, report_summary
