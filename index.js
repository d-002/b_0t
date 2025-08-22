// leave this false except when needed
const REFRESH_SLASH_COMMANDS = false;

import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";

import { isAllowed } from "./src/utils.js";
import { feur } from "./src/actions.js";
import { buildCommands, handleInteraction } from "./src/slash.js";


//----- init

const client = new Client(
    { intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ] });
const guildId = "1085564304792752219";


//----- listeners

client.on("messageCreate", async msg => {
    // feur
    if (!isAllowed(client, msg))
        return;

    await feur(msg);
});

client.on("interactionCreate", async interaction => {
    await handleInteraction(interaction)}
);


//----- start client

client.on("clientReady", () => {
    if (REFRESH_SLASH_COMMANDS) {
        buildCommands(process.env.DISCORD_TOKEN, client, guildId);
        console.log("Refreshed client commands");
    }

    console.log("Client started.")
});
client.on("error", error => console.log(error));

client.login(process.env.DISCORD_TOKEN);
