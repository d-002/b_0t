// leave this false except when needed
const REFRESH_SLASH_COMMANDS = false;

import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";

import { isAllowed, guildId, getGuild } from "./src/utils.js";
import { feur } from "./src/actions.js";
import { buildCommands, handleInteraction } from "./src/slash.js";
import { updateInvisible } from "./src/invisible.js";
import { log, logError } from "./src/error.js";


//----- init

const client = new Client(
    { intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ] });


//----- listeners

client.on("messageCreate", async msg => {
    // feur
    if (!isAllowed(client, msg))
        return;

    await feur(msg);
});

client.on("interactionCreate", interaction => handleInteraction(interaction));

client.on("guildMemberUpdate", () => {
    updateInvisible();
});


//----- start client

client.on("clientReady", () => {
    getGuild(client);

    if (REFRESH_SLASH_COMMANDS) {
        buildCommands(process.env.DISCORD_TOKEN, client, guildId);
        log("Refreshed client commands");
    }

    log("Client started.")

    updateInvisible();
});
client.on("error", logError);

client.login(process.env.DISCORD_TOKEN);
