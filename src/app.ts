import express from "express";
import http from "http";
import morgan from "morgan";
import routes from "./routes";

const app = express();

// Set Morgan Logger
if (process.env.NODE_ENV === "development") {
    app.use(
        morgan(
            "[INFO] - :method - :url :remote-addr [:date[clf]] - STATUS :status - :response-time ms"
        )
    );
}

// doesn't show server information
app.disable("x-powered-by");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

export default http.createServer(app);
