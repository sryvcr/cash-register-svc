import { Router } from "express";
import { router as moneyTransactionRouter } from "./money_inventory_routes";

const router = Router();

router.use('/money-transaction', moneyTransactionRouter);

export { router };
