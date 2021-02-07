import { buildTransactionsList, buildCountList } from "./use_cases/get_all";
import { buildGetAmountTillDatetime } from "./use_cases/get_amount_till_datetime";
import { buildCreatePayment } from "./use_cases/create_payment";
import Logger from "../../../infreastructure/external_interfaces/logger";
import { TransactionsRepository } from "../../../interface_adapters/repositories/transactions/transactions_repo";
import { MoneyInventoryRepository } from "../../../interface_adapters/repositories/money_inventory/money_inventory_repo";
import { TransactionsPsqlRepository } from "../../../infreastructure/storage/postgres/repositories/transactions/transactions_pgsql_repo";
import { MoneyInventoryPsqlRepository } from "../../../infreastructure/storage/postgres/repositories/money_inventory/money_inventory_pgsql_repo";

const transactionsRepo = new TransactionsRepository(
    new TransactionsPsqlRepository()
);
const moneyInventoryRepo = new MoneyInventoryRepository(
    new MoneyInventoryPsqlRepository()
);

const getAll = buildTransactionsList({
    transactionsRepo,
});
const getAmountTillDatetime = buildGetAmountTillDatetime({
    transactionsRepo,
    Logger
});
const createPayment = buildCreatePayment({
    transactionsRepo,
    moneyInventoryRepo,
    Logger
})
const count = buildCountList({
    transactionsRepo,
});

const service = {
    getAll,
    getAmountTillDatetime,
    createPayment,
    count,
}
export default service;
export {
    getAll,
    getAmountTillDatetime,
    createPayment,
    count,
}
