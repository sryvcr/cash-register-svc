import { buildTransactionsList, buildCountList } from "./use_cases/get_all";
import { TransactionsRepository } from "../../../interface_adapters/repositories/transactions/transactions_repo";
import { TransactionsPsqlRepository } from "../../../infreastructure/storage/postgres/repositories/transactions/transactions_pgsql_repo";

const transactionsRepo = new TransactionsRepository(
    new TransactionsPsqlRepository()
);

const getAll = buildTransactionsList({
    transactionsRepo,
});
const count = buildCountList({
    transactionsRepo,
});

const service = {
    getAll,
    count,
}
export default service;
export {
    getAll,
    count,
}
