import { Client } from 'discord.js';
import { registerCommands } from '../commands/registerCommands.js';
import { log } from './logger.js';
import fs from 'fs';


export async function boot(client: Client) {
    log("info", "---------------------------------------Starting Boot Process-------------------------------------");
    //get botsettings.json 
    let data = fs.readFileSync("botsettings.json");
    let settings = JSON.parse(data.toString());
    registerCommands(client, settings.hardReset);
}