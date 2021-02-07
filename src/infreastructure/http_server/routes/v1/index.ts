import { Router } from "express";
import { router as moneyInventoryRouter } from "./money_inventory_routes";
import { router as transactionsRouter } from "./transactions_routes";

const router = Router();

router.use('/money-inventory', moneyInventoryRouter);
router.use('/transactions', transactionsRouter);

export { router };
