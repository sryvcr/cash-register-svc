import { MoneyInventoryApi } from "../../../../domain/enterprise_rules/dtos/api_models/money_inventory_api";
import { MoneyInventoryDom } from "../../../../domain/enterprise_rules/entities/money_inventory/money_inventory_dom";
import { IMapperAPI } from "../bases/imapperapi_base";
import { fromSnakeToCamel } from "../../../../infreastructure/helpers/from_snake_to_camel";
import { fromCamelToSnake } from "../../../../infreastructure/helpers/from_camel_to_snake";

class MoneyInventoryMapper implements IMapperAPI<MoneyInventoryDom, MoneyInventoryApi> {

    fromApiToDom(item: MoneyInventoryApi, opts?: any): MoneyInventoryDom {
        const resDom = new MoneyInventoryDom(fromSnakeToCamel(item));
        return resDom;
    }

    fromDomToApi(item: MoneyInventoryDom, opts?: any) {
        const resApi: MoneyInventoryApi = new MoneyInventoryApi(fromCamelToSnake(item));
        return resApi;
    }
}

const moneyInventoryMapper = new MoneyInventoryMapper();

export { moneyInventoryMapper };
