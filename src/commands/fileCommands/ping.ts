import { ChatInputCommandInteraction } from "discord.js";
import { log } from "../../utility/logger.js";

export default function ping(interaction: ChatInputCommandInteraction) {
    const client = interaction.client;
    interaction.reply("🏓 pong!").then((x: any) => {
        x.edit(`🏓 pong! (Client ${Math.abs(interaction.createdTimestamp - Date.now())}ms | Websocket ${client.ws.ping}ms)`);
    }).catch((error: any) => {
        log("error", error);
    });
}