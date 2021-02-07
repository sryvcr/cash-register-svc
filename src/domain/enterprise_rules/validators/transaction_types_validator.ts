import { TransactionsEnum } from "../dtos/enums/transactions_enum";

export function transactionTypesValidator(transactionType: string): boolean {
    if ((<any>Object).values(TransactionsEnum).includes(transactionType)) return true
    else return false
}
