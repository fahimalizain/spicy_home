import SyncBase from './sync_base';
import { dbSQL } from './db';
import {
  DBRMSWaiter,
  FrappeRMSWaiter,
  RMSWaiterToFrappeRMSWaiter,
} from './types';

import * as CLIProgress from 'cli-progress';

export default class SyncWaiters extends SyncBase {
  override async syncAll() {
    const db_rows = await this.getAllWaitersFromDB();
    const frappe_rows = await this.getAllWaitersFromFrappe();

    await this.syncWaiters(db_rows, frappe_rows);
  }

  async syncWaiters(db_rows: DBRMSWaiter[], frappe_rows: FrappeRMSWaiter[]) {
    const frappe_waiter_ids = frappe_rows.map((x) => parseInt(x.waiter_id));
    const frappe_waiter_id_map = frappe_rows.reduce((acc, x) => {
      acc[parseInt(x.waiter_id)] = x;
      return acc;
    }, {} as Record<number, FrappeRMSWaiter>);

    const waiters_to_create = db_rows.filter(
      (x) => !frappe_waiter_ids.includes(x.ID)
    );

    const waiters_to_update = db_rows.filter((x) => {
      if (!frappe_waiter_ids.includes(x.ID)) {
        return false;
      }

      const frappe_waiter = frappe_waiter_id_map[x.ID];
      return (
        x.Name !== frappe_waiter.waiter_name || x.Code !== frappe_waiter.code
      );
    });

    console.log('To Create:', waiters_to_create.length);
    console.log('To Update:', waiters_to_update.length);

    await this.createRMSWaiters(waiters_to_create);
    await this.updateWaiters(waiters_to_update);
  }

  async createRMSWaiters(waiters: DBRMSWaiter[]) {
    const progressBar = new CLIProgress.SingleBar(
      {},
      CLIProgress.Presets.shades_classic
    );
    progressBar.start(waiters.length, 0);

    for (const waiter of waiters) {
      const doc = RMSWaiterToFrappeRMSWaiter(waiter);

      await this.client.insert({
        doctype: 'RMS Waiter',
        doc: doc,
      });

      progressBar.increment();
    }
    progressBar.stop();
  }

  async updateWaiters(waiters: DBRMSWaiter[]) {
    const progressBar = new CLIProgress.SingleBar(
      {},
      CLIProgress.Presets.shades_classic
    );
    progressBar.start(waiters.length, 0);

    for (const waiter of waiters) {
      const doc = RMSWaiterToFrappeRMSWaiter(waiter);
      await this.client.update({
        doctype: 'RMS Waiter',
        name: doc.waiter_id,
        doc: doc,
      });

      progressBar.increment();
    }
    progressBar.stop();
  }

  async getAllWaitersFromDB() {
    const result = await dbSQL(`SELECT * FROM [dbo].[Waiter]`);
    return result;
  }

  async getAllWaitersFromFrappe() {
    const waiters = await this.client.get_list({
      doctype: 'RMS Waiter',
      filters: {},
      fields: ['*'],
      limit_page_length: 999999,
    });
    return waiters;
  }
}
