import { makeTransaction } from "../../../enterprise_rules/entities/transactions";
import { CoinEnum } from "../../../enterprise_rules/validators/coin_validator";
import { TransactionsEnum } from "../../../enterprise_rules/dtos/enums/transactions_enum";
import { IMoneyInventory } from "../../../enterprise_rules/entities/money_inventory/money_inventory_dom";
import { ITransactions } from "../../../enterprise_rules/entities/transactions/transactions_dom";
import { MoneyInventoryRepository } from "../../../../interface_adapters/repositories/money_inventory/money_inventory_repo";
import { TransactionsRepository } from "../../../../interface_adapters/repositories/transactions/transactions_repo";
import { BadRequestError } from "../../../enterprise_rules/dtos/errors/bad_request_error";

interface IBuildVacateMoney {
    moneyInventoryRepo: MoneyInventoryRepository;
    transactionsRepo: TransactionsRepository;
    Logger: any;
}

export function buildVacateMoney({
    moneyInventoryRepo,
    transactionsRepo,
    Logger,
}: IBuildVacateMoney) {
    const logger = Logger(__filename);

    async function execute(): Promise<boolean> {
        let t = await moneyInventoryRepo.getTransaction({
            autocommit: false,
        });
        const totalAmount = await getCashRegisterTotalAmount(t);
        if (totalAmount) {
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
                await createTransaction(totalAmount, t)
                t.commit();
                return result;
            } catch (error) {
                await t.rollback();
                throw error
            }
        } else throw new BadRequestError("Cash register is empty");
    }

    async function getCashRegisterTotalAmount(t: any): Promise<number> {
        const filter: any = {};
        const opts = {
            filter
        };
        const moneyInventoryList: IMoneyInventory[] = await moneyInventoryRepo.getAll(
            opts, { transaction: t }
        );
        const totalMoney: number = moneyInventoryList.reduce(
            (a, b) => a + b.total, 0
        );
        return totalMoney;
    }

    async function createTransaction(amount: number, t: any): Promise<void> {
        try {
            const transaction = {
                id: undefined,
                amount: amount,
                type: TransactionsEnum.VACATE
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
