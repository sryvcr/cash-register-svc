import { TransactionsApi } from "../../../../domain/enterprise_rules/dtos/api_models/transactions_api";
import { TransactionsDom } from "../../../../domain/enterprise_rules/entities/transactions/transactions_dom";
import { IMapperAPI } from "../bases/imapperapi_base";
import { fromSnakeToCamel } from "../../../../infreastructure/helpers/from_snake_to_camel";
import { fromCamelToSnake } from "../../../../infreastructure/helpers/from_camel_to_snake";

class TransactionsMapper implements IMapperAPI<TransactionsDom, TransactionsApi> {

    fromApiToDom(item: TransactionsApi, opts?: any): TransactionsDom {
        const resDom = new TransactionsDom(fromSnakeToCamel(item));
        resDom.createdAt = item.created_at;
        resDom.coins = item.coins;
        return resDom;
    }

    fromDomToApi(item: TransactionsDom, opts?: any) {
        const resApi: TransactionsApi = new TransactionsApi(fromCamelToSnake(item));
        resApi.created_at = item.createdAt;
        resApi.coins = item.coins;
        return resApi;
    }
}

const transactionMapper = new TransactionsMapper();

export { transactionMapper };
