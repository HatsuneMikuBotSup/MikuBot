import { ChatInputCommandInteraction } from "discord.js";
import { log } from "../../utility/logger.js";
import fs from "fs";

export default async function reset(interaction: ChatInputCommandInteraction, args: any) {
    log("info", "---------------------------------Reseting Bot------------------------------------");
    try {
        await interaction.reply("Resetting bot...");
        const data = {
            hardReset: args[0].value,
        }
        fs.writeFile("botsettings.json", JSON.stringify(data), async (err) => {
            if (err) {
                log("error", err.toString());
                await interaction.editReply("Something went wrong. Restarting anyway.");
            }
            process.exit(0);
        });
    } catch (error) {
        log("error", error as string); // Convert error to string using type assertion
    }
}