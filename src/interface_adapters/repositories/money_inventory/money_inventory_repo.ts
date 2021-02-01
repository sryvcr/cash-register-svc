import { MoneyInventoryDom } from '../../../domain/enterprise_rules/entities/money_inventory/money_inventory_dom';
import { IAdmin, ITransactional } from '../../../domain/enterprise_rules/interfaces/ioperations';


interface IMoneyInventoryRepository<T> {
    getAll(opts: any, options?: any): Promise<T[]>;
    getOne(searchCriter: any, options?: any): Promise<T | null>;
    getOneById(id: number, options?: any): Promise<T | null>;
    createOne(item: T, options?: any): Promise<T>;
    updateOne(id: number, item: T, options?: any): Promise<T | null>;
    deleteOne(deleteCriter: any, options?: any): Promise<boolean>;
    count(filter: any, options?: any): Promise<number>;
    getTransaction(options?: any): Promise<any>;
}


export class MoneyInventoryRepository
implements 
    IAdmin<MoneyInventoryDom>,
    ITransactional
{

    repository: IMoneyInventoryRepository<MoneyInventoryDom>;

    constructor(repository: IMoneyInventoryRepository<MoneyInventoryDom>) {
        this.repository = repository;
    }

    async getAll(opts: any, options?: any): Promise<MoneyInventoryDom[]> {
        return await this.repository.getAll(opts, options);
    }

    async getOne(searchCriter: any, options?: any): Promise<MoneyInventoryDom | null> {
        return await this.repository.getOne(searchCriter, options);
    }

    async getOneById(id: number, options?: any): Promise<MoneyInventoryDom | null> {
        return await this.repository.getOneById(id, options);
    }

    async createOne(item: MoneyInventoryDom, options?: any): Promise<MoneyInventoryDom> {
        return await this.repository.createOne(item, options);
    }

    async updateOne(id: number, item: MoneyInventoryDom, options?: any): Promise<MoneyInventoryDom | null> {
        return await this.repository.updateOne(id, item, options);
    }

    async deleteOne(deleteCriter: any, options?: any): Promise<boolean> {
        return await this.repository.deleteOne(deleteCriter, options);
    }
    
    async count(filter: any, options?: any): Promise<number> {
        return await this.repository.count(filter, options);
    }

    async getTransaction(options?: any): Promise<any> {
        return await this.repository.getTransaction(options);
    }
}
