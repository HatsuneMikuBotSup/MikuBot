import { AttachmentBuilder, CacheType, ChatInputCommandInteraction, CommandInteractionOption } from "discord.js";
import { Command } from "./allCommands.js";
import { randomMedia } from "../utility/randomMedia.js";
import { log } from "../utility/logger.js";

interface ImageCommand {
    command: string;
    reply: string[];
    cost: number;
    nsfw: boolean;
}

export const imageCommands: ImageCommand[] = [
    {
        "command": "anal",
        "reply": ["...d-daddy!", "MY ASS >w<", "IT HURTS!", "MY ASS IS WIDE OPEN!", "UR HURTING ME", "nasty boii :>", "u like it rough, heh? :3", "TOO DEEP!",
            "IT FEELS SO GOOD!", "U hit the wrong hole Onii-Chan!", "You're stretching my asshole :sob:", "DEEPER DEEPER!", "wrong hole :woozy_face:",
            "THATS THE SPOT :heart:", "I wont be able to walk after this :sob:", "STOOP :sob:", "Your dick is too massive :sob:"],
        "cost": 0,
        "nsfw": true
    }, {
        "command": "ass",
        "reply": ["Zzz..", "What are u looking at Onii-chan?", "OwO", "I hope noone sees me naked", "Eeeek!",
            "O///O", "Put it in :woozy_face:", ":woozy_face: :smirk: "],
        "cost": 0,
        "nsfw": true
    }, {
        "command": "bdsm",
        "reply": ["Stop crying", "Open ur holes", "U won't be able to walk after this", "U CANT ESCAPE ME", ":heart:", "Do u like that?"],
        "cost": 0,
        "nsfw": true
    }, {
        "command": "blowjob",
        "reply": ["Succi Succ", "its soo big o.o", "slurp", "so tasty owo", "I hope u cum in my mouth :see_no_evil:", "Mhmhm does it feel good?",
            "Mhmhm how does it feel?", "its so massive", "its so big o.o", "It nearly just fits :eyes:", "Cum on my face :weary:",
            "I want to swallow ur cum :drooling_face:"],
        "cost": 0,
        "nsfw": true
    }, {
        "command": "boobs",
        "reply": ["I hope u like them", "MY TITS ARENT SMALL >:c", "Stop saying they are small :sob:", "Hehe :>", "Don't look at me like that Onii-Chan!",
            "quit staring", "uhmmmm >.<", "Do u think they are big?", "pls touch them >///<", "please massage them good :>"],
        "cost": 0,
        "nsfw": true
    }, {
        "command": "choke",
        "reply": ["I cant breathe..."],
        "cost": 0,
        "nsfw": true
    }, {
        "command": "creampie",
        "reply": ["I will get pregnant :sob:", "DID U CUM INSIDE ME?!", "YESSS ONII-CHAN!", "*moans* >///<", "I hope you used a condom", "THIS FEELS SO GOOD",
            "I CAN FEEL UR HOT CUM", "How should we call the baby? :uwu:", "Don't tell my mom about this, she will kill me", "OMG YES :heart: I LOVE U",
            "ONII-CHAANNNN O//.//O", "SO MUCH CUM!", "WOAH so much cum o.o", "yes Yes YESSS >//w//<", "Ur cum is so sticky :woozy_face:"],
        "cost": 0,
        "nsfw": true
    }, {
        "command": "feet",
        "reply": ["Don't tickle me there", ">///<", "Do u like my feets?"],
        "cost": 0,
        "nsfw": true
    }, {
        "command": "naked",
        "reply": ["Hehe :>", "Don't look at me like that Onii-Chan!", "quit staring!", "uhmmmm >.<", "Do u like my body?", "Please use me :heart:",
            "Can I see ur pp now? >///<", "pls touch me O/./O", "Can I touch ur pp now? owo", "Do you think im sexy? :>", "My eyes are up here baka"],
        "cost": 0,
        "nsfw": true
    }, {
        "command": "panties",
        "reply": ["Eeeek!"],
        "cost": 0,
        "nsfw": true
    }, {
        "command": "pussy",
        "reply": ["Hehe :>", "Don't look at me like that Onii-Chan!", "quit staring!", "uhmmmm >.<", "Do u like my pussy?", "Please use me :heart:",
            "Can I see ur pp now? >///<", "pls touch it O/./O", "Put it inside allready! :heart:", "I think I lost my credit card inside it, can u check?",
            "Can we have...s-sex?", "Im giving u consent uwu", "you can do everything u want with me >w<", "please be gentle >.<",
            "U said u will give me an ice if I show it to u", "I think ur pp wont fit :weary:"],
        "cost": 0,
        "nsfw": true
    }, {
        "command": "fuck",
        "reply": ["DEEPER!", "CUM INSIDE ME!", "Onii-chan?! >///<", "HARDER!", "DON'T CUM INSIDE ME!", "IM NOT A VIRGIN ANYMORE!:sob:", "This is my first time",
            "THIS FEELS SOO GOOD!", "FUCK ME HARDER DADDY!", "FUCK ME HARDER ONII-CHAN!", "YOUR DICK IS TOO LARGE!:sob:", "I can feel your dick inside me",
            "I can feel your dick move inside me", "PLEASE BE GENTLE", "USE ME!", "OMG YES *moans*", "OMG YES :weary:", "Thats the spot", ":heart:",
            "Ur mine :heart:", "Your dick is too MASSIVE :sob:"],
        "cost": 0,
        "nsfw": true
    }, {
        "command": "titjob",
        "reply": ["not on my face Onii-Chan!", "Your Cum is so warm", "I hope u liked it >.<", "WOAH so much cum o.o"],
        "cost": 0,
        "nsfw": true
    }, {
        "command": "baka",
        "reply": ["BAKA", "baka", "Anatawa baka desu", "idiot", "idiot :see_no_evil:", "baka :see_no_evil:", ">:I"],
        "cost": 0,
        "nsfw": false
    }, {
        "command": "blush",
        "reply": [">///<", ".....", "uhhh...", "uhmmmm", ">w<", ">.<", ">//.//<", "O//w//O"],
        "cost": 0,
        "nsfw": false
    }, {
        "command": "cute",
        "reply": ["Nyaa!", "^w^", "pat me!", "Hug me!", "Give me a headpat >.<", "Nya :3"],
        "cost": 0,
        "nsfw": false
    }, {
        "command": "kill",
        "reply": ["ur time has come -.- ", "time to die", "u dead :3", "hihihiHEHEHEEH", "BONK", "bye bye :>", "I got good money to kill u owo"],
        "cost": 0,
        "nsfw": false
    }, {
        "command": "kiss",
        "reply": ["kisses", "smouch", "xoxo", "hihi", ":kissing_closed_eyes:", ":kiss:"],
        "cost": 0,
        "nsfw": false
    }, {
        "command": "lick",
        "reply": ["I will lick ur tears :>", "yummmm:heart:", "heehee:star_struck:", ":3"],
        "cost": 0,
        "nsfw": false
    }, {
        "command": "love",
        "reply": ["love you too", "Uhmmm....okayyy....", "I love you"],
        "cost": 0,
        "nsfw": false
    }, {
        "command": "marry",
        "reply": ["You are my one and only", "Please by my waifu", "Will you be me wife?", "pls marry me uwu"],
        "cost": 0,
        "nsfw": false
    }, {
        "command": "pain",
        "reply": ["..it..h-hurts...", "pain", "I live in Spain without the S", "life is pain", "everything sucks", "Im not feeling well :(", "*sigh*"],
        "cost": 0,
        "nsfw": false
    }, {
        "command": "rob",
        "reply": ["This is a robbery, give me all your money!", "This is a wobbewy, giv me all ur moni UwU"],
        "cost": 0,
        "nsfw": false
    }, {
        "command": "spank",
        "reply": ["u wer vewy bad >:I"],
        "cost": 0,
        "nsfw": false
    }, {
        "command": "spin",
        "reply": ["WEWOWEWO", "I live in Spain without the a", "🤢🤮🤮🤮", "woooweeeeWOOOOO"],
        "cost": 0,
        "nsfw": false
    },
]

const fileEndings = [
    ".jpg", ".jpeg", ".png", ".gif", ".webp"
]

export async function sendImage(interaction: ChatInputCommandInteraction, args: readonly CommandInteractionOption<CacheType>[]) {
    try {
        const command = args[0].value;
        const replies = imageCommands.find((x) => x.command === command)?.reply;
        const reply = (replies ? replies[Math.floor(Math.random() * replies.length)] : "404 No reply found");
        const path = randomMedia("./media/imagecommands/" + command + "/", fileEndings);
        const file = path ? new AttachmentBuilder(path) : null;
        await interaction.reply(file ? { content: reply, files: [file] } : { content: reply });
    } catch (error) {
        throw error;
    }
}