import { Router } from 'express';
import { router as mainRouter } from "./main_routes";

const routes = Router();

routes.use('/', mainRouter);

export { routes };
