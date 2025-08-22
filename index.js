const env = require("./env.json");
const { OpenAIChatApi } = require("llm-api");
const { Client, GatewayIntentBits } = require("discord.js");

if (env.discord_token == null
    || env.openai_token == null)
    throw new Error("Incomplete env variables");


//----- init

const client = new Client(
    { intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ] });
const openai = new OpenAIChatApi(
    { apiKey: env.openai_token },
    { model: "gpt-4o-mini", contextSize: 2048 }
);


//----- listeners

client.on("messageCreate", async msg => {
    if (!isAllowed(msg))
        return;

    await msg.channel.send(await openai.textCompletion(msg.content));
});

client.on("ready", () => {
    console.log("ready.");
});

client.on("error", error => console.log(error));


//----- settings

const allowed_channels = [
    "1278440332064985232" // #testing
];

//----- utils

function isAllowed(msg) {
    if (!allowed_channels.includes(msg.channel.id)) return false;
    if (client.user.id === msg.author.id) return false;

    return true;
}


//----- start client

client.login(env.discord_token);
