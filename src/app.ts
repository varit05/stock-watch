import * as dotenv from "dotenv";

dotenv.config({ path: __dirname + "/.env" });
import express, { Application } from "express";
import { callStep1 } from "./services/step1.service";
const ehb = require("express-handlebars");
// Application Imports
const routes = require("./routes");

export class App {
  /**
   * Express instance
   * @public
   */
  public app: Application;

  constructor() {
    // Instanciate express app
    this.app = express();
    this.setting();
    this.middlewares();
    this.routes();
  }

  /**
   * Setting basic variables to use it furthur
   */
  private setting() {
    this.app.set("port", process.env.PORT || 3000);
    const hbs = ehb.create({
      defaultLayout: "main",
      helpers: {},
    });

    this.app.engine("handlebars", hbs.engine);
    this.app.set("view engine", "handlebars");
  }

  /**
   * Middlewares
   */
  private middlewares() {
    // Built-in express middleware : parse body params and attach them to req.body
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  /**
   * Navigate to Routes
   */
  private routes() {
    this.app.use("/", routes);
    callStep1();
  }
}
