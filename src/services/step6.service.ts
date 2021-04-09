import { connectToDB, GetMasterQuery } from "./query.service";
import { callStep1 } from "./step1.service";
import { TIMEOUT } from "../constants/app.constant";
import { placeOrder, modifyOrder, cancelOrder, roundup } from "./order.service";
import { callStep2 } from "./step2.service";

export const callStep6 = async () => {
  try {
    console.log("inside step 6");

    const [configRows] = await connectToDB(GetMasterQuery);

    const masterRecords = Object.values(JSON.parse(JSON.stringify(configRows)));

    console.log({ configRows });

    masterRecords.forEach(async (record) => {
      console.log({ record });
      await rule01(record);
    });

    // Once all the records are check against rules, call step 2
    setTimeout(() => {
      console.log("calling step 2 after 2 minutes");
      callStep2();
    }, TIMEOUT);
  } catch (error) {
    console.log("Error in step 6:", error);
    setTimeout(() => {
      console.log("calling step 1 after 2 minutes");
      callStep1();
    }, TIMEOUT);
  }
};

const rule01 = async (A: any) => {
  if (
    A.TNQ == 0 &&
    A.TPBQ == 0 &&
    A.EL1 > 0 &&
    A.EL > 0 &&
    A.LTP >= 50 &&
    A.OQ > 0 &&
    A.OQ1 > 0
  ) {
    await placeOrder(A);
    console.log("Rule01 - CE Buy triggered " + roundup(A.LTP * 0.5, 1));
    return;
  } else {
    console.log("calling Rule 02");
    rule02(A);
    return;
  }
};

const rule02 = async (A: any) => {
  if (A.PBQ > 0 && A.PBOP >= roundup(A.LTP * 0.5, 1)) {
    await modifyOrder(A);
    console.log("Rule02 - Buy order modified " + roundup(A.LTP * 0.5, 1));
    return;
  } else {
    console.log("calling Rule 023");
    rule03(A);
    return;
  }
};

const rule03 = async (A: any) => {
  if (A.PBQ > 0 && A.PBOP < roundup(A.LTP * 0.5, 1)) {
    await cancelOrder(A.OBBP);
    console.log("Rule03 - Buy order cancelled ");
    return;
  }
  return;
};
