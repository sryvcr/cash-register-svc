import { Router } from 'express';
import { router as mainRouter } from "./main_routes";
import { router as v1Router } from "./v1/index";

const routes = Router();

routes.use('/', mainRouter);
routes.use('/v1', v1Router);

export { routes };
