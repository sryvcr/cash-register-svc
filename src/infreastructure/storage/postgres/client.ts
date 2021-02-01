import { Sequelize } from 'sequelize-typescript';
import Logger from "../../external_interfaces/logger";

const clients = new Map();
const logger = Logger(__filename);


interface connectionProperties {
    key?: string;
    host?: string;
    port?: string;
    database?: string;
    username?: string;
    password?: string;
}

async function createConnection({
    key = "",
    host = "localhost",
    port = "5432",
    database = "",
    username = "",
    password = ""
}: connectionProperties) {
    try {
        const con = new Sequelize(
            database,
            username,
            password,
            {
                host: host,
                port: parseInt(port),
                dialect: "postgres",
                pool: {
                    max: parseInt(process.env.PSQL_POOL_MAX || "5"),
                    min: parseInt(process.env.PSQL_POOL_MIN || "1"),
                    idle: parseInt(process.env.PSQL_POOL_IDLE || "10000")
                },
                logging: (msg) => { logger.debug(msg) },
            },
        );
        /* verify postgresql connection */
        con.authenticate()
            .then(() => {
                logger.info(
                    `🆗 Connected to db: ${process.env.PSQL_DATABASE}, mode: ${process.env.NODE_ENV}`
                );
            })
            .catch(err => {
                logger.error(
                    `🚫 Can't connect. Please remember to configure host connection to db, ${err}`
                );
            });
        clients.set(key, con);
    } catch (err) {
        throw err;
    }
}

export {
    createConnection,
    clients,
}
