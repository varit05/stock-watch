import { Request, Response } from "express";
import { postLogin } from "./login.service";
import { LoginResponse } from "../types/login.type";

export const login = async (req: Request, res: Response) => {
  try {
    const loginResponse: LoginResponse = await postLogin(req.body);
    console.log("loginResponse", loginResponse);

    res.status(200).send({ message: "Login Successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
