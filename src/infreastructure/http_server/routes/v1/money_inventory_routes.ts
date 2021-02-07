import { Router } from 'express';
import { MoneyInventoryController } from '../../../../interface_adapters/web/controllers/money_inventory_controller';

const moneyInventoryCtrl = new MoneyInventoryController();

const router = Router();
router.get('/status', moneyInventoryCtrl.get);
router.put('/deposit', moneyInventoryCtrl.deposit);
router.put('/vacate', moneyInventoryCtrl.vacate);

export { router };
