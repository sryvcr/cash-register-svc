import { buildMoneyInventory } from "./money_inventory_dom";
import { coinValidator } from "../../validators/coin_validator";
import { numberValidator } from "../../validators/number_validator";

const makeMoneyInventory = buildMoneyInventory({
    coinValidator,
    numberValidator,
});

const service = {
    makeMoneyInventory,
}
export default service;
export {
    makeMoneyInventory,
}
