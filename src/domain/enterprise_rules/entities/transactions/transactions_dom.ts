import { BadRequestError } from "../../dtos/errors/bad_request_error";
import { TransactionsEnum } from "../../dtos/enums/transactions_enum";


export interface ITransactions {
    id: string | undefined;
    amount: number;
    type: string;
    createdAt?: Date;
    coins?: any;
}

export class TransactionsDom implements ITransactions {

    id: string | undefined;
    amount: number;
    type: string;
    createdAt?: Date;
    coins?: any;

    constructor(item: ITransactions) {
        this.id = item.id;
        this.amount = item.amount;
        this.type = item.type;
    }
}

export function buildMoneyInventory({
    uuidGen,
    uuidValidator,
    transactionTypesValidator,
    numberValidator,
    iso8601DateValidator,
    dateHandler
}: any) {

    function execute(item: ITransactions): ITransactions {
        const entity = new TransactionsDom(validateData(item));
        entity.createdAt = item.createdAt;
        entity.coins = item.coins;
        return Object.freeze(entity);
    }

    function validateData(item: ITransactions): ITransactions {
        if(!item.id) item.id = uuidGen();
        else validateId(item.id, "id");
        validateNum(item.amount, "amount");
        validateTransactionType(item.type, "type");
        if(!item.createdAt) item.createdAt = dateHandler.utc().toISOString();
        else validateIso8601Date(item.createdAt, "created_at");
        return item;
    }

    function validateId(id: any, resource: string): void {
        if (!uuidValidator(id)) throw new BadRequestError(`${resource} not valid`);
    }

    function validateTransactionType(data: any, resource: string): void {
        if(!transactionTypesValidator(data)) throw new BadRequestError(`transaction type: ${data}, not valid`);
    }

    function validateNum(data: any, resource: string): void {
        if(!numberValidator(data) || !data) throw new BadRequestError(`${resource} not valid`);
    }

    function validateIso8601Date(data: any, resource: string): void {
        if(!iso8601DateValidator(data) || !data) throw new BadRequestError(`${resource} not valid`);
    }

    return execute;
}
