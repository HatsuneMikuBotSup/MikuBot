import { ChatInputCommandInteraction } from "discord.js";
import { log } from "../../utility/logger.js";
import { DatabaseHandler } from "../../handler/databaseHandler.js";

export default function reset(interaction: ChatInputCommandInteraction, args: any, databaseHandler: DatabaseHandler) {
    log("info", "---------------------------------Reseting Bot------------------------------------");
    interaction.reply("Resetting bot...").then(() => {
        process.exit(0);
    }).catch((error: any) => {
        log("error", error);
    });
}