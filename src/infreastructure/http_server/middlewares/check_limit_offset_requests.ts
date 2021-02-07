import { Request, Response, NextFunction, request } from "express";
import Logger from "../../external_interfaces/logger";

export function CheckLimitOffsetRequests() {

    const logger = Logger(__filename);

    function middleware(req: Request, res: Response, next: NextFunction) {
        if ( !req.query.limit || req.query.limit == "" ) req.query.limit = "100";
        if ( !req.query.offset || req.query.offset == "" ) req.query.offset = "0";
        next();
    }

    return middleware;

}
