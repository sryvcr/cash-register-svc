import { Transaction, Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { clients } from "../../client";
import { StorageError } from '../../../../../domain/enterprise_rules/dtos/errors/storage_error';
import { IAdmin, ITransactional, ICheckOptions } from '../../../../../domain/enterprise_rules/interfaces/ioperations';
import { IOpts } from '../../../../../domain/enterprise_rules/interfaces/iopts';
import { IFilterWrap } from '../../../../../domain/enterprise_rules/interfaces/ifilterwrapper';
import { IWrapper } from '../../../../../domain/enterprise_rules/interfaces/iwrapper';
import { TransactionsDal } from '../../models/transactions/transactions_dal';
import { TransactionsDom } from '../../../../../domain/enterprise_rules/entities/transactions/transactions_dom';
import { fromCamelToSnake } from '../../../../helpers/from_camel_to_snake';

const PSQL_CLIENT = process.env.PSQL_CLIENT || "psql_client";


export class TransactionsPsqlRepository 
implements
    IAdmin<TransactionsDom>,
    IFilterWrap,
    IWrapper<TransactionsDal, TransactionsDom>,
    ITransactional,
    ICheckOptions
{

    database: Sequelize;

    constructor() {
        this.database = clients.get(PSQL_CLIENT);
        this.database.addModels([TransactionsDal]);
    }

    async getAll(opts: IOpts, options?: any): Promise<TransactionsDom[]> {
        try {
            options = this.checkOptions(options);
            const resDal: any[] = await TransactionsDal.findAll({
                where: this.filterApiToDal(opts.filter),
                limit: opts.limit,
                offset: opts.offset,
                order: opts.sort,
                attributes: opts.attributes,
                transaction: options.transaction,
            });
            const resDom: TransactionsDom[] = resDal.map(res => this.fromDalToDom(res));
            return resDom;
        } catch (error) {
            throw new StorageError(error.message);
        }
    }

    async getOne(searchCriter: any, options?: any): Promise<TransactionsDom | null> {
        try {
            options = this.checkOptions(options);
            const resDal = await TransactionsDal.findOne({
                where: searchCriter,
                transaction: options.transaction,
            });
            if (!resDal) return null;
            const resDom: TransactionsDom = this.fromDalToDom(resDal);
            return resDom;
        } catch (error) {
            throw new StorageError(error.message);
        }
    }

    async getOneById(id: number, options?: any): Promise<TransactionsDom | null> {
        try {
            options = this.checkOptions(options);
            const resultDal = await TransactionsDal.findByPk(
                id,
                {
                    transaction: options.transaction
                }
            );
            if (!resultDal) return null;
            const resultDom: TransactionsDom = this.fromDalToDom(resultDal);
            return resultDom;
        } catch (error) {
            throw new StorageError(error.message);
        }
    }

    async createOne(item: TransactionsDom, options?: any): Promise<TransactionsDom> {
        try {
            options = this.checkOptions(options);
            const dalToDB = this.fromDomToDal(item);
            const resDal: TransactionsDal = await dalToDB.save({ 
                transaction: options.transaction,
            });
            const resDom: TransactionsDom = this.fromDalToDom(resDal);
            return resDom;
        } catch (error) {
            throw new StorageError(error.message);
        }
    }

    async updateOne(id: number, item: TransactionsDom, options?: any): Promise<TransactionsDom | null> {
        try {
            options = this.checkOptions(options);
            const toUpdate = await TransactionsDal.findByPk(id);
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

    async deleteOne(deleteCriter: any, options?: any): Promise<boolean> {
        try {
            options = this.checkOptions(options);
            const toDelete = await TransactionsDal.findOne({
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
            const count: number = await TransactionsDal.count({
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

    fromDomToDal(item: TransactionsDom): TransactionsDal {
        const itemDal: any = fromCamelToSnake(item);
        const resDal: TransactionsDal = new TransactionsDal(itemDal);
        return resDal;
    }

    fromDalToDom(item: TransactionsDal): TransactionsDom {
        const resDom: TransactionsDom = new TransactionsDom({
            id: item.id,
            amount: parseInt(`${item.amount}`),
            type: item.type
        });
        resDom.createdAt = item.createdAt;
        resDom.coins = item.coins;
        return resDom;
    }

    filterApiToDal(filter: any): any {
        const mapFilter: any = {};
        for (const key in filter) {
            switch (key) {
                case "type":
                case "amount":
                    mapFilter[key] = {
                        [Op.eq]: filter[key]
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
