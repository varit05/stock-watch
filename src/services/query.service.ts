const connection = require("../connection");

export const connectToDB = async (query: string, values?: any) => {
  return await connection.query(query, values);
};

export const LoginQuery = "SELECT * from user";
export const GetConfigQuery = "SELECT * from config";
export const GetMasterQuery = "SELECT * from master";
export const InsertQueryFLIMIT =
  "DELETE from FLIMIT LIMIT 1; INSERT INTO FLIMIT (GAM, MU, NAM) VALUES (?, ?, ?);";

export const InsertQueryIW = "INSERT INTO IW (IWTime, price) VALUES (?, ?);";

export const InsertQueryMW =
  "INSERT INTO MW (CurrTime, TS, LTP) VALUES (?, ?, ?);";

export const InsertQueryOB =
  "INSERT INTO OB (CurrTime, Ordno, TS, Buysell, Ordtyp, Price, Oq, Tp, Status1, Tq, Ap, Pq) VALUES (?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?);";
