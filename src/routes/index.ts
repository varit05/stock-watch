import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

const loginRoutes = require("./login.route");

/**
 * route to check Application status
 */

router.get("/status", (_req: Request, res: Response) => res.send("OK"));

router.use("/login", loginRoutes);

module.exports = router;
