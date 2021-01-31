import { Router } from "express";
import { MainController } from "../../../interface_adapters/web/controllers/main_controller";

const mainCtrl = new MainController();

const router = Router();
router.get('/', mainCtrl.get);

export { router };
