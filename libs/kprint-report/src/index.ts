export * from './lib/kprint-report';
console.info('🚀 KPrint Report loaded');
import { connect } from 'mssql';

const config = {
  user: 'sa',
  password: 'qEidRkswMUsEmR31DFMg',
  server: 'localhost',
  database: 'SPICYHOME',
  options: {
    encrypt: false,
  },
};

async function loadPrintCounts() {
  const pool = await connect(config);

  let r = await pool.request().query(`
    SELECT TOP 10 * FROM RMSOrderHeader
  `);
  console.log(r.recordset);

  r = await pool.request().query(`
    SELECT DISTINCT RMSOrderHeader.OrderNo, RMSOrderHeader.Date FROM RMSOrderDetails JOIN RMSOrderHeader ON RMSOrderDetails.OrderNo = RMSOrderHeader.OrderNo
    WHERE RMSOrderDetails.PQty != RMSOrderDetails.Qty ORDER BY RMSOrderHeader.Date DESC
  `);
  console.log(r.recordset);
}

loadPrintCounts()
  .then(() => console.log('✅ Done'))
  .catch((e) => console.error('❌ E.rror', e));
