import axiosConfig from "./axios.config";
import { API_ROUTES } from "../constants/api.constant";
import { connectToDB, InsertQueryOB } from "./query.service";
import { callStep1 } from "./step1.service";
import { TIMEOUT } from "../constants/app.constant";
import { callStep6 } from "./step6.service";

/*
 * Call Order Book API
 * Success: Insert data in OB table and Move to step 6 after 2 mins wait
 * Failure: Move to step 1 once again
 */

export const callStep5 = async () => {
  try {
    console.log("inside step 5");
    const userLimitResponse: any = await axiosConfig.get(API_ROUTES.ORDERBOOK);
    const { serverTime, orderBookDetails } = userLimitResponse.data;
    const {
      orderNumber,
      tradingSymbol,
      transactionType,
      orderType,
      orderPrice,
      quantity,
      triggerPrice,
      orderStatus,
      filledQuantity,
      averagePrice,
      pendingQuantity,
    } = orderBookDetails;

    // Update the existing data to mysql table OB
    console.log("Insert to table OB", {
      serverTime,
      orderBookDetails,
    });
    const [rows] = await connectToDB(InsertQueryOB, [
      serverTime,
      orderNumber,
      tradingSymbol,
      transactionType,
      orderType,
      orderPrice,
      quantity,
      triggerPrice,
      orderStatus,
      filledQuantity,
      averagePrice,
      pendingQuantity,
    ]);

    console.log("step 5 data: ", rows);
    setTimeout(() => {
      console.log("calling step 6 after 2 minutes");
      callStep6();
    }, TIMEOUT);
  } catch (error) {
    // Even if order book doesn't have data. It should move to next step.
    // In other error scenario, It should be moved to step1.
    if (
      error?.response?.data?.statusMessage
        ?.toLowerCase()
        .includes("no orders found")
    ) {
      setTimeout(() => {
        console.log("calling step 6 after 2 minutes");
        callStep6();
      }, TIMEOUT);
    } else {
      console.log("Error in step 5:", error);
      setTimeout(() => {
        console.log("calling step 1 after 2 minutes");
        callStep1();
      }, TIMEOUT);
    }
  }
};
