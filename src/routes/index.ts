import express, { Router, Request, Response } from "express";
import { getDashboardData } from "../services/dashboard.service";
const router: Router = express.Router();

/**
 * route to check Application status
 */

router.get("/", async (_req, res, _next) => {
  try {
    function complete() {
      res.render("index", {
        title: "Stock Note Dashboard",
        sales: res.locals.salesData,
      });
    }
    setInterval(async () => {
      await getDashboardData(res, complete);
    }, 500);
  } catch (error) {
    console.log(error);
  }
});

router.get("/status", (_req: Request, res: Response) => res.send("OK"));

module.exports = router;
