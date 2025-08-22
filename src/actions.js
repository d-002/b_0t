//import { openai, strToNumber } from "./utils.js";

async function isQuoi(msg) {
    //const answer = await openai.textCompletion("ne réponds que par 1 (oui) ou 0 (non) : le message suivant finit-t-il par le son 'quoi' ? : " + msg.content);
    //return aiBool(answer.content);

    return msg.content.replace(/\W/g, '').endsWith("quoi");
}

export async function feur(msg) {
    if (await isQuoi(msg))
        await msg.reply("Feur");
}

export async function askAi(openai, msg) {
    await msg.reply(await openai.textCompletion(msg.content));
}
