# Copyright (c) 2023, Fahim Ali Zain and contributors
# For license information, please see license.txt

import frappe


def execute(filters=None):
    columns = get_columns(filters.combo_type)
    data = get_frequent_combos(
        filters.from_date, filters.to_date, filters.combo_type)

    fill_item_names(data)

    return columns, data


def get_columns(combo_type):
    columns = [
        {
            "fieldname": "ItemID1",
            "label": "Item 1",
            "fieldtype": "Link",
            "options": "Item",
            "width": 70
        },
        {
            "fieldname": "ItemID2",
            "label": "Item 2",
            "fieldtype": "Link",
            "options": "Item",
            "width": 70
        }
    ]

    if combo_type in ["Trio", "Quartet"]:
        columns.append({
            "fieldname": "ItemID3",
            "label": "Item 3",
            "fieldtype": "Link",
            "options": "Item",
            "width": 70
        })

    if combo_type == "Quartet":
        columns.extend([
            {
                "fieldname": "ItemID4",
                "label": "Item 4",
                "fieldtype": "Link",
                "options": "Item",
                "width": 70
            }
        ])

    # Add ItemID1Name, ItemID2Name, ItemID3Name, ItemID4Name
    for i in range(len(columns)):
        columns.insert(
            (i*2) + 1,
            {
                "fieldname": f"ItemID{i + 1}Name",
                "label": "Name",
                "fieldtype": "Data",
                "width": 100
            })

    columns.append({
        "fieldname": "Frequency",
        "label": "Frequency",
        "fieldtype": "Int",
        "width": 100
    })

    return columns


def get_frequent_combos(from_date, to_date, combo_type):
    item_pairs = """
    WITH ItemPairs AS (
        SELECT
            A.parent,
            A.item_code AS ItemID1,
            B.item_code AS ItemID2
        FROM
            `tabSales Invoice Item` A
        JOIN
            `tabSales Invoice Item` B
            ON A.parent = B.parent
                AND A.item_code < B.item_code
        JOIN
            `tabSales Invoice` invoice
            ON invoice.name = A.parent
        WHERE
            invoice.docstatus = 1
            AND invoice.posting_date BETWEEN %(from_date)s AND %(to_date)s
    )"""

    item_triplets = """
    ItemTriplets AS (
        SELECT
            P1.parent,
            P1.ItemID1,
            P1.ItemID2,
            P2.ItemID2 AS ItemID3
        FROM
            ItemPairs P1
        JOIN
            ItemPairs P2
        ON
            P1.parent = P2.parent
            AND P1.ItemID2 < P2.ItemID2
    )"""

    item_quartets = """
    ItemQuartets AS (
        SELECT
            P1.parent,
            P1.ItemID1,
            P1.ItemID2,
            P1.ItemID3,
            P2.ItemID3 AS ItemID4
        FROM
            ItemTriplets P1
        JOIN
            ItemTriplets P2
        ON
            P1.parent = P2.parent
            AND P1.ItemID3 < P2.ItemID3
    )"""

    frequent_combo = """
    FrequentCombo AS (
        SELECT
            {columns},
            COUNT(*) AS Frequency
        FROM
            {freq_table}
        GROUP BY
            {columns}
    )"""

    if combo_type == "Duo":
        columns = "ItemID1, ItemID2"
        freq_table = "ItemPairs"
        with_statements = [item_pairs, frequent_combo]
    elif combo_type == "Trio":
        columns = "ItemID1, ItemID2, ItemID3"
        freq_table = "ItemTriplets"
        with_statements = [item_pairs, item_triplets, frequent_combo]
    elif combo_type == "Quartet":
        columns = "ItemID1, ItemID2, ItemID3, ItemID4"
        freq_table = "ItemQuartets"
        with_statements = [item_pairs, item_triplets,
                           item_quartets, frequent_combo]
    else:
        raise Exception("Invalid combo type")

    with_statements = ",\n".join(with_statements).format(
        columns=columns, freq_table=freq_table)

    final_sql = f"""
        {with_statements}
        SELECT
            {columns},
            Frequency
        FROM 
            FrequentCombo
        WHERE
            Frequency > 1
        ORDER BY
            Frequency DESC
        LIMIT 40
    """

    return frappe.db.sql(final_sql, dict(
        from_date=from_date, to_date=to_date
    ), as_dict=True, debug=1)


def fill_item_names(data):
    item_ids = set()
    for row in data:
        for i in range(1, 5):
            item_id = row.get(f"ItemID{i}")
            if not item_id:
                continue

            item_ids.add(item_id)

    item_names = frappe.get_all("Item", filters={
        "item_code": ("in", list(item_ids))
    }, fields=["item_code", "item_name"])

    item_names = {row.item_code: row.item_name for row in item_names}

    for row in data:
        for i in range(1, 5):
            item_id = row.get(f"ItemID{i}")
            if not item_id:
                continue

            row[f"ItemID{i}Name"] = f"{item_names[item_id]}"
