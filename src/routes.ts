import { Router } from "express";
import { accessControlMiddleware } from "./middlewares/access-control-middleware";
import healthz from "./routes/healthz";
import pokemons from "./routes/pokemons";

import swaggerUi from "swagger-ui-express";
import swaggerFile from "../swagger_output.json";

const apiRouter = Router();

apiRouter.use(accessControlMiddleware);
apiRouter.use(healthz);
apiRouter.use(pokemons);

if (process.env.NODE_ENV === "development") {
    apiRouter.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
}

export default apiRouter;
