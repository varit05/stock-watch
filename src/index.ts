import { App } from "./app";

const app = new App().app;
/**
 * Binds and listens for the connection on specified port
 */
app.listen(app.get("port"), () => {
  console.log(
    "App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("Press CTRL-C to stop\n");
});
