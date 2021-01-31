import { Request, Response, NextFunction } from "express";
import logger from "../../external_interfaces/logger";
import { ErrorBase } from "../../../domain/enterprise_rules/bases/error_base";
import { ApiError } from "../../../domain/enterprise_rules/dtos/errors/api_error";

const Logger = logger(__filename);


export default function (err: any, req: Request, res: Response, next: NextFunction) {
    if (!err) {
        next();
        return;
    }
    /** logging error */
    Logger.error(JSON.stringify(err));
    if (err instanceof ErrorBase) {
        res.status(err.status || 500)
            .json(new ApiError(err.code, err.error, err.metadata));
    } else if (err instanceof Error) {
        res.status(500)
            .json(new ApiError(500, err.message));
    } else {
        /** unknown error*/
        res.status(500)
            .json(new ApiError(500, 'we are diying 🧟🧟🧟'));
    }
}
