require('dotenv').config();
import Logger from "./infreastructure/external_interfaces/logger";
import { createConnection } from "./infreastructure/storage/postgres/client";

const logger = Logger(__filename);

const PSQL_CLIENT = process.env.PSQL_CLIENT || "psql_client"
const PSQL_HOST = process.env.PSQL_HOST || "localhost"
const PSQL_PORT = process.env.PSQL_PORT || "5432"
const PSQL_USERNAME = process.env.PSQL_USERNAME || "postgres"
const PSQL_PASSWORD = process.env.PSQL_PASSWORD || "postgres"
const PSQL_DATABASE = process.env.PSQL_DATABASE || "database"


async function main() {
    try {
        await createDBConnection();
        await startWebApp();
    } catch (error) {
        logger.error(`main error: ${JSON.stringify(error)}`);
        logger.error(error);
    }
}

async function createDBConnection() {
    try {
        await createConnection(
            {
                key: PSQL_CLIENT,
                host: PSQL_HOST,
                port: PSQL_PORT,
                username: PSQL_USERNAME,
                password: PSQL_PASSWORD,
                database: PSQL_DATABASE,
            }
        )
    } catch (err) {
        throw err;
    }
}

async function startWebApp() {
    try {
        const { Server } = await import('./infreastructure/http_server/server');
        const server = new Server();
        await server.start();
    } catch (err) {
        throw err;
    }
}

main();
