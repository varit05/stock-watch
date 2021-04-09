import axiosConfig from "./axios.config";
import { API_ROUTES } from "../constants/api.constant";

export const placeOrder = async (A: any) => {
  try {
    const placeOrderData = {
      symbolName: A.TS,
      exchange: "NFO",
      transactionType: "BUY",
      orderType: "L",
      quantity: A.OQ1,
      disclosedQuantity: A.OQ1,
      price: roundup(A.LTP * 0.5, 1),
      priceType: "LTP",
      marketProtection: "",
      orderValidity: "DAY",
      afterMarketOrderFlag: "NO",
      productType: "NRML",
      triggerPrice: 0,
    };
    const orderPlaceResponse = await axiosConfig.post(
      API_ROUTES.PLACEORDER,
      placeOrderData
    );
    console.log("Order placed successfully:", orderPlaceResponse.data);
    return orderPlaceResponse.data;
  } catch (error) {
    console.log("Error while placing order:", error.request);
  }
};

export const modifyOrder = async (A: any) => {
  try {
    const modifyOrderData = {
      orderNumber: A.OBBP,
      orderType: "L",
      quantity: A.PBQ,
      disclosedQuantity: A.PBQ,
      orderValidity: "DAY",
      price: roundup(A.LTP * 0.5, 1),
      triggerPrice: "0",
      parentOrderId: A.OBBP,
      marketProtection: " ",
    };
    const modifyOrderResponse = await axiosConfig.post(
      API_ROUTES.MODIFYORDER,
      modifyOrderData
    );
    console.log("Order modify successfully:", modifyOrderResponse.data);
    return modifyOrderResponse.data;
  } catch (error) {
    console.log("Error while modifing order:", error.request);
  }
};

export const cancelOrder = async (orderId: string) => {
  try {
    const cancelOrderResponse = await axiosConfig.delete(
      `${API_ROUTES.CANCELORDER}${orderId}`
    );
    console.log("Order cancelled successfully:", cancelOrderResponse.data);
    return cancelOrderResponse.data;
  } catch (error) {
    console.log("Error while cancelling order:", error.request);
  }
};

export const roundup = (rnum: number, rlength: number): number => {
  return Math.ceil(rnum * Math.pow(10, rlength)) / Math.pow(10, rlength);
};
