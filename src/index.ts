import dotenv from 'dotenv';
dotenv.config();

//----------------------------------------------------------------- Setup Sequelize

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite', // specify the database dialect
    storage: 'database/database.sqlite', // path to your SQLite database file
    logging: false
});

sequelize.authenticate();

//----------------------------------------------------------------- Setup Discord.js

import { Client, CommandInteraction, GatewayIntentBits, Interaction, Partials } from "discord.js";
import { boot } from './utility/booter.js';

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

//----------------------------------------------------------------- Setup Handlers

import { DatabaseHandler } from './handler/databaseHandler.js';
const databaseHandler = new DatabaseHandler(sequelize, client);

import { CommandHandler } from './handler/commandHandler.js';
const commandHandler = new CommandHandler(client, databaseHandler);


//----------------------------------------------------------------- Setup Client.on

client.on("ready", async (x: any) => {
    boot(client);
});

client.on("interactionCreate", async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;
    commandHandler.handleInteraction(interaction);
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

client.login(process.env.TOKEN);
