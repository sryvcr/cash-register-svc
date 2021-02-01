import { BadRequestError } from "../../dtos/errors/bad_request_error";


export interface IMoneyInventory {
    id: number;
    coin: number;
    total: number;
}

export class MoneyInventoryDom implements IMoneyInventory {

    id: number;
    coin: number;
    total: number;

    constructor(item: IMoneyInventory) {
        this.id = item.id;
        this.coin = item.coin;
        this.total = item.total;
    }
}

export function buildMoneyInventory({
    coinValidator,
    numberValidator
}: any) {

    function execute(item: IMoneyInventory): IMoneyInventory {
        const entity = new MoneyInventoryDom(validateData(item));
        return Object.freeze(entity);
    }

    function validateData(item: IMoneyInventory): IMoneyInventory {
        validateNum(item.id, "id");
        validateCoin(item.coin, "coin");
        validateNum(item.total, "total");
        return item;
    }

    function validateCoin(data: any, resource: string): void {
        if(!coinValidator(data)) throw new BadRequestError(`coin: ${data}, not valid`);
    }
    function validateNum(data: any, resource: string): void {
        if(!numberValidator(data) || !data) throw new BadRequestError(`${resource} not valid`);
    }

    return execute;
}
