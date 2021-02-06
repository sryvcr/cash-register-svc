import { coinValidator } from "../../../enterprise_rules/validators/coin_validator";
import { makeMoneyInventory } from "../../../enterprise_rules/entities/money_inventory/index";


export function buildDepositMoney({
    moneyInventoryRepo,
    Logger,
}: any) {
    const logger = Logger(__filename);

    async function execute(money: any): Promise<any[]> {
        let t = await moneyInventoryRepo.getTransaction({
            autocommit: false,
        });
        try {
            const result: any = {};
            for (let coin in money) {
                const coinInt = parseInt(coin);
                if (coinValidator(coinInt)) {
                    const quantity = money[coin];
                    logger.debug(`coin: ${coin}: ${quantity}`);
                    const totalAmount = coinInt * parseInt(quantity);
                    logger.debug(`total: ${totalAmount}`);
                    const moneyInventory = await moneyInventoryRepo.getOne({ coin });
                    logger.debug(`moneyInventory: ${JSON.stringify(moneyInventory)}`);
                    moneyInventory.quantity += quantity;
                    moneyInventory.total += totalAmount;
                    const entity = makeMoneyInventory(moneyInventory);
                    const moneyInventoryUpdated = await moneyInventoryRepo.updateOne(
                        moneyInventory.id,
                        entity,
                        { transaction: t }
                    );
                    logger.debug(`moneyInventoryUpdated: ${JSON.stringify(moneyInventoryUpdated)}`);
                    result[coin] = 'ok';
                } else {
                    logger.info(`coin: ${coinInt} not valid`);
                    result[coin] = 'not valid';
                }
            }
            t.commit();
            return result;
        } catch (error) {
            await t.rollback();
            throw error
        }
    }

    return execute;
}