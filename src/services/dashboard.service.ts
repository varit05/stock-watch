import { connectToDB } from "./query.service";

export const dashboardQueries = [
  "select sum(NQ) as NQTotal from MASTER",
  "select TS, sum(BQ) as BQTotal, sum(SQ) as SQTotal from MASTER group by TS",
  "select TS, BKPR from MASTER;",
  "select TS,MGN from MASTER;",
];

export const getDashboardData = async (res: any, callback: any) => {
  const data: any = [];
  dashboardQueries.forEach(async (query) => {
    const [rows] = await connectToDB(query);
    data.push(Object.values(JSON.parse(JSON.stringify(rows))));
    if (data.length === dashboardQueries.length) {
      console.log("data", data);
      res.locals.salesData = data;
      callback();
    }
  });
};
