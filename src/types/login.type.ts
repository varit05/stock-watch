export type LoginRequest = {
  userId: string;
  password: string;
  yob: string;
};

export type LoginResponse = {
  serverTime: string;
  msgId: string;
  status: string;
  statusMessage: string;
  sessionToken: string;
  accountID: string;
  accountName: string;
  exchangeList: string;
  orderTypeList: string;
  productList: string;
};
