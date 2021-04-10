import axiosConfig from "./axios.config";
import { API_ROUTES } from "../constants/api.constant";
import { connectToDB, InsertQueryFLIMIT } from "./query.service";
import { callStep1 } from "./step1.service";
import { TIMEOUT } from "../constants/app.constant";
import { callStep3 } from "./step3.service";

/*
 * Call User Limit API data
 * Success: Update exisiting data in FLIMIT and Move to step 3 after 2 mins wait
 * Failure: Move to step 1 once again
 */
export const callStep2 = async () => {
  // CALL User Limit API
  try {
    const userLimitResponse: any = await axiosConfig.get(API_ROUTES.USERLIMIT);
    const { equityLimit, commodityLimit } = userLimitResponse.data;
    const { grossAvailableMargin, netAvailableMargin } = equityLimit;
    const { marginUsed } = commodityLimit;

    // Update the existing data to mysql table FLIMIT
    console.log("update to the FLIMIT", {
      grossAvailableMargin,
      marginUsed,
      netAvailableMargin,
    });
    const [rows] = await connectToDB(InsertQueryFLIMIT, [
      grossAvailableMargin,
      marginUsed,
      netAvailableMargin,
    ]);
    console.log(`Calling step 3 after ${TIMEOUT} `);
    setTimeout(() => {
      callStep3();
    }, TIMEOUT);
  } catch (error) {
    console.log("Error in step 2:", error);
    console.log("calling step 1 after 2 minutes");
    setTimeout(() => {
      callStep1();
    }, TIMEOUT);
  }
};
