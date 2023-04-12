// Copyright (c) 2023, Fahim Ali Zain and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Sales by Waiter"] = {
	"filters": [
		// {
		// 	"fieldname": "waiter",
		// 	"fieldtype": "Link",
		// 	"label": "Waiter",
		// 	"reqd": 0,
		// 	"options": "RMS Waiter",
		// },
		{
			"fieldname": "from_date",
			"fieldtype": "Date",
			"default": frappe.datetime.month_start(),
			"label": "From Date",
			"reqd": 1,
		},
		{
			"fieldname": "to_date",
			"fieldtype": "Date",
			"label": "To Date",
			"default": frappe.datetime.month_end(),
			"reqd": 1,
		}
	]
};
