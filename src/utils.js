import "dotenv/config";
export function isAllowed(client, msg) {
    return client.user.id !== msg.author.id;
}

export function strToNumber(text) {
    return (parseInt(text.replaceAll(/\D/g, "")) || 0);
}

export const channels = {
    botTest: "",
    testing: "1278440332064985232"
};

import { OpenAIChatApi } from "llm-api";
export const openai = new OpenAIChatApi(
    { apiKey: process.env.OPENAI_TOKEN },
    { model: "gpt-4o-mini", contextSize: 2048 }
);
