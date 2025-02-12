import { Hono } from "hono";

export const calculator = new Hono();
let state = 0;

calculator.get("/add", (c) => {
  const { y } = c.req.query();
  if (!y || isNaN(parseInt(y)))
    return c.json(
      {
        message: "No (Y) provided",
      },
      400
    );

  state = state + parseInt(y);
  return c.json({
    result: state,
  });
});

calculator.get("/stateless-add", (c) => {
  const { x, y } = c.req.query();
  if (!x || !y || isNaN(parseInt(x)) || isNaN(parseInt(y))) {
    return c.json({ message: "No ( X || Y) provided" }, 400);
  }

  return c.json({
    result: parseInt(x) + parseInt(y),
  });
});

calculator.get("/reset", (c) => {
  state = 0;
  return c.json({
    result: state,
  });
});

calculator.get("/crash", (c) => {
  console.log("Server is crashing...");
  process.exit(1);
});

calculator.get("/stress", (c) => {
  setTimeout(stressCpu, 1000);
  return c.json({ message: "CPU Stress Test started" });
});

function stressCpu() {
  while (true) {
    Math.sqrt(Math.random());
  }
}
