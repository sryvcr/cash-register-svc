export class MoneyInventoryApi {

    id: string;
    coin: string;
    total: number;

    constructor(item: any) {
        this.id = item.id;
        this.coin = item.coin;
        this.total = item.total;
    }
}
