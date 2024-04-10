import { allCommands } from "../commands/allCommands.js";
import { Client, ApplicationCommandOptionData } from "discord.js";
import { log } from "../utility/logger.js";

export async function registerCommands(client: Client, deletePreviousCommands: boolean) {
    log("info", "-------------------------------Starting Registering All Commands-----------------------------------");

    if (deletePreviousCommands) {
        const existingCommands = await client.application?.commands.fetch();
        if (!existingCommands) return;
        for (const command of existingCommands.values()) {
            await command.delete()
                .then((x) => {
                    log("info", `Deleted command: ${x.name}`);
                })
                .catch((e) => {
                    log("error", e);
                });
        }
    }

    for (var i = 0; i < allCommands.length; i++) {
        var command = allCommands[i];
        await client.application?.commands.create({
            name: command.name,
            description: command.description,
            options: command.options,
            nsfw: command.nsfw,
        }).then(async (x) => {
            log("info", `Registered command: ${x.name}`);
        }).catch((e) => { log("error", e) });
    }

    log("info", "-------------------------------Finished Registering All Commands-----------------------------------");
}