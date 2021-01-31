require('dotenv').config();
import Logger from "./infreastructure/external_interfaces/logger";

const logger = Logger(__filename);

async function main() {
    try {
        await startWebApp();
    } catch (error) {
        logger.error(`main error: ${JSON.stringify(error)}`);
        logger.error(error);
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
