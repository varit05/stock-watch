import { API_ROUTES } from "../constants/api.constant";
import { LoginRequest, LoginResponse } from "../types/login.type";
import { callStep2 } from "./step2.service";
import { connectToDB, LoginQuery } from "./query.service";
import { TIMEOUT } from "../constants/app.constant";
import axiosConfig from "./axios.config";

/*
 * First step to Login to the application and store session token
 * Success: Move to step 2 after 2 mins wait
 * Failure: Move to step 1 once again
 */
export const callStep1 = async () => {
  try {
    const [rows] = await connectToDB(LoginQuery);
    const user: any = Object.values(JSON.parse(JSON.stringify(rows)))[0];
    const data: LoginRequest = {
      userId: user.uid,
      password: user.pwd,
      yob: user.yob,
    };
    const loginResponse: {
      data: LoginResponse;
    } = await axiosConfig.post(`${API_ROUTES.LOGIN}`, data);

    console.log("loginResponse", loginResponse.data);

    axiosConfig.interceptors.request.use((config: any) => {
      config.headers.common["x-session-token"] =
        loginResponse.data.sessionToken;
      return config;
    });

    setTimeout(() => {
      console.log("calling step 2");
      callStep2();
    }, TIMEOUT);
  } catch (error) {
    console.log("error in login", error);
    setTimeout(() => {
      console.log("calling step 1 after 2 minutes");
      callStep1();
    }, TIMEOUT);
  }
};
