import { Client } from 'discord.js';
import { registerCommands } from '../commands/registerCommands.js';
import { log } from './logger.js';


export function boot(client: Client) {
    log("info", "---------------------------------------Starting Boot Process-------------------------------------");
    registerCommands(client);
}