import { buildMoneyInventory } from "./transactions_dom";
import { uuidGen, uuidValidator } from "../../../../infreastructure/external_interfaces/uuid_factory";
import { iso8601DateValidator } from "../../validators/date_validator";
import { transactionTypesValidator } from "../../validators/transaction_types_validator";
import { numberValidator } from "../../validators/number_validator";
import { datetime as dateHandler } from "../../../../infreastructure/external_interfaces/datetime";

const makeTransaction = buildMoneyInventory({
    uuidGen,
    uuidValidator,
    transactionTypesValidator,
    numberValidator,
    iso8601DateValidator,
    dateHandler,
});

const service = {
    makeTransaction,
}
export default service;
export {
    makeTransaction,
}
