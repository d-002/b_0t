export function isAllowed(client, msg) {
    return client.user.id !== msg.author.id;
}

export function isQuoi(msg) {
    return msg.content.toLowerCase().trim() === "quoi";
}

export const channels = {
    botTest: "",
    testing: "1278440332064985232"
};

import { OpenAIChatApi } from "llm-api";
const openai = new OpenAIChatApi(
    { apiKey: process.env.OPENAI_TOKEN },
    { model: "gpt-4o-mini", contextSize: 2048 }
);
