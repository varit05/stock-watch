import axios from "axios";
import { BASE_URL } from "../constants/api.constant";

const token = `Basic ${process.env.API_TOKEN}`;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token,
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Expose-Headers": "*",
    "accept-encoding": "gzip,deflate",
  },
});

export default instance;
