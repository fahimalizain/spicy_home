import * as mssql from 'mssql';

export async function connectToDB() {
  await mssql
    .connect({
      server: process.env['MSSQL_SERVER'] || 'localhost',
      port: parseInt(process.env['MSSQL_PORT'] || '1433'),
      database: process.env['MSSQL_DATABASE'],
      user: process.env['MSSQL_USER'],
      password: process.env['MSSQL_PWD'],
      options: {
        trustServerCertificate: true,
      },
    })
    .catch((err: Error) => {
      return Promise.reject({
        message: 'DB Connection failed',
        err,
      });
    });
}

export async function dbSQL(
  query: string,
  params: Record<string, unknown> | null = null
) {
  const request = new mssql.Request();
  if (params) {
    Object.keys(params).forEach((key) => {
      request.input(key, params[key] as string);
    });
  }

  const r = await request.query(query);
  return r.recordset;
}

export const sql = mssql;
