import express, { json } from "express";
import morgan from "morgan";
import cors from "cors";
import Logger from "../external_interfaces/logger";
import errorHandler from "./middlewares/error_handler";
import { swaggerUi, swaggerDocument } from "../external_interfaces/swagger_ui";
import { loggingRequests } from "./middlewares/logging_requests";
import { CheckLimitOffsetRequests } from "./middlewares/check_limit_offset_requests";
import { routes as appRoutes } from "./routes/index";


const logger = Logger(__filename);

const HTTP_PORT = process.env.HTTP_PORT || 3000;
const OPENAPI_DOCS = process.env.OPENAPI_DOCS || './docs';


export class Server {
    app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.initErrorHandler();
    }

    config() {
        this.app.set("port", HTTP_PORT);
        this.app.use(morgan("common"));
        this.app.use(json());
        this.app.use(cors());
        this.app.use(OPENAPI_DOCS, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }

    routes() {
        this.app.use(loggingRequests());
        this.app.use(CheckLimitOffsetRequests());
        this.app.use(appRoutes);
    }

    initErrorHandler() {
        this.app.use(errorHandler);
    }

    async start() {
        try {
            this.app.listen(this.app.get("port"), () => {
                logger.info(
                    `🆗 Express Application Running on port ${this.app.get("port")}`
                );
            });
        } catch (error) {
            logger.error(`ERROR : ${JSON.stringify(error)}`);
        }
    }
}
