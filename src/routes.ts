import { Router } from "express";
import healthz from "./routes/healthz";

const apiRouter = Router();

apiRouter.use(healthz);

export default apiRouter;
