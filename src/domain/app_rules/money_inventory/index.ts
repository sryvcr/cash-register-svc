import { buildDepositMoney } from "./use_cases/deposit_money";
import Logger from "../../../infreastructure/external_interfaces/logger";
import { MoneyInventoryRepository } from "../../../interface_adapters/repositories/money_inventory/money_inventory_repo";
import { MoneyInventoryPsqlRepository } from "../../../infreastructure/storage/postgres/repositories/money_inventory/money_inventory_pgsql_repo";

const moneyInventoryRepo = new MoneyInventoryRepository(
    new MoneyInventoryPsqlRepository()
);

const depositMoney = buildDepositMoney({
    moneyInventoryRepo,
    Logger
});

const service = {
    depositMoney,
}
export default service;
export {
    depositMoney,
}
