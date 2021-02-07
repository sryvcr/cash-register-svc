import { ControllerBase } from "./bases/controller_base";
import moneyInventorySvc from "../../../domain/app_rules/money_inventory/index";
import { HTTPCodesEnum } from "../../../domain/enterprise_rules/dtos/enums/errors_enums";
import { ApiResponse } from "../../../domain/enterprise_rules/dtos/responses/api_response";
import { ListResponse } from '../../../domain/enterprise_rules/dtos/responses/list_response';
import { moneyInventoryMapper } from './mappers/money_inventory_mapper';


export class MoneyInventoryController extends ControllerBase {

    async get(req: any, res: any, next: any): Promise<void> {
        try {
            const result: [any[], number] = await moneyInventorySvc.getStatus({});
            const resultApi: any[] = result[0].map(res => moneyInventoryMapper.fromDomToApi(res));
            res.status(HTTPCodesEnum.SUCCESSFUL);
            res.json(new ApiResponse(
                HTTPCodesEnum.SUCCESSFUL,
                new ListResponse(resultApi, result[1])
            ));
        } catch (error) {
            next(error);
        }
    }

    async getById(req: any, res: any, next: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async post(req: any, res: any, next: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async put(req: any, res: any, next: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async deposit(req: any, res: any, next: any): Promise<void> {
        try {
            const result = await moneyInventorySvc.depositMoney(req.body);
            res.status(HTTPCodesEnum.SUCCESSFUL);
            res.json(new ApiResponse(HTTPCodesEnum.SUCCESSFUL, result));
        } catch (error) {
            next(error);
        }
    }

    async vacate(req: any, res: any, next: any): Promise<void> {
        try {
            await moneyInventorySvc.vacateMoney();
            res.sendStatus(HTTPCodesEnum.NOT_CONTENT);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: any, res: any, next: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
