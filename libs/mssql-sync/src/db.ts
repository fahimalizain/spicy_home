import sql from "mssql";

export async function connectToDB() {
  await sql
    .connect({
      server: process.env.MSSQL_SERVER,
      port: parseInt(process.env.MSSQL_PORT || "1433"),
      database: process.env.MSSQL_DATABASE,
      user: process.env.MSSQL_USER,
      password: process.env.MSSQL_PWD,
      trustServerCertificate: true,
    })
    .catch((err: Error) => {
      return Promise.reject({
        message: "DB Connection failed",
        err,
      });
    });
}

export async function dbSQL(query: string, params: object | null = null) {
  const request = new sql.Request();
  if (params) {
    Object.keys(params).forEach((key) => {
      request.input(key, params[key]);
    });
  }

  let r = await request.query(query);
  return r.recordset;
}

export const sql = sql;
