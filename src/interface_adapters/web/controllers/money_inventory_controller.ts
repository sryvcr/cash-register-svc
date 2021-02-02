import { ControllerBase } from "./bases/controller_base";
import moneyInventorySvc from "../../../domain/app_rules/money_inventory/index";
import { HTTPCodesEnum } from "../../../domain/enterprise_rules/dtos/enums/errors_enums";
import { ApiResponse } from "../../../domain/enterprise_rules/dtos/responses/api_response";


export class MoneyTransacitonController extends ControllerBase {

    async get(req: any, res: any, next: any): Promise<void> {
        throw new Error("Method not implemented.");
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
