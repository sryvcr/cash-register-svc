import { coinValidator } from "../../../enterprise_rules/validators/coin_validator";
import { TransactionsEnum } from "../../../enterprise_rules/dtos/enums/transactions_enum";
import { IMoneyInventory } from "../../../enterprise_rules/entities/money_inventory/money_inventory_dom";
import { ITransactions } from "../../../enterprise_rules/entities/transactions/transactions_dom";
import { makeMoneyInventory } from "../../../enterprise_rules/entities/money_inventory/index";
import { makeTransaction } from "../../../enterprise_rules/entities/transactions/index";


export function buildDepositMoney({
    moneyInventoryRepo,
    transactionsRepo,
    Logger,
}: any) {
    const logger = Logger(__filename);

    async function execute(money: any): Promise<any> {
        let t = await moneyInventoryRepo.getTransaction({
            autocommit: false,
        });
        try {
            const result: any = {};
            const validCoins: any = {};
            let transactionAmount = 0;
            for (let coin in money) {
                const coinInt = parseInt(coin);
                if (coinValidator(coinInt)) {
                    const quantity = money[coin];
                    logger.debug(`coin: ${coin}: ${quantity}`);
                    const totalAmount = coinInt * parseInt(quantity);
                    logger.debug(`total: ${totalAmount}`);
                    const moneyInventory: IMoneyInventory = await moneyInventoryRepo.getOne({ coin });
                    logger.debug(`moneyInventory: ${JSON.stringify(moneyInventory)}`);
                    moneyInventory.quantity += quantity;
                    moneyInventory.total += totalAmount;
                    const entity = makeMoneyInventory(moneyInventory);
                    const moneyInventoryUpdated: IMoneyInventory = await moneyInventoryRepo.updateOne(
                        moneyInventory.id,
                        entity,
                        { transaction: t }
                    );
                    logger.debug(`moneyInventoryUpdated: ${JSON.stringify(moneyInventoryUpdated)}`);
                    result[coin] = 'ok';
                    transactionAmount += totalAmount;
                    validCoins[coin] = quantity;
                } else {
                    logger.info(`coin: ${coinInt} not valid`);
                    result[coin] = 'not valid';
                }
            }
            await createTransaction(transactionAmount, validCoins, t);
            t.commit();
            return result;
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    async function createTransaction(amount: number, coins: any, t: any): Promise<void> {
        try {
            const transaction = {
                id: undefined,
                amount: amount,
                type: TransactionsEnum.DEPOSIT,
                coins: coins,
            }
            const entity: ITransactions = makeTransaction(transaction);
            await transactionsRepo.createOne(entity, { transaction: t });
            return;
        } catch (error) {
            throw error;
        }
    }

    return execute;
}