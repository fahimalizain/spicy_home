import SyncBase from "./sync_base";
import { dbSQL } from "./db";
import { DBRMSItem, FrappeRMSItem, RMSItemToFrappeRMSItem } from "./types";

import CLIProgress from "cli-progress";

export default class SyncItemGroups extends SyncBase {
    async syncAll() {
        const dbCourses = await this.getAllCoursesFromDB();
        const dbSubCourses = await this.getAllSubCoursesFromDB();

        for (const course of dbCourses) {
            await this.client.insert({
                doctype: "Item Group",
                doc: {
                    item_group_name: course.Name,
                    rms_id: course.ID,
                    is_group: 1,
                    parent_item_group: "All Item Groups",
                    rms_kind: "Course",
                },
            })
        }

        for (const subCourse of dbSubCourses) {
            const course = dbCourses.find(x => x.ID === subCourse.Course);

            await this.client.insert({
                doctype: "Item Group",
                doc: {
                    item_group_name: `${subCourse.Name} - ${course.Name}`,
                    rms_id: subCourse.ID,
                    is_group: 0,
                    parent_item_group: course.Name,
                    rms_kind: "SubCourse",
                },
            })
        }
    }


    async getAllCoursesFromDB() {
        const result = await dbSQL("SELECT * FROM [dbo].[Course]");
        return result;
    }

    async getAllSubCoursesFromDB() {
        const result = await dbSQL("SELECT * FROM [dbo].[SubCourse]");
        return result;
    }

    async getFrappeItemGroupTree() {
        const result = this.client.post_cmd(
            "frappe.desk.treeview.get_all_nodes",
            {
                doctype: "Item Group",
                parent: "All Item Groups",
                label: "All Item Groups",
                is_root: true,
                tree_method: "frappe.desk.treeview.get_children",
            }
        )

        return result;
    }
}