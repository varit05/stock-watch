import axiosConfig from "./axios.config";
import { API_ROUTES } from "../constants/api.constant";
import { connectToDB, InsertQueryIW } from "./query.service";
import { callStep1 } from "./step1.service";
import { TIMEOUT } from "../constants/app.constant";
import { callStep4 } from "./step4.service";

/*
 * Call Index Quote API
 * Success: Insert data in IW table and Move to step 4 after 2 mins wait
 * Failure: Move to step 1 once again
 */

export const callStep3 = async () => {
  // CALL
  try {
    console.log("inside step 3");

    const indexQuoteResponse: any = await axiosConfig.get(
      `${API_ROUTES.INDEXQUOTE}`
    );
    const { serverTime, spotPrice } = indexQuoteResponse.data;

    // Update the existing data to mysql table FLIMIT
    console.log("Insert to table IW", {
      serverTime,
      spotPrice,
    });
    const [rows] = await connectToDB(InsertQueryIW, [serverTime, spotPrice]);

    console.log(rows);
    callStep4();
  } catch (error) {
    console.log("Error in step 3: ", error);
    setTimeout(() => {
      console.log("calling step 1 after 2 minutes");
      callStep1();
    }, TIMEOUT);
  }
};
