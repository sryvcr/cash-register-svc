import { HTTPCodesEnum } from "../../../domain/enterprise_rules/dtos/enums/errors_enums";

export class MainController {

    get(req: any, res: any, next: any) {
        try {
            res.status(HTTPCodesEnum.SUCCESSFUL);
            res.send({ message: `Cash Register Service OK 👽` });
        } catch (error) {
            next(error);
        }
    }

}
