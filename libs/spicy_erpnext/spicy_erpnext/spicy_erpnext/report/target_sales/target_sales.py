# Copyright (c) 2023, Fahim Ali Zain and contributors
# For license information, please see license.txt

import frappe
from frappe.utils import add_to_date, flt
from erpnext.accounts.report.financial_statements import (
    get_period_list,
)

from ..revenue.revenue import get_sales_revenue


def execute(filters=None):
    columns, data = [], []

    period_list = [frappe._dict(from_date=x.from_date, to_date=x.to_date, key=x.key, label=x.label) for x in get_period_list(
        periodicity=filters.periodicity,
        period_start_date=filters.from_date,
        period_end_date=filters.to_date,
        from_fiscal_year=None, to_fiscal_year=None, filter_based_on=None
    )]

    data = []
    for i in range(len(period_list)):
        period = period_list[i]

        row = frappe._dict(
            period=period.label,
            actual=get_sales_revenue(period.from_date, period.to_date),
            budgeted=get_target_sales(
                period.from_date, period.to_date, filters.periodicity),
        )
        row.variance = _get_percentage_change(row.budgeted, row.actual)

        data.append(row)

    columns = [
        {
            "fieldname": "period",
            "label": "Period",
            "fieldtype": "Data",
            "width": 100
        },
        {
            "fieldname": "actual",
            "label": "Actual",
            "fieldtype": "Currency",
            "width": 100
        },
        {
            "fieldname": "budgeted",
            "label": "Budgeted",
            "fieldtype": "Currency",
            "width": 100
        },
        {
            "fieldname": "variance",
            "label": "Variance",
            "fieldtype": "Percent",
            "width": 100
        },
    ]

    chart = frappe._dict(
        title="Target Sales",
        data={
            "labels": [x.period for x in data],
            "datasets": [
                {
                    "name": "Actual Revenue",
                    "values": [x.actual for x in data],
                    "chartType": "line",
                },
                {
                    "name": "Budgeted Revenue",
                    "values": [x.budgeted for x in data],
                    "chartType": "line",
                },
                {
                    "name": "Variance",
                    "values": [x.variance for x in data],
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

    total_actual = flt(sum([flt(x.actual) for x in data]), 2)
    total_budgeted = flt(sum([flt(x.budgeted) for x in data]), 2)

    report_summary = [
        {"value": total_actual, "label": "Total Actual Revenue",
            "datatype": "Currency", "currency": "SAR"},
        {"type": "separator", "value": "-"},
        {"value": total_budgeted, "label": "Total Budgeted Revenue",
            "datatype": "Currency", "currency": "SAR"},
        {"type": "separator", "value": "-"},
        {"value": _get_percentage_change(
            total_budgeted, total_actual), "label": "% Change", }
    ]

    return columns, data, None, chart, report_summary


def get_target_sales(from_date, to_date, periodicity):
    from_date = add_to_date(from_date, years=-1)
    to_date = add_to_date(to_date, years=-1)

    div_factor = 1
    if periodicity == 'Monthly':
        div_factor = 12
    elif periodicity == 'Quarterly':
        div_factor = 4
    elif periodicity == 'Half-Yearly':
        div_factor = 2

    return flt(frappe.db.sql(
        f"""
    WITH sales_last_year AS (
        SELECT
            SUM(`tabSales Invoice`.base_grand_total) AS total_revenue
        FROM
            `tabSales Invoice`
        WHERE
            `tabSales Invoice`.posting_date BETWEEN %(from_date)s AND %(to_date)s
            AND `tabSales Invoice`.docstatus = 1
    ),
    sales_last2_year AS (
        SELECT
            SUM(`tabSales Invoice`.base_grand_total) AS total_revenue
        FROM
            `tabSales Invoice`
        WHERE
            `tabSales Invoice`.posting_date BETWEEN DATE_SUB(%(from_date)s, INTERVAL 1 YEAR) AND DATE_SUB(%(to_date)s, INTERVAL 1 YEAR)
            AND `tabSales Invoice`.docstatus = 1
    )
    SELECT
        IF(
            sl2.total_revenue != 0 AND sl2.total_revenue < sl.total_revenue,
            
            sl.total_revenue * (1 + (
                (sl.total_revenue - sl2.total_revenue) / sl2.total_revenue
            ) / {div_factor}),
            
            sl.total_revenue
        ) as target_sales
    FROM
        sales_last_year as sl,
        sales_last2_year as sl2;

    """,
        {"from_date": from_date, "to_date": to_date},
        as_dict=1,
        debug=0
    )[0].target_sales, 2)


def _get_percentage_change(prev_year, current):
    if prev_year and current:
        return flt((current - prev_year) / prev_year * 100, 2)
    return 0
