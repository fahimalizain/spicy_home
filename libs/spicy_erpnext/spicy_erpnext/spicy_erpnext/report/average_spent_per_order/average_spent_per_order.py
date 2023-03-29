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
            average_spent=get_average_spent(period.from_date, period.to_date),
            prev_year_average_spent=get_average_spent(
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
            "fieldname": "average_spent",
            "label": "Average Spent",
            "fieldtype": "Currency",
            "width": 100
        },
        {
            "fieldname": "prev_year_average_spent",
            "label": "Previous Year Average Spent",
            "fieldtype": "Currency",
            "width": 100
        },
    ]

    def _get_percentage_change(prev_year, current):
        if prev_year and current:
            return flt((current - prev_year) / prev_year * 100, 2)
        return 0

    chart = frappe._dict(
        title="Average Spent Per Order",
        data={
            "labels": [x.period for x in data],
            "datasets": [
                {
                    "name": "Average Spent",
                    "values": [x.average_spent for x in data],
                    "chartType": "line",
                },
                {
                    "name": "Previous Year Average Spent",
                    "values": [x.prev_year_average_spent for x in data],
                    "chartType": "line",
                },
                {
                    "name": "% Change",
                    "values": [
                        _get_percentage_change(
                            x.prev_year_average_spent, x.average_spent)
                        for x in data
                    ],
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

    average_spent_amounts = [flt(x.average_spent)
                             for x in data if flt(x.average_spent) > 0]
    prev_year_amounts = [flt(x.prev_year_average_spent)
                         for x in data if flt(x.prev_year_average_spent) > 0]
    average_spent = flt(
        sum([x for x in average_spent_amounts]) / len(average_spent_amounts), 2) if len(average_spent_amounts) > 0 else 0
    prev_year_average_spent = flt(
        sum([x for x in prev_year_amounts]) / len(prev_year_amounts), 2) if len(prev_year_amounts) > 0 else 0

    report_summary = [
        {"value": average_spent, "label": "Average Spent",
            "datatype": "Currency", "currency": "SAR"},
        {"type": "separator", "value": "-"},
        {"value": prev_year_average_spent, "label": "Prev. Year",
            "datatype": "Currency", "currency": "SAR"},
        {"type": "separator", "value": "-"},
        {"value": _get_percentage_change(
            prev_year_average_spent, average_spent), "label": "% Change", }
    ]

    return columns, data, None, chart, report_summary


def get_average_spent(from_date, to_date):
    return frappe.db.sql("""
        SELECT
            ROUND(SUM(sales_invoice.grand_total) / COUNT(sales_invoice.name), 2) AS average_spent
        FROM
            `tabSales Invoice` sales_invoice
        WHERE
            sales_invoice.posting_date BETWEEN %(from_date)s AND %(to_date)s
    """, {
        "from_date": from_date,
        "to_date": to_date
    }, as_dict=1)[0].get("average_spent")
