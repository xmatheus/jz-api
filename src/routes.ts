import { Router } from "express";
import { accessControlMiddleware } from "./middlewares/access-control-middleware";
import healthz from "./routes/healthz";
import pokemons from "./routes/pokemons";

const apiRouter = Router();

apiRouter.use(accessControlMiddleware);
apiRouter.use(healthz);
apiRouter.use(pokemons);

export default apiRouter;
