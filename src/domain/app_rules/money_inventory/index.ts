import { buildGetStatus } from "./use_cases/get_status";
import { buildDepositMoney } from "./use_cases/deposit_money";
import { buildVacateMoney } from "./use_cases/vacate_money";
import Logger from "../../../infreastructure/external_interfaces/logger";
import { MoneyInventoryRepository } from "../../../interface_adapters/repositories/money_inventory/money_inventory_repo";
import { MoneyInventoryPsqlRepository } from "../../../infreastructure/storage/postgres/repositories/money_inventory/money_inventory_pgsql_repo";

const moneyInventoryRepo = new MoneyInventoryRepository(
    new MoneyInventoryPsqlRepository()
);

const getStatus = buildGetStatus({
    moneyInventoryRepo,
});
const depositMoney = buildDepositMoney({
    moneyInventoryRepo,
    Logger
});
const vacateMoney = buildVacateMoney({
    moneyInventoryRepo,
    Logger
});

const service = {
    getStatus,
    depositMoney,
    vacateMoney,
}
export default service;
export {
    getStatus,
    depositMoney,
    vacateMoney,
}
