import { LoginRequest } from "../types/login.type";
import axios from "axios";
import { BASE_URL, API_ROUTES } from "../constants/api.constant";

export const postLogin: any = async (loginReq: LoginRequest) => {
  return await axios.post(`${BASE_URL}${API_ROUTES.LOGIN}`, {
    data: loginReq,
  });
};
