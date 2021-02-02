import { IMoneyInventory } from "../../../enterprise_rules/entities/money_inventory/money_inventory_dom";


function buildGetStatus({ moneyInventoryRepo }: any) {
    return async function execute(filter: any, limit?: number, offset?: number, sort?: any): Promise<[IMoneyInventory[], number]> {
        const opts = {
            filter,
            sort: ['coin'],
        };
        const moneyInventoryList: IMoneyInventory[] = await moneyInventoryRepo.getAll(opts);
        const totalMoney: number = moneyInventoryList.reduce(
            (a, b) => a + b.total, 0
        );
        return [moneyInventoryList, totalMoney];
    }
}


const service = {
    buildGetStatus,
}
export default service;
export {
    buildGetStatus,
}
