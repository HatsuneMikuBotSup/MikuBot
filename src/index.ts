import dotenv from 'dotenv';
dotenv.config();

//----------------------------------------------------------------- Setup Discord.js

import { Client, GatewayIntentBits, Partials } from "discord.js";
const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ],
    partials: [Partials.Channel],
});

//----------------------------------------------------------------- Setup Client.on

client.on("ready", async (x: any) => {
    //
});

client.on("interactionCreate", async (interaction: any) => {
    if (!interaction.isChatInputCommand()) return;
    //
});

client.on("guildCreate", async (guild) => {
    //
});

client.on("guildMemberAdd", async (member) => {
    //
});

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    //
});

//----------------------------------------------------------------- Client login
console.log(process.env.TOKEN);
client.login(process.env.TOKEN);