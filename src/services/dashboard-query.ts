export const dashboardQueries = [
  "select sum(NQ) from MASTER",
  "select TS, sum(BQ), sum(SQ) from MASTER group by TS",
  "select TS, BKPR from MASTER;",
  "select TS,MGN from MASTER;",
];
