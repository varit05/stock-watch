import axiosConfig from "./axios.config";
import { API_ROUTES } from "../constants/api.constant";
import { connectToDB, InsertQueryMW, GetConfigQuery } from "./query.service";
import { callStep1 } from "./step1.service";
import { TIMEOUT } from "../constants/app.constant";
import { callStep5 } from "./step5.service";

/*
 * Get symbolName from CONFIG table, Iterate to symbolname with each and Call Get Quote API
 * Success: Insert data in MW table and Move to step 5 after 2 mins wait
 * Failure: Move to step 1 once again
 */

export const callStep4 = async () => {
  try {
    console.log("inside step 4");
    //  Retrieve Data from config table
    let [configRows] = await connectToDB(GetConfigQuery);

    configRows = Object.values(JSON.parse(JSON.stringify(configRows)));

    console.log({ configRows });

    // configRows.forEach(async (row: any, index: number) => {
    for (const row of configRows) {
      console.time("call get quote:");
      const getQuoteData: any = await axiosConfig.get(
        `${API_ROUTES.GETQUOTE}${row.SymbolName}`
      );
      await connectToDB(InsertQueryMW, [
        getQuoteData.data.serverTime,
        getQuoteData.data.tradingSymbol,
        getQuoteData.data.lastTradedPrice,
      ]);
      // Update the existing data to mysql table MW
      console.time(`added data to db`);
    }
    setTimeout(() => {
      console.log("calling step 5 after 2 minutes");
      callStep5();
    }, TIMEOUT);
  } catch (error) {
    console.log("Error in step 4: ", error);
    setTimeout(() => {
      console.log("calling step 1 after 2 minutes");
      callStep1();
    }, TIMEOUT);
  }
};
