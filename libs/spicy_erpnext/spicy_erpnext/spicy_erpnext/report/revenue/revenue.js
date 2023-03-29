// Copyright (c) 2023, Fahim Ali Zain and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Revenue"] = {
	"filters": [
		{
			"fieldname": "from_date",
			"label": __("From Date"),
			"fieldtype": "Date",
			"default": frappe.datetime.month_start(),
			"reqd": 1
		},
		{
			"fieldname": "to_date",
			"label": __("To Date"),
			"fieldtype": "Date",
			"default": frappe.datetime.month_end(),
			"reqd": 1
		},
		{
			"fieldname": "periodicity",
			"label": __("Periodicity"),
			"fieldtype": "Select",
			"options": "Monthly\nQuarterly\nHalf-Yearly\nYearly",
			"default": "Monthly"
		},
	]
};
