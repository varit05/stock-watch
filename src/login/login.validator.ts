import { Request, Response, NextFunction } from "express";
import { BAD_REQUEST } from "http-status-codes";
import { string, object, ObjectSchema, ValidationResult } from "joi";
import { LoginRequest } from "../types/login.type";

export const loginValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await validateLoginParams(req.body);
    next();
  } catch (e) {
    const errorMessage = e.details.map((d: any) => d.message);
    res.status(BAD_REQUEST).json({ validationErrors: errorMessage });
    return;
  }
};

const validateLoginParams = async (
  request: LoginRequest
): Promise<ValidationResult> => {
  const loginReqSchema: ObjectSchema = object().keys({
    userId: string().required(),
    password: string().required(),
    yob: string().required(),
  });
  return loginReqSchema.validateAsync(request);
};
