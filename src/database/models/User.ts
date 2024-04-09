import { DataTypes, Model, ModelCtor, Sequelize } from 'sequelize';
import { log } from '../../utility/logger.js';
import { Client } from 'discord.js';

interface UserAttributes {
    id: string;
    username: string;
    balance: number;
}

interface UserInstance extends Model<UserAttributes>, UserAttributes { }

export const initUserModel = (sequelize: Sequelize) => {
    return sequelize.define<UserInstance>('User', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        balance: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
};

export class UserHandler {
    sequelize: Sequelize;
    userModel: ModelCtor<UserInstance>;
    client: Client

    constructor(sequelize: Sequelize, client: Client) {
        this.sequelize = sequelize;
        this.userModel = initUserModel(sequelize);
        this.client = client;
    }

    async getUser(id: string): Promise<UserInstance | null> {
        return await this.userModel.findOne({ where: { id: id } });
    }

    async getBalance(id: string): Promise<number> {
        const user = await this.getUser(id);
        if (user !== null) {
            return user.balance;
        }
        await this.createUser(id);
        const newUser = await this.getUser(id);
        if (newUser !== null) {
            return newUser.balance;
        }
        log("error", `Failed to create user: ${id}`);
        return 0;
    }

    async createUser(id: string): Promise<UserInstance> {
        log("info", `Creating user: ${id}`);
        const username = (await this.client.users.fetch(id)).username;
        return await this.userModel.create({ id: id, username: username, balance: 0 });
    }

    async updateUserBalance(id: string, balance: number): Promise<void> {
        const user = await this.getUser(id);
        if (user !== null) {
            await user.update({ balance: balance });
        }
    }

    async addBalance(id: string, amount: number): Promise<void> {
        const user = await this.getUser(id);
        if (user !== null) {
            await user.update({ balance: user.balance + amount });
        }
    }
}
