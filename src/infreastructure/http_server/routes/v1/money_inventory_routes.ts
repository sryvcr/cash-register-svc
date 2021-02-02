import { Router } from 'express';
import { MoneyTransacitonController } from '../../../../interface_adapters/web/controllers/money_inventory_controller';

const moneyTransactionCtrl = new MoneyTransacitonController();

const router = Router();
router.put('/deposit', moneyTransactionCtrl.deposit);
router.put('/vacate', moneyTransactionCtrl.vacate);

export { router };
