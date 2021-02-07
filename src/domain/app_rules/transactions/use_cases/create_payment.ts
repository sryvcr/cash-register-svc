import { TransactionsRepository } from "../../../../interface_adapters/repositories/transactions/transactions_repo";
import { MoneyInventoryRepository } from "interface_adapters/repositories/money_inventory/money_inventory_repo";
import { coinValidator } from "../../../enterprise_rules/validators/coin_validator";
import { BadRequestError } from "../../../enterprise_rules/dtos/errors/bad_request_error";
import { TransactionsEnum } from "../../../enterprise_rules/dtos/enums/transactions_enum";
import { ITransactions } from "../../../enterprise_rules/entities/transactions/transactions_dom";
import { IMoneyInventory } from "../../..//enterprise_rules/entities/money_inventory/money_inventory_dom";
import { makeTransaction } from "../../../enterprise_rules/entities/transactions";
import { makeMoneyInventory } from "../../../enterprise_rules/entities/money_inventory";

interface IBuildCreatePayment {
    transactionsRepo: TransactionsRepository;
    moneyInventoryRepo: MoneyInventoryRepository;
    Logger: any;
}

export function buildCreatePayment({
    transactionsRepo,
    moneyInventoryRepo,
    Logger
}: IBuildCreatePayment) {

    const logger = Logger(__filename);

    async function execute(payment: any): Promise<any> {
        let t = await transactionsRepo.getTransaction({
            autocommit: false,
        });
        try {
            logger.debug(`payment: ${JSON.stringify(payment)}`);
            logger.debug(`payment amount: ${payment.amount}`);
            logger.debug(`payment coins: ${JSON.stringify(payment.coins)}`);
            validatePaymentCoins(payment.coins);
            const totalDeposited = await depositMoney(payment.coins, t);
            await createTransaction(
                totalDeposited, payment.coins, TransactionsEnum.PAYMENT, t
            );
            const changeMoney = await getChangeMoney(totalDeposited, payment.amount, t);
            await createTransaction(
                changeMoney[0], changeMoney[1], TransactionsEnum.RETIREMENT, t
            );
            await t.commit();
            return { 
                change_money: {
                    total: changeMoney[0],
                    coins: changeMoney[1]
                }
            };
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    function validatePaymentCoins(paymentCoins: any): void {
        Object.keys(paymentCoins).map(function(coin: any) {
            const coinInt = parseInt(coin);
            if (!coinValidator(coinInt))
                throw new BadRequestError(`Invalid payment, coin ${coin} not supported`);
        });
        return;
    }

    async function depositMoney(paymentCoins: any, t: any): Promise<number> {
        let totalDeposited = 0;
        for (let coin in paymentCoins) {
            const coinInt = parseInt(coin);
            if (coinValidator(coinInt)) {
                const quantity = paymentCoins[coin];
                logger.debug(`coin: ${coin}: ${quantity}`);
                const totalAmount = coinInt * parseInt(quantity);
                logger.debug(`total: ${totalAmount}`);
                const moneyInventory: any = await moneyInventoryRepo.getOne({ coin });
                logger.debug(`money inventory: ${JSON.stringify(moneyInventory)}`);
                moneyInventory.quantity += quantity;
                moneyInventory.total += totalAmount;
                const entity = makeMoneyInventory(moneyInventory);
                const moneyInventoryUpdated: any = await moneyInventoryRepo.updateOne(
                    moneyInventory.id,
                    entity,
                    { transaction: t }
                );
                totalDeposited += totalAmount;
                logger.debug(`money inventory updated: ${JSON.stringify(moneyInventoryUpdated)}`);
            }
        }
        return totalDeposited;
    }

    async function createTransaction(
        amount: number, coins: any, transactionType: TransactionsEnum, t: any
    ): Promise<void> {
        try {
            if (amount) {
                const transaction = {
                    id: undefined,
                    amount: amount,
                    type: transactionType,
                    coins: coins,
                }
                const entity: ITransactions = makeTransaction(transaction);
                console.log(entity);
                await transactionsRepo.createOne(entity, { transaction: t });
                logger.debug(`Transaction: ${transactionType}, created`);
            }
            return;
        } catch (error) {
            throw error;
        }
    }
    
    async function getMoneyInventory(coin_lte: number): Promise<IMoneyInventory[]> {
        const opts = {
            filter: {
                coin_lte: coin_lte,
                total_gt: 0
            },
            sort: [ ['id', 'DESC'] ],
        };
        const moneyInventoryList: IMoneyInventory[] = await moneyInventoryRepo.getAll(opts);
        return moneyInventoryList;
    }

    async function getChangeMoney(
        totalDeposited: number, paymentAmount: number, t: any
    ): Promise<[number, any]> {
        let coinChage: any = {}
        const totalChange: number = totalDeposited - paymentAmount;
        console.log(totalChange);
        if (totalChange < 0)
            throw new BadRequestError(`total coins payment deposited is less than amount payment`);
        else if (totalChange > 0) {
            const moneyInventory: IMoneyInventory[] = await getMoneyInventory(totalChange);
            logger.debug(`money inventory to change money: ${JSON.stringify(moneyInventory)}`);
            let change = totalChange;
            for (let i = 0; i < moneyInventory.length; i++) {
                const item = moneyInventory[i];
                if (item.total != 0 && item.total > change && item.coin <= change) {
                    const changeQuantityNeeded: number = Math.floor(change / item.coin);
                    if (!change.hasOwnProperty(item.coin)) coinChage[item.coin] = changeQuantityNeeded;
                    else coinChage[item.coin] += item.quantity;
                    change -= item.coin * changeQuantityNeeded;
                    item.quantity -= changeQuantityNeeded;
                    item.total -= item.coin * changeQuantityNeeded;
                }
                else if (item.total != 0 && item.total <= change) {
                    if (!change.hasOwnProperty(item.coin)) coinChage[item.coin] = item.quantity;
                    else coinChage[item.coin] += item.quantity;
                    change -= item.total;
                    item.quantity = 0;
                    item.total = 0;
                }
                await moneyInventoryRepo.updateOne(item.id, item, { transaction: t });
                if (change == 0) break;
            }
            if (change > 0) throw new BadRequestError(
                `Cash register not cointains coins to change, plase validate payment coins`
            );
        }
        return [totalChange, coinChage];
    }

    return execute;
}
