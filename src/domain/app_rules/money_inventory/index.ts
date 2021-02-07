import { buildGetStatus } from "./use_cases/get_status";
import { buildDepositMoney } from "./use_cases/deposit_money";
import { buildVacateMoney } from "./use_cases/vacate_money";
import Logger from "../../../infreastructure/external_interfaces/logger";
import { MoneyInventoryRepository } from "../../../interface_adapters/repositories/money_inventory/money_inventory_repo";
import { TransactionsRepository } from "../../../interface_adapters/repositories/transactions/transactions_repo";
import { MoneyInventoryPsqlRepository } from "../../../infreastructure/storage/postgres/repositories/money_inventory/money_inventory_pgsql_repo";
import { TransactionsPsqlRepository } from "../../../infreastructure/storage/postgres/repositories/transactions/transactions_pgsql_repo";

const moneyInventoryRepo = new MoneyInventoryRepository(
    new MoneyInventoryPsqlRepository()
);
const transactionsRepo = new TransactionsRepository(
    new TransactionsPsqlRepository()
);

const getStatus = buildGetStatus({
    moneyInventoryRepo,
});
const depositMoney = buildDepositMoney({
    moneyInventoryRepo,
    transactionsRepo,
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
