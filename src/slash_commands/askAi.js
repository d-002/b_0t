import { openai } from "../utils.js";
import { SlashCommandBuilder } from "discord.js";

const name = "ask-ai";

async function askAi(interaction) {
    const prompt = interaction.options.getString("prompt");
    console.log(prompt);
    await interaction.reply(await openai.textCompletion(prompt));
}

function setup() {
    return new SlashCommandBuilder()
        .setName(name)
        .setDescription("Ask an AI about something")
        .addStringOption(option =>
            option.setName("prompt")
                .setDescription("The prompt to give to the model")
                .setRequired(true));
}

export default {
    name: name,
    command: askAi,
    setup: setup
};
