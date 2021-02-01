import { Router } from 'express';
import { MoneyTransacitonController } from '../../../../interface_adapters/web/controllers/money_inventory_controller';

const banksCtrl = new MoneyTransacitonController();

const router = Router();
router.put('/deposit', banksCtrl.deposit);

export { router };
