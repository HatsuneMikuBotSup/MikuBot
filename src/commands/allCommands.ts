import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord-api-types/v9";
import { imageCommands } from "./imageCommands.js";

// cant use ApplicationCommandOptionType directly because Typescript throws an error
var type_sub_command = ApplicationCommandOptionType.Subcommand;
var type_sub_command_group = ApplicationCommandOptionType.SubcommandGroup;
var type_string = ApplicationCommandOptionType.String;
var type_integer = ApplicationCommandOptionType.Integer;
var type_boolean = ApplicationCommandOptionType.Boolean;
var type_user = ApplicationCommandOptionType.User;
var type_channel = ApplicationCommandOptionType.Channel;
var type_role = ApplicationCommandOptionType.Role;
var type_mentionable = ApplicationCommandOptionType.Mentionable;
var type_number = ApplicationCommandOptionType.Number;
var type_attachment = ApplicationCommandOptionType.Attachment;

export interface Command {
    name: string;
    type: "file" | "image";
    description: string;
    options: any[];
    defaultMemberPermissions: bigint;
    cost: number;
    cooldown: number;
    nsfw: boolean;
}


var regularCommands: Command[] = [
    {
        "name": "ping",
        "type": "file",
        "description": "Replies with pong!",
        "options": [],
        "defaultMemberPermissions": PermissionFlagsBits.Administrator,
        "cost": 1,
        "cooldown": 0,
        "nsfw": false,
    }, {
        "name": "reset",
        "type": "file",
        "description": "Restarts the bot and downloads the latest version from github",
        "options": [
            {
                "name": "hard",
                "description": "Hard reset, deletes all commands",
                "type": type_boolean,
                "required": true,
            }
        ],
        "defaultMemberPermissions": PermissionFlagsBits.Administrator,
        "cost": 0,
        "cooldown": 0,
        "nsfw": false,
    }, {
        "name": "image",
        "type": "image",
        "description": "Sends a random sfw/nsfw picture of miku",
        "options": [
            {
                "name": "name",
                "description": "Genre",
                "type": type_string,
                "required": true,
                "choices": buildImageChoices()
            }
        ],
        "defaultMemberPermissions": PermissionFlagsBits.Administrator,
        "cost": 0,
        "cooldown": 0,
        "nsfw": false,
    }
]

function buildImageChoices() {
    let options: { name: string; value: string; }[] = [];
    imageCommands.forEach((imageCommand) => {
        options.push({
            "name": imageCommand.command,
            "value": imageCommand.command
        });
    });
    return options;
}

export var fileCommandsMap = new Map<string, any>(
    await Promise.all(
        regularCommands
            .filter((command) => command.type === "file")
            .map(async (command) => [command.name, await import(`./fileCommands/${command.name}.js`)] as const)
    )
);

export const allCommands = regularCommands;