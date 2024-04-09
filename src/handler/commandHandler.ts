import { Command, allCommands, fileCommandsMap } from "../commands/allCommands.js";
import { ChatInputCommandInteraction, Client, CommandInteraction, Interaction } from "discord.js";
import { log } from "../utility/logger.js";
import { DatabaseHandler } from "./databaseHandler.js";
import { sendImage } from "../commands/imageCommands.js";

export class CommandHandler {
    client: Client;
    commands: Command[] = allCommands;
    databaseHandler: DatabaseHandler;

    constructor(client: Client, databaseHandler: DatabaseHandler) {
        this.client = client;
        this.databaseHandler = databaseHandler;
    }

    async handleInteraction(interaction: ChatInputCommandInteraction) {
        const commandName = interaction.commandName;
        const command: Command | undefined = this.commands.find((x: any) => x.name === commandName);
        if (!command) return;

        switch (command.type) {
            case "file":
                const commandFunction: Function = (fileCommandsMap.get(commandName) as { default: Function }).default;
                if (!commandFunction) {
                    log("error", `Command function not found: ${commandName}`);
                    return;
                }
                if (command.cost && !(await this.checkIfUserHasEnoughBalance(interaction, command.cost))) return;

                try {
                    log("info", "Executing file command: " + commandName);
                    const args = interaction.options.data;
                    await commandFunction(interaction, args, this.databaseHandler);
                } catch (error) {
                    await this.handleError(error as Error, interaction, command.cost);
                }

                break;
            case "image":
                if (command.cost && !(await this.checkIfUserHasEnoughBalance(interaction, command.cost))) return;
                try {
                    log("info", "Executing image command: " + commandName);
                    const args = interaction.options.data;
                    await sendImage(interaction, args);
                } catch (error) {
                    await this.handleError(error as Error, interaction, command.cost);
                }
                break;
            default:
                log("error", `Unknown command type: ${command.type}`);
                break;
        }

    }

    async checkIfUserHasEnoughBalance(interaction: ChatInputCommandInteraction, cost: number) {
        const balance = await this.databaseHandler.userHandler.getBalance(interaction.user.id);
        if (balance < cost) {
            interaction.reply(`You don't have enough balance to run this command. You need ${cost}.`);
            return false;
        } else {
            await this.databaseHandler.userHandler.addBalance(interaction.user.id, -cost);
            return true
        }
    }

    async handleError(error: Error, interaction: ChatInputCommandInteraction, cost: number) {
        log("error", error.message);
        let reply = "An error occurred while executing the command."
        if (cost > 0) {
            reply += " Your balance has been refunded.";
            await this.databaseHandler.userHandler.addBalance(interaction.user.id, cost);
        }
        await interaction.reply(reply);
    }

}