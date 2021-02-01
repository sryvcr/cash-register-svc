export interface IRead<T> {

    getAll(opts: any, options?: any): Promise<T[]>;
    getOne(searchCriter: any, options?: any): Promise<T | null>;
    getOneById(id: string | number, options?: any): Promise<T | null>;
    countItems(filter: any, options?: any): Promise<number>;

}

export interface IWrite<T> {

    createOne(item: T, options?: any): Promise<T>;
    updateOne(id: string | number, item: T, options?: any): Promise<T | null>;
    deleteOne(deleteCriter: any, options?: any): Promise<boolean>;

}

export interface IAdmin<T> {

    getAll(opts: any, options?: any): Promise<T[]>;
    getOne(searchCriter: any, options?: any): Promise<T | null>;
    getOneById(id: string | number, options?: any): Promise<T | null>;
    createOne(item: T, options?: any): Promise<T>;
    updateOne(id: string | number, item: T, options?: any): Promise<T | null>;
    deleteOne(deleteCriter: any, options?: any): Promise<boolean>;
    count(filter: any, options?: any): Promise<number>;

}

export interface ITransactional {
    getTransaction(options?: any): any;
}

export interface ICheckOptions {
    checkOptions(options?: any): any;
}