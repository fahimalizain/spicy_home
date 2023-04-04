import * as dotenv from 'dotenv';
import FrappeClient from './frappe-client';
import SyncItems from './sync_item';
import SyncOrders from './sync_order';
import SyncWaiters from './sync_waiters';
// import SyncItemGroups from './sync_item_group';
import { connectToDB } from './db';

dotenv.config();

async function main() {
  await connectToDB();

  const client = new FrappeClient();
  await client.ping();
  await client.authenticate();

  // const syncItemGroups = new SyncItemGroups(client);
  // await syncItemGroups.syncAll();
  // console.log('Item Groups Synced ✅');

  const syncWaiters = new SyncWaiters(client);
  await syncWaiters.syncAll();
  console.log('Waiters Synced ✅');

  const syncItems = new SyncItems(client);
  await syncItems.syncAll();
  console.log('Items Synced ✅');

  const syncOrders = new SyncOrders(client);
  await syncOrders.syncAll();
  console.log('Orders Synced ✅');
}

main()
  .then(() => console.log('Clean Exit ✅'))
  .catch((x) => {
    if (x.message) {
      console.error('❌', x.message);
    }

    if (x.err) {
      console.error(x.err);
    } else {
      console.log('❌', x);
    }
  });
