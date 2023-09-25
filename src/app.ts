import express from "express";
import http from "http";
import morgan from "morgan";
import errorHandler from "./middlewares/error-handler";
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

app.use(errorHandler);

export default app;
