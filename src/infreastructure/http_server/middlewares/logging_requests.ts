import { Request, Response, NextFunction } from "express";
import Logger from "../../external_interfaces/logger";

export function loggingRequests() {

    const logger = Logger(__filename);

    function middleware(req: Request, res: Response, next: NextFunction) {
        if (Object.keys(req.query).length > 0)
            logger.info(`query: ${JSON.stringify(req.query)}`);
        if (Object.keys(req.body).length > 0)
            logger.info(`body: ${JSON.stringify(req.body)}`);
        next();
    }

    return middleware;

}
