import { ControllerBase } from "./bases/controller_base";
import transactionsSvc from "../../../domain/app_rules/transactions/index";
import { HTTPCodesEnum } from "../../../domain/enterprise_rules/dtos/enums/errors_enums";
import { ApiResponse } from "../../../domain/enterprise_rules/dtos/responses/api_response";
import { ListResponse } from '../../../domain/enterprise_rules/dtos/responses/list_response';
import { transactionMapper } from './mappers/transactions_mapper';
import { ITransactions } from "domain/enterprise_rules/entities/transactions/transactions_dom";


export class TransactionsController extends ControllerBase {

    async get(req: any, res: any, next: any): Promise<void> {
        try {
            const { filter, limit, offset } = req.query;
            const result: ITransactions[] = await transactionsSvc.getAll(filter, +limit, +offset);
            const resultApi: any[] = result.map(res => transactionMapper.fromDomToApi(res));
            const count: number = await transactionsSvc.count(filter);
            res.status(HTTPCodesEnum.SUCCESSFUL);
            res.json(new ApiResponse(
                HTTPCodesEnum.SUCCESSFUL,
                new ListResponse(resultApi, count)
            ));
        } catch (error) {
            next(error);
        }
    }

    async getById(req: any, res: any, next: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async getAmountTillDatetime(req: any, res: any, next: any): Promise<void> {
        try {
            const { till_datetime } = req.params;
            const result: number = await transactionsSvc.getAmountTillDatetime(till_datetime);
            res.status(HTTPCodesEnum.SUCCESSFUL);
            res.json(new ApiResponse(
                HTTPCodesEnum.SUCCESSFUL,
                result
            ));
        } catch (error) {
            next(error);
        }
    }

    async post(req: any, res: any, next: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async put(req: any, res: any, next: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async delete(req: any, res: any, next: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
