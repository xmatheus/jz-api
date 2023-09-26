import express from "express";
import morgan from "morgan";
import routes from "./routes";

const app = express();

// Set Morgan Logger
if (process.env.NODE_ENV !== "production") {
  app.use(
    morgan(
      "[INFO] - :method - :url :remote-addr [:date[clf]] - STATUS :status - :response-time ms"
    )
  );
}

app.disable("x-powered-by");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);


export default app;
