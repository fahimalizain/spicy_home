// Copyright (c) 2023, Fahim Ali Zain and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Combo Order"] = {
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
			"fieldname": "combo_type",
			"label": __("Type"),
			"fieldtype": "Select",
			"options": "Duo\nTrio\nQuartet",
			"default": "Duo"
		},
	]
};
