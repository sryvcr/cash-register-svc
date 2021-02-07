import { Transaction, Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { clients } from "../../client";
import { StorageError } from '../../../../../domain/enterprise_rules/dtos/errors/storage_error';
import { IAdmin, ITransactional, ICheckOptions } from '../../../../../domain/enterprise_rules/interfaces/ioperations';
import { IOpts } from '../../../../../domain/enterprise_rules/interfaces/iopts';
import { IFilterWrap } from '../../../../../domain/enterprise_rules/interfaces/ifilterwrapper';
import { IWrapper } from '../../../../../domain/enterprise_rules/interfaces/iwrapper';
import { MoneyInventoryDal } from '../../models/money_inventory/money_inventory_dal';
import { MoneyInventoryDom } from '../../../../../domain/enterprise_rules/entities/money_inventory/money_inventory_dom';
import { fromCamelToSnake } from '../../../../helpers/from_camel_to_snake';

const PSQL_CLIENT = process.env.PSQL_CLIENT || "psql_client";


export class MoneyInventoryPsqlRepository 
implements
    IAdmin<MoneyInventoryDom>,
    IFilterWrap,
    IWrapper<MoneyInventoryDal, MoneyInventoryDom>,
    ITransactional,
    ICheckOptions
{

    database: Sequelize;

    constructor() {
        this.database = clients.get(PSQL_CLIENT);
        this.database.addModels([MoneyInventoryDal]);
    }

    async getAll(opts: IOpts, options?: any): Promise<MoneyInventoryDom[]> {
        try {
            options = this.checkOptions(options);
            const resDal: any[] = await MoneyInventoryDal.findAll({
                where: this.filterApiToDal(opts.filter),
                limit: opts.limit,
                offset: opts.offset,
                order: opts.sort,
                attributes: opts.attributes,
                transaction: options.transaction,
            });
            const resDom: MoneyInventoryDom[] = resDal.map(res => this.fromDalToDom(res));
            return resDom;
        } catch (error) {
            throw new StorageError(error.message);
        }
    }

    async getOne(searchCriter: any, options?: any): Promise<MoneyInventoryDom | null> {
        try {
            options = this.checkOptions(options);
            const resDal = await MoneyInventoryDal.findOne({
                where: searchCriter,
                transaction: options.transaction,
            });
            if (!resDal) return null;
            const resDom: MoneyInventoryDom = this.fromDalToDom(resDal);
            return resDom;
        } catch (error) {
            throw new StorageError(error.message);
        }
    }

    async getOneById(id: number, options?: any): Promise<MoneyInventoryDom | null> {
        try {
            options = this.checkOptions(options);
            const resultDal = await MoneyInventoryDal.findByPk(
                id,
                {
                    transaction: options.transaction
                }
            );
            if (!resultDal) return null;
            const resultDom: MoneyInventoryDom = this.fromDalToDom(resultDal);
            return resultDom;
        } catch (error) {
            throw new StorageError(error.message);
        }
    }

    async createOne(item: MoneyInventoryDom, options?: any): Promise<MoneyInventoryDom> {
        try {
            options = this.checkOptions(options);
            const dalToDB = this.fromDomToDal(item);
            const resDal: MoneyInventoryDal = await dalToDB.save({ 
                transaction: options.transaction,
            });
            const resDom: MoneyInventoryDom = this.fromDalToDom(resDal);
            return resDom;
        } catch (error) {
            throw new StorageError(error.message);
        }
    }

    async updateOne(id: number, item: MoneyInventoryDom, options?: any): Promise<MoneyInventoryDom | null> {
        try {
            options = this.checkOptions(options);
            const toUpdate = await MoneyInventoryDal.findByPk(id);
            if (!toUpdate) return null;
            const resDAL = await toUpdate.update(
                fromCamelToSnake(item),
                {
                    transaction: options.transaction,
                }
            );
            const resDOM = this.fromDalToDom(resDAL);
            return resDOM;
        } catch (error) {
            throw new StorageError(error.message);
        }
    }

    async updateMany(searchCriteria: any, updateFileds: any, options?: any): Promise<boolean> {
        try {
            options = this.checkOptions(options);
            await MoneyInventoryDal.update(
                fromCamelToSnake(updateFileds),
                {
                    where: fromCamelToSnake(searchCriteria),
                    transaction: options.transaction
                },
            );
            return true;
        } catch (error) {
            throw new StorageError(error.message);
        }
    }

    async deleteOne(deleteCriter: any, options?: any): Promise<boolean> {
        try {
            options = this.checkOptions(options);
            const toDelete = await MoneyInventoryDal.findOne({
                where: deleteCriter,
                transaction: options.transaction,
            });
            if (!toDelete) return false;
            await toDelete.destroy({ 
                transaction: options.transaction 
            });
            return true;
        } catch (error) {
            throw new StorageError(error.message);
        }
    }

    async count(filter: any): Promise<number> {
        try {
            const count: number = await MoneyInventoryDal.count({
                where: this.filterApiToDal(filter),
            });
            return count;
        } catch (error) {
            throw new StorageError(error.message);
        }
    }
    
    async getTransaction(options?: any): Promise<Transaction> {
        try {
            const transaction: Transaction = await this.database.transaction({
                autocommit: options.autocommit,
                transaction: options.transaction,
            });
            return transaction;
        } catch (error) {
            throw new StorageError(error.message);
        }
    }

    fromDomToDal(item: MoneyInventoryDom): MoneyInventoryDal {
        const itemDal: any = fromCamelToSnake(item);
        const resDal: MoneyInventoryDal = new MoneyInventoryDal(itemDal);
        return resDal;
    }

    fromDalToDom(item: MoneyInventoryDal): MoneyInventoryDom {
        const resDom: MoneyInventoryDom = new MoneyInventoryDom({
            id: parseInt(`${item.id}`),
            coin: parseInt(`${item.coin}`),
            quantity: parseInt(`${item.quantity}`),
            total: parseInt(`${item.total}`)
        });
        return resDom;
    }

    filterApiToDal(filter: any): any {
        const mapFilter: any = {};
        for (const key in filter) {
            switch (key) {
                case "coin":
                    mapFilter[key] = {
                        [Op.eq]: filter[key]
                    };
                    break;
                case "coin_lte":
                    mapFilter['coin'] = {
                        [Op.lte]: filter[key]
                    };
                    break;
                case "total_gt":
                    mapFilter['total'] = {
                        [Op.gt]: filter[key]
                    };
                    break;
                default:
                    break;
            }
        }
        return mapFilter;
    }

    checkOptions(options?: any) {
        if (!options) {
            return {
                transaction: undefined
            };
        }
        else {
            return options;
        }
    }
}
