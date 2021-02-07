import { ITransactions } from "../../entities/transactions/transactions_dom";

export class TransactionsApi {

    id: string | undefined;
    amount: number;
    type: string;
    created_at?: Date;
    coins?: any;

    constructor(item: ITransactions) {
        this.id = item.id;
        this.amount = item.amount;
        this.type = item.type;
    }
}
