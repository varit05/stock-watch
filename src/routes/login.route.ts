import express, { Router } from "express";
import { login } from "../login/login.controller";
import { loginValidator } from "../login/login.validator";

const router: Router = express.Router();

router.route("/").post(loginValidator, login);

module.exports = router;
