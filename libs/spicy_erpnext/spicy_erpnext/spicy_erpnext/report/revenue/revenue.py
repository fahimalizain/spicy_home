# Copyright (c) 2023, Fahim Ali Zain and contributors
# For license information, please see license.txt

import frappe
from frappe.utils import add_to_date, flt
from erpnext.accounts.report.financial_statements import (
    get_period_list,
)


def execute(filters=None):
    columns, data = [], []

    period_list = [frappe._dict(from_date=x.from_date, to_date=x.to_date, key=x.key, label=x.label) for x in get_period_list(
        periodicity=filters.periodicity,
        period_start_date=filters.from_date,
        period_end_date=filters.to_date,
        from_fiscal_year=None, to_fiscal_year=None, filter_based_on=None
    )]

    prev_year_period_list = [frappe._dict(from_date=x.from_date, to_date=x.to_date, key=x.key, label=x.label) for x in get_period_list(
        periodicity=filters.periodicity,
        period_start_date=add_to_date(filters.from_date, years=-1),
        period_end_date=add_to_date(filters.to_date, years=-1),
        from_fiscal_year=None, to_fiscal_year=None, filter_based_on=None
    )]

    data = []
    for i in range(len(period_list)):
        period = period_list[i]
        prev_year_period = prev_year_period_list[i]

        row = frappe._dict(
            period=period.label,
            total_revenue=get_sales_revenue(period.from_date, period.to_date),
            prev_year_revenue=get_sales_revenue(
                prev_year_period.from_date, prev_year_period.to_date),
        )
        data.append(row)

    columns = [
        {
            "fieldname": "period",
            "label": "Period",
            "fieldtype": "Data",
            "width": 100
        },
        {
            "fieldname": "total_revenue",
            "label": "Total Revenue",
            "fieldtype": "Currency",
            "width": 100
        },
        {
            "fieldname": "prev_year_revenue",
            "label": "Previous Year Revenue",
            "fieldtype": "Currency",
            "width": 100
        },
    ]

    def _get_percentage_change(prev_year, current):
        if prev_year and current:
            return flt((current - prev_year) / prev_year * 100, 2)
        return 0

    chart = frappe._dict(
        title="Revenue",
        data={
            "labels": [x.period for x in data],
            "datasets": [
                {
                    "name": "Total Revenue",
                    "values": [x.total_revenue for x in data],
                    "chartType": "line",
                },
                {
                    "name": "Previous Year Revenue",
                    "values": [x.prev_year_revenue for x in data],
                    "chartType": "line",
                },
                {
                    "name": "% Change",
                    "values": [_get_percentage_change(x.prev_year_revenue, x.total_revenue) for x in data],
                    "chartType": "bar",
                }
            ]
        },
        height=250,
        colors=["#7cd6fd", "#743ee2", "#FFC107"],
        # axisOptions={
        #     "shortenYAxisNumbers": 1
        # },
        # tooltipOptions={
        #     "formatTooltipX": "d",
        #     "formatTooltipY": "d"
        # },
    )

    total_revenue = flt(sum([flt(x.total_revenue) for x in data]), 2)
    prev_year_revenue = flt(sum([flt(x.prev_year_revenue) for x in data]), 2)

    report_summary = [
        {"value": total_revenue, "label": "Total Revenue",
            "datatype": "Currency", "currency": "SAR"},
        {"type": "separator", "value": "-"},
        {"value": prev_year_revenue, "label": "Prev. Year",
            "datatype": "Currency", "currency": "SAR"},
        {"value": _get_percentage_change(
            prev_year_revenue, total_revenue), "label": "% Change", },
    ]

    return columns, data, None, chart, report_summary


def get_sales_revenue(from_date, to_date):
    return frappe.db.sql("""
        SELECT
            ROUND(SUM(sales_invoice.grand_total), 2) AS total_revenue
        FROM
            `tabSales Invoice` sales_invoice
        WHERE
            sales_invoice.posting_date BETWEEN %(from_date)s AND %(to_date)s
            AND sales_invoice.docstatus = 1
    """, {
        "from_date": from_date,
        "to_date": to_date
    }, as_dict=1)[0].get("total_revenue")
