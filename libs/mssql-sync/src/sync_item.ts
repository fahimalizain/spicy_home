import SyncBase from './sync_base';
import { dbSQL } from './db';
import { DBRMSItem, FrappeRMSItem, RMSItemToFrappeRMSItem } from './types';

import * as CLIProgress from 'cli-progress';

export default class SyncItems extends SyncBase {
  override async syncAll() {
    const db_rows = await this.getAllItemsFromDB();
    const frappe_rows = await this.getAllItemsFromFrappe();

    await this.syncItems(db_rows, frappe_rows);
  }

  async syncItems(db_rows: DBRMSItem[], frappe_rows: FrappeRMSItem[]) {
    const frappe_item_ids = frappe_rows.map((x) => parseInt(x.item_id));
    const frappe_item_id_map = frappe_rows.reduce((acc, x) => {
      acc[parseInt(x.item_id)] = x;
      return acc;
    }, {} as Record<number, FrappeRMSItem>);

    const items_to_create = db_rows.filter(
      (x) => !frappe_item_ids.includes(x.ItemID)
    );

    const items_to_update = db_rows.filter((x) => {
      if (!frappe_item_ids.includes(x.ItemID)) {
        return false;
      }

      const frappe_item = frappe_item_id_map[x.ItemID];
      return (
        x.Name !== frappe_item.item_name ||
        x.DescriptionInOL !== frappe_item.description_in_ol ||
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        x.Rate != frappe_item.rate // != is intentional
      );
    });

    console.log('To Create:', items_to_create.length);
    console.log('To Update:', items_to_update.length);

    await this.createRMSItems(items_to_create);
    await this.updateItems(items_to_update);
  }

  async createRMSItems(rms_items: DBRMSItem[]) {
    const progressBar = new CLIProgress.SingleBar(
      {},
      CLIProgress.Presets.shades_classic
    );
    progressBar.start(rms_items.length, 0);

    for (const rms_item of rms_items) {
      // TODO: ItemImage which is a Binary Buffer
      const doc = RMSItemToFrappeRMSItem(rms_item);

      await this.client.insert({
        doctype: 'RMS Item',
        doc: doc,
      });

      progressBar.increment();
    }
    progressBar.stop();
  }

  async updateItems(rms_items: DBRMSItem[]) {
    const progressBar = new CLIProgress.SingleBar(
      {},
      CLIProgress.Presets.shades_classic
    );
    progressBar.start(rms_items.length, 0);

    for (const rms_item of rms_items) {
      const doc = RMSItemToFrappeRMSItem(rms_item);
      await this.client.update({
        doctype: 'RMS Item',
        name: doc.item_id,
        doc: doc,
      });

      progressBar.increment();
    }
    progressBar.stop();
  }

  async getAllItemsFromDB() {
    const result = await dbSQL(`SELECT * FROM [dbo].[RMSItem]`);
    return result;
  }

  async getAllItemsFromFrappe() {
    const items = await this.client.get_list({
      doctype: 'RMS Item',
      filters: {},
      fields: ['*'],
      limit_page_length: 999999,
    });
    return items;
  }
}
