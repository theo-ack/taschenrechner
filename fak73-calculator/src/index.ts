import { Hono } from "hono";
import * as os from "os";
import { calculator } from "./routes/calculator";
const app = new Hono();

//Welcome Message
app.get("/", (c) => {
  return c.text(`Hello from ${os.hostname()}`);
});

//connect routes
app.route("/calculator", calculator);

export default {
  fetch: app.fetch,
  port: 8080,
};

app.post();
