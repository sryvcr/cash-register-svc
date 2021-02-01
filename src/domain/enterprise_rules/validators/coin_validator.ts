export enum CoinEnum {
    FIFTY = 50,
    ONEHUNDRED = 100,
    TWOHUNDRED = 200,
    FIVEHUNDRED = 500,
    ONETHOUSAND = 1000,
    FIVETHOUSAND = 5000,
    TENTHOUSAND = 10000,
    TWENTYTHOUSAND = 20000,
    FIFTYTHOUSAND = 50000,
    HUNDREDTHOUSAND = 100000

}

export function coinValidator(coin: number) {
    if ((<any>Object).values(CoinEnum).includes(coin)) return true
    else return false
}
