export class MoneyInventoryApi {

    id: number;
    coin: number;
    quantity: number;
    total: number;

    constructor(item: any) {
        this.id = item.id;
        this.coin = item.coin;
        this.quantity = item.quantity;
        this.total = item.total;
    }
}
