import { Router } from "express";
import { router as moneyInventoryRouter } from "./money_inventory_routes";

const router = Router();

router.use('/money-inventory', moneyInventoryRouter);

export { router };
