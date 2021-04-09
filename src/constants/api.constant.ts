export const BASE_URL = process.env.STOCKNOTE_BASE_URL;

export const API_ROUTES = {
  LOGIN: "/login",
  USERLIMIT: "/limit/getLimits",
  INDEXQUOTE: "/quote/indexQuote?indexName=NIFTY+50",
  GETQUOTE: "/quote/getQuote?exchange=NFO&symbolName=",
  ORDERBOOK: "/order/orderBook",
  PLACEORDER: "/order/placeOrder",
  MODIFYORDER: "/order/modifyOrder",
  CANCELORDER: "/order/cancelOrder?orderNumber=",
};
