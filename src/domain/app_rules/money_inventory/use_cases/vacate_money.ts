import { CoinEnum } from "../../../enterprise_rules/validators/coin_validator";


export function buildVacateMoney({
    moneyInventoryRepo,
    Logger,
}: any) {
    const logger = Logger(__filename);

    async function execute(): Promise<boolean> {
        let t = await moneyInventoryRepo.getTransaction({
            autocommit: false,
        });
        try {
            const searchCriteria = {
                coin: [
                    `${CoinEnum.FIFTY}`,
                    `${CoinEnum.ONEHUNDRED}`,
                    `${CoinEnum.TWOHUNDRED}`,
                    `${CoinEnum.FIVEHUNDRED}`,
                    `${CoinEnum.ONETHOUSAND}`,
                    `${CoinEnum.FIVETHOUSAND}`,
                    `${CoinEnum.TENTHOUSAND}`,
                    `${CoinEnum.TWENTYTHOUSAND}`,
                    `${CoinEnum.FIFTYTHOUSAND}`,
                    `${CoinEnum.HUNDREDTHOUSAND}`
                ]
            }
            const updateFields = {
                total: 0,
                quantity: 0
            }
            const result = await moneyInventoryRepo.updateMany(
                searchCriteria,
                updateFields,
                { transaction: t }
            );
            logger.debug(`result: ${result}`);
            t.commit();
            return result;
        } catch (error) {
            await t.rollback();
            throw error
        }
    }

    return execute;
}
