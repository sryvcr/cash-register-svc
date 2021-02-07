import { buildTransactionsList, buildCountList } from "./use_cases/get_all";
import { buildGetAmountTillDatetime } from "./use_cases/get_amount_till_datetime";
import Logger from "../../../infreastructure/external_interfaces/logger";
import { TransactionsRepository } from "../../../interface_adapters/repositories/transactions/transactions_repo";
import { TransactionsPsqlRepository } from "../../../infreastructure/storage/postgres/repositories/transactions/transactions_pgsql_repo";

const transactionsRepo = new TransactionsRepository(
    new TransactionsPsqlRepository()
);

const getAll = buildTransactionsList({
    transactionsRepo,
});
const getAmountTillDatetime = buildGetAmountTillDatetime({
    transactionsRepo,
    Logger
});
const count = buildCountList({
    transactionsRepo,
});

const service = {
    getAll,
    getAmountTillDatetime,
    count,
}
export default service;
export {
    getAll,
    getAmountTillDatetime,
    count,
}
