import { Sequelize } from "sequelize";
import { log } from "../utility/logger.js";
import { UserHandler } from "../database/models/User.js";
import { Client } from "discord.js";

export class DatabaseHandler {
    sequelize: Sequelize;
    userHandler: UserHandler;
    client: Client;
    constructor(sequelize: Sequelize, client: Client) {
        this.sequelize = sequelize;
        this.client = client;
        this.userHandler = new UserHandler(sequelize, client);
        sequelize.sync();
    }
}