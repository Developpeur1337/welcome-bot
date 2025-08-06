const { Client, GatewayIntentBits, Partials, ActivityType, Collection } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
const config = require('./config.json');
const colors = require('colors');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.GuildMember,
    ],
    presence: {
        activities: [{
            name: `Bienvenue !`,
            type: ActivityType.Streaming,
            url: "https://www.twitch.tv/developpeur1337"
        }],
        status: "online"
    },
    allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: false
    }
});

function load(dir) {
    let files = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files = files.concat(load(fullPath));
        } else if (entry.isFile() && fullPath.endsWith(".js")) {
            files.push(fullPath);
        }
    }
    return files;
}

const Event = load("./events");
for (const file of Event) {
    const event = require(path.resolve(file));
    if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
}


async function errorHandler(error) {
    if ([10062, 10008, 50013, 40060].includes(error.code)) return;
    console.log(`[ERROR] ${error}`.red);
}
process.on("unhandledRejection", errorHandler);
process.on("uncaughtException", errorHandler);

client.login(config.token);