import { isQuoi } from "./utils.js";

export async function feur(msg) {
    if (isQuoi(msg))
        await msg.reply("Feur");
}

export async function askAi(openai, msg) {
    await msg.reply(await openai.textCompletion(msg.content));
}
