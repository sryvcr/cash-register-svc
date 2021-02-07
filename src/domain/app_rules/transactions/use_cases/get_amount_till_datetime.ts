import { TransactionsInputsEnum, TransactionsOutputsEnum } from "../../../enterprise_rules/dtos/enums/transactions_enum";
import { TransactionsRepository } from "../../../../interface_adapters/repositories/transactions/transactions_repo";
import { ITransactions } from "../../../enterprise_rules/entities/transactions/transactions_dom";

interface IBuildList {
    transactionsRepo: TransactionsRepository;
    Logger: any;
}

export function buildGetAmountTillDatetime({
    transactionsRepo,
    Logger
}: IBuildList) {

    const logger = Logger(__filename);

    return async function execute(datetime: any): Promise<any> {
        logger.debug(`get till: ${datetime}`)
        const filter = {
            till_datetime: datetime
        }
        const transactions: ITransactions[] = await transactionsRepo.getAll({ filter });
        let moneyInputs: number = 0;
        let moneyOutputs: number = 0;
        for (const item in transactions) {
            const transaction = transactions[item];
            logger.debug(`transaction type: ${transaction.type}, amount: ${transaction.amount}`)
            if ((<any>Object).values(TransactionsInputsEnum).includes(transaction.type))
                moneyInputs += transaction.amount;
            else if ((<any>Object).values(TransactionsOutputsEnum).includes(transaction.type))
                moneyOutputs += transaction.amount;
        }
        logger.debug(`money inputs: ${moneyInputs}`);
        logger.debug(`money outputs: ${moneyOutputs}`);
        const totalAmount: number = moneyInputs - moneyOutputs;
        logger.debug(`total amount: ${totalAmount}`);
        return { amount: totalAmount };
    }
}
