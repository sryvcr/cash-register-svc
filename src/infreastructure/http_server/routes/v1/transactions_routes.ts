import { Router } from "express";
import { TransactionsController } from "../../../../interface_adapters/web/controllers/transactions_controller";
import transactionsFilter from "../../middlewares/build_filters/transactions_filter";

const transactionsCtrl = new TransactionsController();

const router = Router();
router.get('/get-all', transactionsFilter, transactionsCtrl.get);
router.get('/get-amount/:till_datetime', transactionsFilter, transactionsCtrl.getAmountTillDatetime);

export { router };
