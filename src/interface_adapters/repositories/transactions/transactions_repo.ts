import { TransactionsDom } from '../../../domain/enterprise_rules/entities/transactions/transactions_dom';
import { IAdmin, ITransactional } from '../../../domain/enterprise_rules/interfaces/ioperations';


interface ITransactionsRepository<T> {
    getAll(opts: any, options?: any): Promise<T[]>;
    getOne(searchCriteria: any, options?: any): Promise<T | null>;
    getOneById(id: number, options?: any): Promise<T | null>;
    createOne(item: T, options?: any): Promise<T>;
    updateOne(id: number, item: T, options?: any): Promise<T | null>;
    deleteOne(deleteCriteria: any, options?: any): Promise<boolean>;
    count(filter: any, options?: any): Promise<number>;
    getTransaction(options?: any): Promise<any>;
}


export class TransactionsRepository
implements
    IAdmin<TransactionsDom>,
    ITransactional
{

    repository: ITransactionsRepository<TransactionsDom>;

    constructor(repository: ITransactionsRepository<TransactionsDom>) {
        this.repository = repository;
    }

    async getAll(opts: any, options?: any): Promise<TransactionsDom[]> {
        return await this.repository.getAll(opts, options);
    }

    async getOne(searchCriter: any, options?: any): Promise<TransactionsDom | null> {
        return await this.repository.getOne(searchCriter, options);
    }

    async getOneById(id: number, options?: any): Promise<TransactionsDom | null> {
        return await this.repository.getOneById(id, options);
    }

    async createOne(item: TransactionsDom, options?: any): Promise<TransactionsDom> {
        return await this.repository.createOne(item, options);
    }

    async updateOne(id: number, item: TransactionsDom, options?: any): Promise<TransactionsDom | null> {
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
