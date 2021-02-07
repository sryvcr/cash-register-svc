import { TransactionsRepository } from "../../../../interface_adapters/repositories/transactions/transactions_repo";
import { ITransactions } from "../../../enterprise_rules/entities/transactions/transactions_dom";

interface IBuildList {
    transactionsRepo: TransactionsRepository
}

function buildTransactionsList({ transactionsRepo }: IBuildList) {

    return async function execute(filter: any, limit: number, offset: number, sort?: any): Promise<ITransactions[]> {
        const opts = {
            filter,
            limit,
            offset,
            sort: [
                [ ['created_at', 'DESC'] ],
            ],
        };
        const inspectionFieldsList: ITransactions[] = await transactionsRepo.getAll(opts);
        return inspectionFieldsList;
    }
}

function buildCountList({ transactionsRepo }: IBuildList) {

    return async function execute(filter: any): Promise<number> {
        const count: number = await transactionsRepo.count(filter);
        return count;
    }
}

const service = {
    buildTransactionsList,
    buildCountList,
}
export default service;
export {
    buildTransactionsList,
    buildCountList,
}
