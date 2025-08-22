import "dotenv/config";
export function isAllowed(client, msg) {
    return client.user.id !== msg.author.id;
}

export function strToNumber(text) {
    return (parseInt(text.replaceAll(/\D/g, "")) || 0);
}

export function getGuild(client) {
    guild = client.guilds.cache.find(guild => guild.id === guildId);
}

export const channels = {
    botTest: "",
    testing: "1278440332064985232"
};

export const d_00 = "988361601902080000";
export const guildId = "1085564304792752219";
export let guild;

import { OpenAIChatApi } from "llm-api";
export const openai = new OpenAIChatApi(
    { apiKey: process.env.OPENAI_TOKEN },
    { model: "gpt-4o-mini", contextSize: 2048 }
);
